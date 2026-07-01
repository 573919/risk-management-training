import { useRef, useState, useEffect, useCallback, Fragment } from "react";
import { sections, NAV_SECTIONS } from "./sections.tsx";
import type { Section } from "./sections.tsx";
import "./styles.css";

const BAH_LOGO_BLACK =
  "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAyMjUxLjkgNDc1LjQiPgogIDwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyOS4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiAyLjEuMCBCdWlsZCAxNDIpICAtLT4KICA8cGF0aCBkPSJNMTI0NS4xLDY3bC0xMjQuMSwzMzYuM2g3Ny4zbDI0LjQtNjcuNWgxMzIuMWwyNC40LDY3LjVoNzkuMmwtMTIzLjctMzM2LjNoLTg5LjVaTTEyODguMiwxNTMuNmw0Mi42LDExNy42aC04NC44bDQyLjItMTE3LjZoMFpNMTkzMC4zLDQwMy4zdi0yNDYuOWg3NC45djI0LjhjMTMuNi0xNS45LDM2LjUtMzAsNjcuOS0zMCw1MC42LDAsODIuNSwzNS4xLDgyLjUsODl2MTYzaC03NXYtMTQxLjVjMC0yNC44LTEwLjMtNDMuMS0zNC43LTQzLjFzLTQwLjcsMTQuNS00MC43LDQzLjZ2MTQxaC03NC45Wk0xNzk3LjUsNDA4LjVjNDkuMiwwLDk0LjItMjQuOCwxMTIuNC03Mi4xbC02Mi44LTIwLjFjLTcsMjEuNS0yNS4zLDMyLjgtNDguNywzMi44cy00OC43LTE5LjItNTMuOS01Mi45aDE2Ny4ydi0xOS43YzAtNjkuOC00MC44LTEyNS4xLTExNS43LTEyNS4xcy0xMjMuNyw1NS4zLTEyMy43LDEyOC40LDUwLjYsMTI4LjgsMTI1LjEsMTI4LjhoMFpNMTc5NS4yLDIwOS40YzI3LjYsMCw0Mi4yLDE4LjcsNDIuNiw0MC44aC05MC45YzcuNS0yNy4yLDI1LjMtNDAuOCw0OC4yLTQwLjhoMFpNMTU0Ni4zLDY3djMzNi4zaC03NC45VjY3aDc0LjlaTTE2NTMuOSw2N3YzMzYuM2gtNzQuOVY2N2g3NC45Wk01NjUuNiwyODAuMWMwLTc2LjgtNTEuMS0xMjguOC0xMjMuNy0xMjguOHMtMTIzLjcsNTItMTIzLjcsMTI4LjgsNTAuNiwxMjguNCwxMjMuNywxMjguNCwxMjMuNy01MS41LDEyMy43LTEyOC40aDBaTTM5Mi44LDI4MC4xYzAtNDMuMSwxOS4yLTY3LjUsNDkuMi02Ny41czQ5LjIsMjQuNCw0OS4yLDY3LjUtMTkuMiw2Ny41LTQ5LjIsNjcuNS00OS4yLTI0LjQtNDkuMi02Ny41aDBaTTEwNDYuNywzNDEuNXY2MS44aC0yMTAuM3YtNTQuM2wxMTgtMTMwLjdoLTExNi42di02MS44aDIwOHY1NC4zbC0xMTMuNCwxMzAuN2gxMTQuM1pNODI2LjEsMjgwLjFjMC03Ni44LTUxLjEtMTI4LjgtMTIzLjctMTI4LjhzLTEyMy43LDUyLTEyMy43LDEyOC44LDUwLjYsMTI4LjQsMTIzLjcsMTI4LjQsMTIzLjctNTEuNSwxMjMuNy0xMjguNGgwWk02NTMuMiwyODAuMWMwLTQzLjEsMTkuMi02Ny41LDQ5LjItNjcuNXM0OS4yLDI0LjQsNDkuMiw2Ny41LTE5LjIsNjcuNS00OS4yLDY3LjUtNDkuMi0yNC40LTQ5LjItNjcuNWgwWk0zNi4zLDQwMy4zaDE1My4yYzcyLjEsMCwxMTQuMy0zNS4xLDExNC4zLTk0LjZzLTIzLjQtNjguNC01NS4zLTgwLjFjMjItOS40LDQ1LjQtMzIuMyw0NS40LTcxLjIsMC01OC42LTM5LjMtOTAuNC0xMTIuOS05MC40SDM2LjN2MzM2LjNoMFpNMTExLjMsMjAxLjl2LTcwLjdoNjEuOGMzMC40LDAsNDcuMywxMS43LDQ3LjMsMzUuMXMtMTYuOSwzNS42LTQ3LjMsMzUuNmgtNjEuOFpNMTExLjMsMjYyLjhoNzEuMmMzMCwwLDQ2LjQsMTUuNSw0Ni40LDM3LjlzLTE2LjQsMzcuOS00Ni40LDM3LjloLTcxLjJ2LTc1LjloMFpNMjE5MS43LDQwMy4zYy0xMS4xLDAtMjAuMy04LjUtMjAuMy0yMC4zczkuMS0yMC4zLDIwLjMtMjAuMywyMC4zLDguNiwyMC4zLDIwLjMtOSwyMC4zLTIwLjMsMjAuM1pNMjE5MS43LDM2NS41Yy05LjYsMC0xNy4yLDcuNC0xNy4yLDE3LjVzNy42LDE3LjUsMTcuMiwxNy41LDE3LjItNy41LDE3LjItMTcuNS03LjYtMTcuNS0xNy4yLTE3LjVaTTIxOTYsMzkyLjlsLTQuOC03LjRoLTMuM3Y3LjRoLTQuN3YtMjAuNGg5LjRjNC45LDAsNy44LDIuMyw3LjgsNi4zcy0yLjYsNS00LjcsNS43bDUuNiw4LjRoLTUuM1pNMjE5MiwzNzYuNGgtNC4xdjUuN2g0LjFjMi4yLDAsMy42LS44LDMuNi0yLjhzLTEuNC0yLjgtMy42LTIuOFoiLz4KPC9zdmc+";

