$ErrorActionPreference = 'Stop'

function New-RgbInt {
    param(
        [int]$R,
        [int]$G,
        [int]$B
    )

    return ($R + ($G * 256) + ($B * 65536))
}

function Add-TitleSlide {
    param(
        $Presentation,
        [string]$Title,
        [string]$Subtitle,
        [int]$Navy,
        [int]$White,
        [int]$Accent
    )

    $slide = $Presentation.Slides.Add($Presentation.Slides.Count + 1, 1)
    $slide.FollowMasterBackground = 0
    $slide.Background.Fill.Solid()
    $slide.Background.Fill.ForeColor.RGB = $Navy

    $titleShape = $slide.Shapes.Title
    $titleShape.TextFrame.TextRange.Text = $Title
    $titleShape.Left = 40
    $titleShape.Top = 120
    $titleShape.Width = 1200
    $titleShape.Height = 170
    $titleShape.TextFrame.TextRange.Font.Name = 'Aptos Display'
    $titleShape.TextFrame.TextRange.Font.Size = 50
    $titleShape.TextFrame.TextRange.Font.Bold = -1
    $titleShape.TextFrame.TextRange.Font.Color.RGB = $White

    $subtitleShape = $slide.Shapes.Placeholders.Item(2)
    $subtitleShape.TextFrame.TextRange.Text = $Subtitle
    $subtitleShape.Left = 42
    $subtitleShape.Top = 320
    $subtitleShape.Width = 1150
    $subtitleShape.Height = 120
    $subtitleShape.TextFrame.TextRange.Font.Name = 'Aptos'
    $subtitleShape.TextFrame.TextRange.Font.Size = 24
    $subtitleShape.TextFrame.TextRange.Font.Color.RGB = $White

    $bar = $slide.Shapes.AddShape(1, 40, 470, 280, 8)
    $bar.Fill.ForeColor.RGB = $Accent
    $bar.Line.Visible = 0
}

function Add-ContentSlide {
    param(
        $Presentation,
        [string]$Title,
        [string[]]$Bullets,
        [int]$Navy,
        [int]$White,
        [int]$Ink,
        [int]$Gray
    )

    $slide = $Presentation.Slides.Add($Presentation.Slides.Count + 1, 2)
    $slide.FollowMasterBackground = 0
    $slide.Background.Fill.Solid()
    $slide.Background.Fill.ForeColor.RGB = $White

    $topBand = $slide.Shapes.AddShape(1, 0, 0, 1280, 78)
    $topBand.Fill.ForeColor.RGB = $Navy
    $topBand.Line.Visible = 0

    $titleShape = $slide.Shapes.Title
    $titleShape.TextFrame.TextRange.Text = $Title
    $titleShape.Left = 36
    $titleShape.Top = 16
    $titleShape.Width = 1210
    $titleShape.Height = 44
    $titleShape.TextFrame.TextRange.Font.Name = 'Aptos Display'
    $titleShape.TextFrame.TextRange.Font.Size = 28
    $titleShape.TextFrame.TextRange.Font.Bold = -1
    $titleShape.TextFrame.TextRange.Font.Color.RGB = $White

    $bodyShape = $slide.Shapes.Placeholders.Item(2)
    $bodyShape.Left = 74
    $bodyShape.Top = 112
    $bodyShape.Width = 1120
    $bodyShape.Height = 560
    $bodyShape.TextFrame.TextRange.Text = ($Bullets -join "`r")
    $bodyShape.TextFrame.TextRange.Font.Name = 'Aptos'
    $bodyShape.TextFrame.TextRange.Font.Size = 24
    $bodyShape.TextFrame.TextRange.Font.Color.RGB = $Ink

    for ($i = 1; $i -le $bodyShape.TextFrame.TextRange.Paragraphs().Count; $i++) {
        $para = $bodyShape.TextFrame.TextRange.Paragraphs($i)
        if (-not [string]::IsNullOrWhiteSpace($para.Text)) {
            $para.ParagraphFormat.Bullet.Visible = -1
            $para.ParagraphFormat.Bullet.Character = 8226
            $para.ParagraphFormat.Bullet.Font.Color.RGB = $Navy
            $para.ParagraphFormat.SpaceAfter = 8
            $para.ParagraphFormat.SpaceWithin = 1.05
        }
    }

    $rule = $slide.Shapes.AddShape(1, 74, 94, 230, 3)
    $rule.Fill.ForeColor.RGB = $Gray
    $rule.Line.Visible = 0
}

