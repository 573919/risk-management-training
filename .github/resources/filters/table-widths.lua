-- table-widths.lua
--
-- Pandoc filter that rescales pipe-table column widths on DOCX output
-- so they sum to 1.0. When colspec widths sum to 1.0, Pandoc emits
-- `<w:tblW w:type="pct" w:w="5000"/>` (= 100% of body width) and
-- proportional `<w:gridCol>` entries. Relative weights implied by the
-- markdown separator are preserved; otherwise each column gets an
-- equal share.
--
-- A per-column minimum fraction (scaled down for many-column tables)
-- keeps short headers like "Language" or "Maintainer" from wrapping.
-- The deficit from pinned-to-floor columns is reclaimed proportionally
-- from columns above the floor, so the table still sums to 1.0 and
-- wide columns keep their relative weighting.
--
-- No-op for non-DOCX targets.

-- Per-column minimum fraction for the fill-body-width pass.
-- 0.15 ≈ 0.82" of rendered cell width in portrait and ≈ 1.45" in
-- landscape — enough for ~10 character single-word headers like
-- "Language", "Maintainer", "Considered" to render on a single line
-- at the 11pt body font with default Word cell padding (~0.16" of
-- combined left+right inset). Any column whose markdown-derived
-- weight would otherwise drop below this gets bumped up; the deficit
-- is recovered proportionally from columns that are above the floor,
-- so wide columns keep their relative weighting and the table still
-- sums to 1.0.
--
-- The effective floor is `min(MIN_FRAC, MIN_FRAC_TOTAL_CAP / n)` so a
-- many-column table doesn't pin more than MIN_FRAC_TOTAL_CAP of body
-- width to the floor — at 5+ columns the per-column floor scales
-- down, and very wide tables (>= ~10 columns) effectively disable it.
local MIN_FRAC           = 0.15
local MIN_FRAC_TOTAL_CAP = 0.70

-- Enforce a per-column minimum fraction on `widths` (modifies in
-- place). The effective floor scales down for many-column tables so
-- pinned columns never claim more than MIN_FRAC_TOTAL_CAP of body
-- width. Columns below the floor get bumped up; the deficit is
-- reclaimed proportionally from columns above the floor so the total
-- still sums to 1.0.
local function enforce_minimum(widths, n)
  local floor = math.min(MIN_FRAC, MIN_FRAC_TOTAL_CAP / n)
  if floor * n > 0.95 then return end

  local deficit     = 0
  local above       = {}  -- index -> excess over floor
  local above_total = 0
  for i = 1, n do
    if widths[i] < floor then
      deficit = deficit + (floor - widths[i])
      widths[i] = floor
    else
      local excess = widths[i] - floor
      if excess > 0 then
        above[i] = excess
        above_total = above_total + excess
      end
    end
  end

  if deficit == 0 or above_total <= 0 or deficit > above_total then
    return
  end

  local scale = (above_total - deficit) / above_total
  for i, excess in pairs(above) do
    widths[i] = floor + excess * scale
  end
end

-- Ensure colspec widths sum to ~1.0 so Pandoc renders the table at
-- full body width. Preserves relative weights when the markdown
-- separator already implied them, then enforces a per-column minimum
-- fraction so short headers like "Language" don't wrap.
local function fill_body_width(tbl, n)
  local existing_sum = 0
  local default_count = 0
  for i = 1, n do
    local w = tbl.colspecs[i][2]
    if type(w) == 'number' and w > 0 then
      existing_sum = existing_sum + w
    else
      default_count = default_count + 1
    end
  end

  -- Note: Pandoc usually pre-normalises markdown-derived colspec
  -- widths to sum to 1.0 already (so existing_sum ≈ 1.0). We still
  -- need to write them back to make sure tbl.colspecs is the input
  -- to Pandoc's DOCX writer (rather than some default), and to apply
  -- the per-column floor below.

  -- First pass: compute a width per column so widths sum to 1.0,
  -- preserving any relative weights the markdown separator implied.
  local widths = {}
  if default_count == n then
    -- All widths default — equal share.
    local share = 1.0 / n
    for i = 1, n do widths[i] = share end
  elseif default_count == 0 then
    -- All numeric — scale to sum to 1.0, preserving relative weights.
    for i = 1, n do
      widths[i] = tbl.colspecs[i][2] / existing_sum
    end
  else
    -- Mixed — keep numeric weights, give defaults an equal share of
    -- the remainder. Cap the remainder at >=5% so default columns
    -- never collapse to zero.
    local remaining = math.max(0.05, 1.0 - existing_sum)
    local share = remaining / default_count
    for i = 1, n do
      local w = tbl.colspecs[i][2]
      if type(w) == 'number' and w > 0 then
        widths[i] = w
      else
        widths[i] = share
      end
    end
  end

  -- Second pass: enforce the per-column minimum so short headers
  -- (e.g. "Language" in a Status-dominated comparison table) don't
  -- wrap. Deficit is taken from above-floor columns proportionally,
  -- so the table still sums to 1.0 and wide columns keep their
  -- relative weighting.
  enforce_minimum(widths, n)

  local new_colspecs = {}
  for i = 1, n do
    new_colspecs[i] = {tbl.colspecs[i][1], widths[i]}
  end
  tbl.colspecs = new_colspecs
end

function Table(tbl)
  if FORMAT ~= 'docx' then return nil end
  if not tbl.head or #tbl.head.rows == 0 then return nil end

  local header_cells = tbl.head.rows[1].cells
  local n = #header_cells
  if n ~= #tbl.colspecs then return nil end

  fill_body_width(tbl, n)
  return tbl
end