const BAH_LOGO_TEAL =
  "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAyMjUxLjkgNDc1LjQiPgogIDwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyOS4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiAyLjEuMCBCdWlsZCAxNDIpICAtLT4KICA8ZGVmcz4KICAgIDxzdHlsZT4KICAgICAgLnN0MCB7CiAgICAgICAgZmlsbDogIzIzZDJkNzsKICAgICAgfQogICAgPC9zdHlsZT4KICA8L2RlZnM+CiAgPHBhdGggY2xhc3M9InN0MCIgZD0iTTEyNDUuMSw2N2wtMTI0LjEsMzM2LjNoNzcuM2wyNC40LTY3LjVoMTMyLjFsMjQuNCw2Ny41aDc5LjJsLTEyMy43LTMzNi4zaC04OS41Wk0xMjg4LjIsMTUzLjZsNDIuNiwxMTcuNmgtODQuOGw0Mi4yLTExNy42aDBaTTE5MzAuMyw0MDMuM3YtMjQ2LjloNzQuOXYyNC44YzEzLjYtMTUuOSwzNi41LTMwLDY3LjktMzAsNTAuNiwwLDgyLjUsMzUuMSw4Mi41LDg5djE2M2gtNzV2LTE0MS41YzAtMjQuOC0xMC4zLTQzLjEtMzQuNy00My4xcy00MC43LDE0LjUtNDAuNyw0My42djE0MWgtNzQuOVpNMTc5Ny41LDQwOC41YzQ5LjIsMCw5NC4yLTI0LjgsMTEyLjQtNzIuMWwtNjIuOC0yMC4xYy03LDIxLjUtMjUuMywzMi44LTQ4LjcsMzIuOHMtNDguNy0xOS4yLTUzLjktNTIuOWgxNjcuMnYtMTkuN2MwLTY5LjgtNDAuOC0xMjUuMS0xMTUuNy0xMjUuMXMtMTIzLjcsNTUuMy0xMjMuNywxMjguNCw1MC42LDEyOC44LDEyNS4xLDEyOC44aDBaTTE3OTUuMiwyMDkuNGMyNy42LDAsNDIuMiwxOC43LDQyLjYsNDAuOGgtOTAuOWM3LjUtMjcuMiwyNS4zLTQwLjgsNDguMi00MC44aDBaTTE1NDYuMyw2N3YzMzYuM2gtNzQuOVY2N2g3NC45Wk0xNjUzLjksNjd2MzM2LjNoLTc0LjlWNjdoNzQuOVpNNTY1LjYsMjgwLjFjMC03Ni44LTUxLjEtMTI4LjgtMTIzLjctMTI4LjhzLTEyMy43LDUyLTEyMy43LDEyOC44LDUwLjYsMTI4LjQsMTIzLjcsMTI4LjQsMTIzLjctNTEuNSwxMjMuNy0xMjguNGgwWk0zOTIuOCwyODAuMWMwLTQzLjEsMTkuMi02Ny41LDQ5LjItNjcuNXM0OS4yLDI0LjQsNDkuMiw2Ny41LTE5LjIsNjcuNS00OS4yLDY3LjUtNDkuMi0yNC40LTQ5LjItNjcuNWgwWk0xMDQ2LjcsMzQxLjV2NjEuOGgtMjEwLjN2LTU0LjNsMTE4LTEzMC43aC0xMTYuNnYtNjEuOGgyMDh2NTQuM2wtMTEzLjQsMTMwLjdoMTE0LjNaTTgyNi4xLDI4MC4xYzAtNzYuOC01MS4xLTEyOC44LTEyMy43LTEyOC44cy0xMjMuNyw1Mi0xMjMuNywxMjguOCw1MC42LDEyOC40LDEyMy43LDEyOC40LDEyMy43LTUxLjUsMTIzLjctMTI4LjRoMFpNNjUzLjIsMjgwLjFjMC00My4xLDE5LjItNjcuNSw0OS4yLTY3LjVzNDkuMiwyNC40LDQ5LjIsNjcuNS0xOS4yLDY3LjUtNDkuMiw2Ny41LTQ5LjItMjQuNC00OS4yLTY3LjVoMFpNMzYuMyw0MDMuM2gxNTMuMmM3Mi4xLDAsMTE0LjMtMzUuMSwxMTQuMy05NC42cy0yMy40LTY4LjQtNTUuMy04MC4xYzIyLTkuNCw0NS40LTMyLjMsNDUuNC03MS4yLDAtNTguNi0zOS4zLTkwLjQtMTEyLjktOTAuNEgzNi4zdjMzNi4zaDBaTTExMS4zLDIwMS45di03MC43aDYxLjhjMzAuNCwwLDQ3LjMsMTEuNyw0Ny4zLDM1LjFzLTE2LjksMzUuNi00Ny4zLDM1LjZoLTYxLjhaTTExMS4zLDI2Mi44aDcxLjJjMzAsMCw0Ni40LDE1LjUsNDYuNCwzNy45cy0xNi40LDM3LjktNDYuNCwzNy45aC03MS4ydi03NS45aDBaTTIxOTEuNyw0MDMuM2MtMTEuMSwwLTIwLjMtOC41LTIwLjMtMjAuM3M5LjEtMjAuMywyMC4zLTIwLjMsMjAuMyw4LjYsMjAuMywyMC4zLTksMjAuMy0yMC4zLDIwLjNaTTIxOTEuNywzNjUuNWMtOS42LDAtMTcuMiw3LjQtMTcuMiwxNy41czcuNiwxNy41LDE3LjIsMTcuNSwxNy4yLTcuNSwxNy4yLTE3LjUtNy42LTE3LjUtMTcuMi0xNy41Wk0yMTk2LDM5Mi45bC00LjgtNy40aC0zLjN2Ny40aC00Ljd2LTIwLjRoOS40YzQuOSwwLDcuOCwyLjMsNy44LDYuM3MtMi42LDUtNC43LDUuN2w1LjYsOC40aC01LjNaTTIxOTIsMzc2LjRoLTQuMXY1LjdoNC4xYzIuMiwwLDMuNi0uOCwzLjYtMi44cy0xLjQtMi44LTMuNi0yLjhaIi8+Cjwvc3ZnPg==";