$deck = @(
    @{
        Type = 'title'
        Title = 'OCIO Enterprise Risk Management Framework'
        Subtitle = 'Professional Training Edition | June 2026'
    },
    @{
        Type = 'content'
        Title = 'Training Agenda'
        Bullets = @(
            'Purpose and governance model for enterprise risk management',
            'Roles and responsibilities across CIO, governance boards, branch leadership, and risk owners',
            'Risk types, probability, impact, and ranking methodology',
            'Risk register documentation standards in ServiceNow',
            'Communication, escalation, reporting, and continuous improvement practices'
        )
    },
    @{
        Type = 'content'
        Title = 'Guiding Purpose of the Framework'
        Bullets = @(
            'Establish one consistent approach to identify, evaluate, prioritize, and manage risk across OCIO',
            'Strengthen mission delivery by reducing surprises and improving decision quality',
            'Promote proactive detection of vulnerabilities before incidents escalate',
            'Embed accountability, transparency, and resilience into day-to-day operations'
        )
    },
    @{
        Type = 'content'
        Title = 'Roles and Responsibilities: Shared Accountability'
        Bullets = @(
            'Risk management is a shared responsibility executed through clear structure',
            'Each role has explicit accountability, escalation obligations, and reporting duties',
            'Consistency in methods ensures risks can be compared, prioritized, and governed effectively',
            'Culture objective: empower staff to raise risks early and without ambiguity'
        )
    },
    @{
        Type = 'content'
        Title = 'Governance Hierarchy: Strategy to Execution'
        Bullets = @(
            'CIO sets enterprise risk direction, appetite, and oversight expectations',
            'Enterprise IT Governance Board and Business Demand Governance Board provide decision forums',
            'Branch Chiefs validate risk posture, enforce adoption, and escalate high exposure',
            'Risk Owners identify, document, mitigate, and monitor risks at operational level'
        )
    },
    @{
        Type = 'content'
        Title = 'CIO and Governance Board Expectations'
        Bullets = @(
            'Align risk posture with organizational strategy, mission outcomes, and regulatory requirements',
            'Approve risk framework, escalation model, and governance priorities',
            'Review enterprise risk profile and key trends for executive decisions',
            'Resolve significant cross-functional risks escalated from lower levels'
        )
    },
    @{
        Type = 'content'
        Title = 'Branch Chief and Risk Owner Expectations'
        Bullets = @(
            'Branch Chiefs: assess moderate-plus risks, validate mitigation sufficiency, and escalate high/critical risks',
            'Risk Owners: identify and evaluate risks using standard process and maintain active monitoring',
            'Risk Owners: self-manage low risks; elevate medium and high risks for tolerance decisions',
            'Both roles: maintain transparent, data-driven reporting and closure rationale'
        )
    },
    @{
        Type = 'content'
        Title = 'OCIO Risk Taxonomy Overview'
        Bullets = @(
            'Operational and technical: security, system operations, technology obsolescence, vendor dependency',
            'Programmatic and delivery: schedule, scope, quality, change management, personnel',
            'Business and governance: budget, financial, compliance, policy, governance, strategic',
            'Enterprise context: data, cultural/organizational, reputational, and fraud risk categories'
        )
    },
    @{
        Type = 'content'
        Title = 'Risk Assessment Dimension 1: Probability'
        Bullets = @(
            'Absolute (>70%): expected occurrence or repeated historical occurrence',
            'High (40-70%): strong chance with known precedent',
            'Moderate (20-40%): plausible but less frequent with partial precedent',
            'Low (<20%): limited historical precedent under current conditions'
        )
    },
    @{
        Type = 'content'
        Title = 'Probability Calibration: Complexity Matters'
        Bullets = @(
            'Use evidence from testing maturity, solution complexity, and interdependencies',
            'Evaluate requirement clarity, external dependencies, and implementation novelty',
            'Apply historical performance and trigger trends rather than intuition',
            'Document rationale to support governance review and repeatability'
        )
    },
    @{
        Type = 'content'
        Title = 'Risk Assessment Dimension 2: Impact'
        Bullets = @(
            'Impact is evaluated on realistic enterprise consequences, not hypothetical extremes',
            'Assess mission operations, compliance exposure, financial outcomes, and reputation',
            'Use standardized high, medium, and low definitions by risk type',
            'Quantify consequences where possible to improve prioritization accuracy'
        )
    },
    @{
        Type = 'content'
        Title = 'Risk Ranking Formula and Heat Map'
        Bullets = @(
            'Risk Exposure = Probability + Impact using standardized matrix logic',
            'Resulting rank classifies exposure as High, Medium, or Low for action planning',
            'Heat maps provide fast visual comparison across the risk portfolio',
            'Ranking supports objective prioritization and governance resource allocation'
        )
    },
    @{
        Type = 'content'
        Title = 'Three Ranking Best Practices'
        Bullets = @(
            'Use objective, verifiable evidence for every probability and impact assignment',
            'Validate ranks in governance forums to calibrate across teams',
            'Update ranks when mitigations progress or environmental conditions change',
            'Maintain rationale history to preserve traceability and audit readiness'
        )
    },
    @{
        Type = 'content'
        Title = 'Documenting Risks in ServiceNow Register'
        Bullets = @(
            'Create and manage risks in Strategic Planning and Project Workspaces',
            'Ensure portfolios, programs, and projects are configured before risk entry',
            'Complete required fields for short description, detailed risk statement, mitigation plan, and dates',
            'Track risk state and response status through full lifecycle until closure'
        )
    },
    @{
        Type = 'content'
        Title = 'Writing a Strong Risk Statement'
        Bullets = @(
            'Use the Cause -> Event -> Impact structure for clarity and actionability',
            'Write in objective, fact-based language with measurable consequences',
            'Separate risk articulation from mitigation planning steps',
            'Avoid vague wording that cannot be validated or audited'
        )
    },
    @{
        Type = 'content'
        Title = 'If-Then Pattern for Clear Risk Statements'
        Bullets = @(
            'If [cause condition exists], then [risk event may occur], resulting in [business impact]',
            'Example domains: personnel loss, technology obsolescence, and compliance mandates',
            'Strong statements accelerate governance understanding and mitigation design',
            'Weak statements produce inconsistent reviews and delayed decisions'
        )
    },
    @{
        Type = 'content'
        Title = 'Mitigation Planning: Inherent vs Residual Risk'
        Bullets = @(
            'Inherent risk: exposure before controls or mitigation actions are applied',
            'Residual risk: exposure remaining after mitigation implementation',
            'Compare residual risk against approved tolerance thresholds',
            'Reassess rank to demonstrate mitigation return on investment'
        )
    },
    @{
        Type = 'content'
        Title = 'Four Core Risk Response Strategies'
        Bullets = @(
            'Avoid: eliminate the source condition causing risk',
            'Mitigate: reduce likelihood or impact through controls and process improvement',
            'Transfer: shift defined responsibility through SLAs, contracts, warranties, or insurance',
            'Accept: formally acknowledge residual exposure with leadership-approved rationale'
        )
    },
    @{
        Type = 'content'
        Title = 'From Vague Actions to Measurable Actions'
        Bullets = @(
            'Replace generic actions with concrete, observable tasks and success thresholds',
            'Assign one accountable owner and a firm calendar date for completion',
            'Define review cadence, escalation triggers, and evidence of completion',
            'Link every mitigation action to reduction in likelihood or impact'
        )
    },
    @{
        Type = 'content'
        Title = 'Common Mitigation Pitfalls and Antidotes'
        Bullets = @(
            'Pitfall: vague actions -> Antidote: observable, verifiable tasks',
            'Pitfall: team ownership only -> Antidote: single owner and deadline',
            'Pitfall: unclear risk reduction mechanism -> Antidote: explicit likelihood or impact objective',
            'Pitfall: no residual rank update -> Antidote: mandatory post-mitigation recalculation'
        )
    },
    @{
        Type = 'content'
        Title = 'Communication and Escalation Protocol'
        Bullets = @(
            'Escalation path is determined by risk value: Low, Medium, or High',
            'Low risks are managed at team level with routine monitoring',
            'Medium risks are reviewed with Branch Chiefs for tolerance and mitigation decisions',
            'High risks are escalated to CIO and governance boards for enterprise-level action'
        )
    },
    @{
        Type = 'content'
        Title = 'Leadership Risk Briefing Checklist'
        Bullets = @(
            'Clear risk statement with cause, event, and impact',
            'Current ranking and rationale for any change',
            'Mitigation status, effectiveness, and residual exposure',
            'Specific leadership decision request: funding, scope, timeline, or resource adjustment'
        )
    },
    @{
        Type = 'content'
        Title = 'Risk Reporting: Two Core Products'
        Bullets = @(
            'Enterprise Risk Dashboard: real-time operational risk view for owners and branch leadership',
            'Enterprise Risk Profile: prioritized portfolio of highest-significance risks for CIO review',
            'Both products support proactive detection, strategic prioritization, and compliance readiness',
            'Reporting scope must include cross-branch and cross-functional dependencies'
        )
    },
    @{
        Type = 'content'
        Title = '6-Step Risk Management Lifecycle'
        Bullets = @(
            '1) Identify potential risks through structured inputs and methods',
            '2) Assess causes, probability, and impact with standardized guidance',
            '3) Prioritize using ranking matrix and portfolio view',
            '4) Develop response strategy and 5) Implement with ownership and timelines',
            '6) Monitor and review continuously to inform the next cycle'
        )
    },
    @{
        Type = 'content'
        Title = 'Risk Identification: Inputs and Techniques'
        Bullets = @(
            'Use risk types, historical incidents, audits, and environmental scanning as key inputs',
            'Apply collaborative techniques to gather cross-functional perspectives early',
            'Use analytical techniques including scenario-based analysis for cascading effects',
            'Treat identification as continuous discipline, not a one-time workshop'
        )
    },
    @{
        Type = 'content'
        Title = 'Risk Triggers: Early Warning Indicators'
        Bullets = @(
            'Define triggers when logging each risk to enable proactive monitoring',
            'Use categories such as technical, regulatory, security/vendor, policy, personnel, reputation, and data/schedule',
            'Set thresholds, ownership, and escalation criteria for trigger activation',
            'Integrate triggers into register updates, dashboards, and governance reviews'
        )
    },
    @{
        Type = 'content'
        Title = 'Interconnected Risks: Dependencies and Cascades'
        Bullets = @(
            'Many risks originate in upstream dependencies outside direct team control',
            'Single-point failures can trigger secondary and tertiary enterprise impacts',
            'Prioritize systemic risks with broad cascading potential even when initial impact appears moderate',
            'Design layered mitigations across source and cascade pathways'
        )
    },
    @{
        Type = 'content'
        Title = 'Implementing Controls: Three Lines of Defense'
        Bullets = @(
            'Preventive controls stop undesirable events before they occur',
            'Detective controls identify incidents rapidly when prevention fails',
            'Corrective controls restore operations and reduce downstream damage',
            'Control effectiveness depends on clear design, ownership, and sustained monitoring'
        )
    },
    @{
        Type = 'content'
        Title = 'Continuous Monitoring and Improvement'
        Bullets = @(
            'Use dashboards, alerts, service-level reports, trend analysis, and predictive indicators',
            'Run retrospectives to capture lessons learned and strengthen future response quality',
            'Implement systemic improvements to process, tooling, governance, and training',
            'Operate ERM as a continuous maturity cycle rather than a compliance exercise'
        )
    },
    @{
        Type = 'content'
        Title = 'Key Takeaways'
        Bullets = @(
            'Use standardized risk language, ranking, and documentation for consistency',
            'Escalate risks through the correct governance path based on rank and exposure',
            'Build measurable mitigation plans and always recalculate residual risk',
            'Sustain enterprise resilience through monitoring, reporting, and continuous improvement'
        )
    },
    @{
        Type = 'content'
        Title = 'Appendix: Helpful Reference Areas'
        Bullets = @(
            'Risk type definitions and impact criteria by domain',
            'Probability and impact guidelines with ranking matrix',
            'ServiceNow risk register field standards and workflow',
            'Escalation protocol, reporting cadence, and governance review checkpoints'
        )
    }
)