type Variant = Section["variant"];

function isOnDark(variant: Variant): boolean {
  return variant === "dark" || variant === "break" || variant === "hero";
}

function Breadcrumb({
  currentLabel,
  dark,
  onNavigate,
}: {
  currentLabel: string | undefined;
  dark: boolean;
  onNavigate: (sectionId: string) => void;
}) {
  if (!NAV_SECTIONS || NAV_SECTIONS.length === 0) return null;

  return (
    <div
      className={`slide-breadcrumb ${dark ? "chrome--dark" : "chrome--light"}`}
    >
      <img
        src={dark ? BAH_LOGO_TEAL : BAH_LOGO_BLACK}
        alt="Booz Allen Hamilton"
        className="breadcrumb-bah-logo"
      />
      {NAV_SECTIONS.map((s, i) => (
        <Fragment key={s.id}>
          <span
            className={`breadcrumb-nav-item${currentLabel === s.id ? " active" : ""}`}
            onClick={() => onNavigate(s.id)}
          >
            {s.long}
          </span>
          {i < NAV_SECTIONS.length - 1 && (
            <span className="breadcrumb-dot" aria-hidden="true">
              &middot;
            </span>
          )}
        </Fragment>
      ))}
    </div>
  );
}

function SlideFooter({
  current,
  total,
  dark,
}: {
  current: number;
  total: number;
  dark: boolean;
}) {
  const logoSrc = dark
    ? `${import.meta.env.BASE_URL}logos/logo-light.png`
    : `${import.meta.env.BASE_URL}logos/logo-dark.png`;

  const hasLogo = NAV_SECTIONS.length > 0;

  return (
    <footer
      className={`slide-footer ${dark ? "chrome--dark" : "chrome--light"}`}
    >
      <div className="footer-left">
        {hasLogo && (
          <>
            <img
              src={logoSrc}
              alt=""
              className="footer-logo"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </>
        )}
      </div>

      <div className="footer-center">
        boozallen.com&nbsp;&nbsp;&middot;&nbsp;&nbsp;&copy; 2026 Booz Allen
        Hamilton, Inc.
      </div>

      <div className="footer-right">
        <span className="footer-classification">Entrusted</span>
        <span className="footer-counter">
          {current + 1}
          <span className="footer-counter-sep">/</span>
          {total}
        </span>
      </div>
    </footer>
  );
}

function parseSlideFromHash(): number | null {
  const hash = window.location.hash.replace("#", "");
  const n = parseInt(hash, 10);
  return Number.isFinite(n) ? n : null;
}

export function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(() => {
    const fromHash = parseSlideFromHash();
    return fromHash != null ? Math.max(0, fromHash - 1) : 0;
  });
  const [hintVisible, setHintVisible] = useState(true);
  const total = sections.length;

  const currentSection = sections[current];
  const dark = isOnDark(currentSection?.variant);

  useEffect(() => {
    const fromHash = parseSlideFromHash();
    if (fromHash != null) {
      const idx = Math.max(0, Math.min(fromHash - 1, total - 1));
      const container = containerRef.current;
      if (container) {
        container.scrollTo({ top: idx * container.clientHeight });
      }
      setCurrent(idx);
      setHintVisible(false);
    }
  }, []);

  useEffect(() => {
    const newHash = `#${current + 1}`;
    if (window.location.hash !== newHash) {
      window.history.replaceState(null, "", newHash);
    }
  }, [current]);

  useEffect(() => {
    const onHashChange = () => {
      const fromHash = parseSlideFromHash();
      if (fromHash == null) return;
      const idx = Math.max(0, Math.min(fromHash - 1, total - 1));
      const container = containerRef.current;
      if (container) {
        container.scrollTo({
          top: idx * container.clientHeight,
          behavior: "smooth",
        });
      }
      setCurrent(idx);
      setHintVisible(false);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [total]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleScroll = () => {
      const idx = Math.round(container.scrollTop / container.clientHeight);
      setCurrent(Math.min(Math.max(idx, 0), total - 1));
      setHintVisible(false);
    };
    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [total]);

  const goTo = useCallback(
    (index: number) => {
      if (index < 0 || index >= total) return;
      const container = containerRef.current;
      if (!container) return;
      container.scrollTo({
        top: index * container.clientHeight,
        behavior: "smooth",
      });
      setHintVisible(false);
    },
    [total],
  );

  const navigateToSection = useCallback(
    (sectionId: string) => {
      const index = sections.findIndex((s) => s.label === sectionId);
      if (index !== -1) {
        goTo(index);
      }
    },
    [goTo],
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowDown":
        case "ArrowRight":
        case " ":
        case "PageDown":
          e.preventDefault();
          goTo(current + 1);
          break;
        case "ArrowUp":
        case "ArrowLeft":
        case "PageUp":
          e.preventDefault();
          goTo(current - 1);
          break;
        case "Home":
          e.preventDefault();
          goTo(0);
          break;
        case "End":
          e.preventDefault();
          goTo(total - 1);
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [current, goTo, total]);

  useEffect(() => {
    const timer = setTimeout(() => setHintVisible(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Breadcrumb
        currentLabel={currentSection?.label}
        dark={dark}
        onNavigate={navigateToSection}
      />

      <div ref={containerRef} className="presentation">
        {sections.map((section, i) => (
          <section
            key={i}
            className={`slide ${section.variant ?? "default"}`}
            aria-label={`Slide ${i + 1}: ${section.title}`}
          >
            <div className="slide-content">
              {section.label && (
                <span className="slide-label">{section.label}</span>
              )}
              <h2 className="slide-title">{section.title}</h2>
              {section.body}
            </div>
          </section>
        ))}
      </div>

      <SlideFooter current={current} total={total} dark={dark} />

      <div
        className="nav-hint"
        aria-hidden="true"
        style={{ opacity: hintVisible ? 1 : 0 }}
      >
        &darr; scroll or use arrow keys
      </div>
    </>
  );
}