$outputPath = Join-Path (Get-Location) 'Enterprise Risk Management Framework Training Materials_Professional.pptx'

$navy = New-RgbInt -R 11 -G 37 -B 69
$white = New-RgbInt -R 255 -G 255 -B 255
$ink = New-RgbInt -R 24 -G 34 -B 46
$gray = New-RgbInt -R 213 -G 220 -B 228
$accent = New-RgbInt -R 47 -G 130 -B 222

$pp = $null
$presentation = $null

try {
    $pp = New-Object -ComObject PowerPoint.Application
    $pp.Visible = -1
    $presentation = $pp.Presentations.Add()

    foreach ($slideDef in $deck) {
        if ($slideDef.Type -eq 'title') {
            Add-TitleSlide -Presentation $presentation -Title $slideDef.Title -Subtitle $slideDef.Subtitle -Navy $navy -White $white -Accent $accent
        }
        else {
            Add-ContentSlide -Presentation $presentation -Title $slideDef.Title -Bullets $slideDef.Bullets -Navy $navy -White $white -Ink $ink -Gray $gray
        }
    }

    $presentation.SaveAs($outputPath)
    Write-Output "Created polished deck: $outputPath"
}
finally {
    if ($presentation -ne $null) {
        $presentation.Close()
    }

    if ($pp -ne $null) {
        $pp.Quit()
    }

    [System.Runtime.InteropServices.Marshal]::ReleaseComObject($presentation) | Out-Null
    [System.Runtime.InteropServices.Marshal]::ReleaseComObject($pp) | Out-Null
    [System.GC]::Collect()
    [System.GC]::WaitForPendingFinalizers()
}
