import { useState, useRef, useEffect } from "react";
import logo from "../assets/pandora_logo.svg";
import zentativ from "../assets/zentativ.webp";
import jobraker from "../assets/jobraker.jpeg";

const menuItems = [
  {
    name: "How it works",
    id: "#home",
  },
  {
    name: "Benefits",
    id: "#benefits",
  },
  {
    name: "About Us",
    id: "#about",
  },
];

const projectItems = [
  {
    name: "Jobraker",
    url: "https://jobraker.io",
    icon: jobraker,
  },
  {
    name: "Zentativ",
    url: "https://zentativ.com",
    icon: zentativ,
  },
];

function getSlopedNavData(w: number) {
  const isMobile = w < 768;
  const h = isMobile ? 46 : 54;
  const step = isMobile ? 12 : 16;
  const slopeW = isMobile ? 24 : 32;
  const leftW = isMobile ? Math.min(160, Math.max(120, w * 0.48)) : 240;
  const botLeftW = isMobile ? Math.max(16, leftW - 22) : 200;
  const r = 3;
  const r_slope = 0;

  const len = Math.hypot(slopeW, step);
  const ux = slopeW / len;
  const uy = step / len;

  const path = `
    M ${r} 0
    L ${leftW - r_slope} 0
    Q ${leftW} 0, ${leftW + r_slope * ux} ${r_slope * uy}
    L ${leftW + slopeW - r_slope * ux} ${step - r_slope * uy}
    Q ${leftW + slopeW} ${step}, ${leftW + slopeW + r_slope} ${step}
    L ${w - r} ${step}
    A ${r} ${r} 0 0 1 ${w} ${step + r}
    L ${w} ${step + h - r}
    A ${r} ${r} 0 0 1 ${w - r} ${step + h}
    L ${botLeftW + slopeW + r_slope} ${step + h}
    Q ${botLeftW + slopeW} ${step + h}, ${botLeftW + slopeW - r_slope * ux} ${step + h - r_slope * uy}
    L ${botLeftW + r_slope * ux} ${h + r_slope * uy}
    Q ${botLeftW} ${h}, ${botLeftW - r_slope} ${h}
    L ${r} ${h}
    A ${r} ${r} 0 0 1 0 ${h - r}
    L 0 ${r}
    A ${r} ${r} 0 0 1 ${r} 0
    Z
  `
    .replace(/\s+/g, " ")
    .trim();

  return {
    h,
    step,
    totalH: h + step,
    leftW,
    slopeW,
    path,
  };
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [isProjectsHovered, setIsProjectsHovered] = useState(false);
  const [isMobileProjectsOpen, setIsMobileProjectsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navContainerRef = useRef<HTMLDivElement>(null);
  const [navWidth, setNavWidth] = useState(1024);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isDropdownVisible = isProjectsOpen || isProjectsHovered;

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setIsProjectsHovered(true);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsProjectsHovered(false);
    }, 200);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsProjectsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (!navContainerRef.current) return;
    const updateWidth = () => {
      if (navContainerRef.current) {
        setNavWidth(navContainerRef.current.clientWidth);
      }
    };
    updateWidth();
    const ro = new ResizeObserver(updateWidth);
    ro.observe(navContainerRef.current);
    return () => ro.disconnect();
  }, []);

  const { h, step, totalH, leftW, slopeW, path } = getSlopedNavData(navWidth);

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={() => {
            setIsOpen(false);
            setIsMobileProjectsOpen(false);
          }}
          className="bg-background/80 fixed inset-0 z-30 backdrop-blur-sm transition-opacity duration-300 lg:hidden"
          aria-hidden="true"
        />
      )}

      <nav className="fixed top-5 z-40 flex w-screen flex-col items-center justify-center">
        {/* Sloped Navbar Bar */}
        <div
          ref={navContainerRef}
          className="relative w-4/5 max-w-5xl"
          style={{ height: totalH }}
        >
          {/* SVG sloped background & outline */}
          <svg
            className="pointer-events-none absolute inset-0 overflow-visible"
            width={navWidth}
            height={totalH}
            viewBox={`0 0 ${navWidth} ${totalH}`}
            style={{
              filter: "drop-shadow(0 10px 25px rgba(0, 0, 0, 0.45))",
            }}
          >
            <path
              d={path}
              fill="#262626"
              stroke="#383838"
              strokeWidth="1.2"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {/* Left Elevated Area (Logo) */}
          <div
            className="absolute top-0 left-0 flex items-center px-4 lg:px-5"
            style={{ height: h, width: leftW }}
          >
            <a href="#home" className="flex items-center">
              <img src={logo} className="h-6 lg:h-7" alt="pandora" />
            </a>
          </div>

          {/* Right Stepped-Down Area (Links & CTA / Mobile Hamburger) */}
          <div
            className="absolute right-0 flex items-center justify-end px-3 lg:px-4"
            style={{
              top: step,
              height: h,
              left: leftW + slopeW,
            }}
          >
            {/* Desktop Menu */}
            <div className="hidden items-center gap-x-8 lg:flex lg:gap-x-10">
              {menuItems.map((item) => (
                <a
                  className="space hover:text-primary text-sm font-medium text-white/80 transition-colors duration-200"
                  href={item.id}
                  key={item.id}
                >
                  {item.name}
                </a>
              ))}

              {/* View Projects with Dropdown */}
              <div
                ref={dropdownRef}
                className="relative flex items-center py-2"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsProjectsOpen((prev) => !prev);
                  }}
                  className={`space flex cursor-pointer items-center gap-1.5 text-sm font-medium transition-colors duration-200 ${
                    isDropdownVisible
                      ? "text-primary"
                      : "text-white/80 hover:text-primary"
                  }`}
                >
                  <span>View Projects</span>
                  <svg
                    className={`h-3.5 w-3.5 transition-transform duration-200 ${
                      isDropdownVisible
                        ? "rotate-180 text-primary"
                        : "text-white/70"
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Dropdown Menu Container with hover bridge */}
                <div
                  className={`absolute top-full right-0 pt-2 transition-all duration-200 ${
                    isDropdownVisible
                      ? "pointer-events-auto translate-y-0 opacity-100"
                      : "pointer-events-none -translate-y-2 opacity-0"
                  }`}
                >
                  <div className="w-56 rounded-xl border border-[#383838] bg-[#1a1a1a]/95 p-1.5 shadow-[0_12px_32px_rgba(0,0,0,0.6)] backdrop-blur-xl">
                    <div className="flex flex-col gap-1">
                      {projectItems.map((project) => (
                        <a
                          key={project.name}
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => {
                            setIsProjectsOpen(false);
                            setIsProjectsHovered(false);
                          }}
                          className="group flex items-center justify-between rounded-lg px-3 py-2.5 text-sm text-white/90 transition-all duration-150 hover:bg-white/5 hover:text-primary"
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="flex h-7 w-7 items-center justify-center overflow-hidden rounded-md border border-white/10 bg-white/5 transition-colors group-hover:border-primary/40 group-hover:bg-primary/10">
                              <img
                                src={project.icon}
                                alt={project.name}
                                className="h-full w-full rounded object-cover"
                              />
                            </div>
                            <span className="space text-sm font-medium">
                              {project.name}
                            </span>
                          </div>
                          <svg
                            className="h-3.5 w-3.5 text-white/40 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M7 17L17 7M17 7H7M17 7V17"
                            />
                          </svg>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <a
                href={`https://wa.me/2349072896677?text=Hi Johnpaul, I'm _____ and I came across Pandora and I'd like to book a call`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button
                  className="text-background flex w-fit cursor-pointer items-center rounded-lg border bg-white px-3 py-2 text-sm font-medium transition-transform active:scale-95"
                  style={{
                    boxShadow:
                      "0 0 0 0 rgba(0,0,0,1)," +
                      "inset 0 -4px 0px rgba(0,0,0,0.5)," +
                      "0 8px 32px rgba(0,0,0,0.35)",
                  }}
                >
                  Join Waitlist
                </button>
              </a>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              className="hover:text-primary flex h-8 w-8 cursor-pointer flex-col items-center justify-center gap-1.5 rounded text-white/90 transition-colors active:scale-95 lg:hidden"
              aria-label={isOpen ? "Close Menu" : "Open Menu"}
            >
              <span
                className={`h-0.5 w-5 bg-current transition-all duration-300 ${
                  isOpen ? "translate-y-2 rotate-45" : ""
                }`}
              />
              <span
                className={`h-0.5 w-5 bg-current transition-all duration-300 ${
                  isOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`h-0.5 w-5 bg-current transition-all duration-300 ${
                  isOpen ? "-translate-y-2 -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div className="bg-navbar border-border mt-2 flex w-4/5 flex-col gap-y-3 rounded border p-4 shadow-2xl backdrop-blur-xl lg:hidden">
            {menuItems.map((item) => (
              <a
                className="space hover:text-primary py-1.5 text-sm font-medium transition-colors"
                href={item.id}
                key={item.id}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ))}

            {/* Mobile View Projects */}
            <div className="border-t border-white/10 pt-2">
              <button
                type="button"
                onClick={() => setIsMobileProjectsOpen((prev) => !prev)}
                className="space hover:text-primary flex w-full items-center justify-between py-1.5 text-sm font-medium transition-colors"
              >
                <span>View Projects</span>
                <svg
                  className={`h-4 w-4 transition-transform duration-200 ${
                    isMobileProjectsOpen ? "rotate-180 text-primary" : "text-white/60"
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {isMobileProjectsOpen && (
                <div className="mt-2 flex flex-col gap-1.5 pl-2">
                  {projectItems.map((project) => (
                    <a
                      key={project.name}
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => {
                        setIsOpen(false);
                        setIsMobileProjectsOpen(false);
                      }}
                      className="group flex items-center justify-between rounded-lg px-2 py-2 text-sm text-white/80 hover:bg-white/5 hover:text-primary"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-6 w-6 items-center justify-center overflow-hidden rounded border border-white/10 bg-white/5 p-0.5">
                          <img
                            src={project.icon}
                            alt={project.name}
                            className="h-full w-full rounded object-cover"
                          />
                        </div>
                        <span className="space font-medium">{project.name}</span>
                      </div>
                      <svg
                        className="h-3.5 w-3.5 text-white/40"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M7 17L17 7M17 7H7M17 7V17"
                        />
                      </svg>
                    </a>
                  ))}
                </div>
              )}
            </div>

            <a
              href={`https://wa.me/2349072896677?text=Hi Johnpaul, I'm _____ and I came across Pandora and I'd like to book a call`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="mt-1 w-full"
            >
              <button
                className="text-background flex w-full cursor-pointer items-center justify-center rounded-lg border bg-white px-3 py-2 text-sm font-medium transition-transform active:scale-95"
                style={{
                  boxShadow:
                    "0 0 0 0 rgba(0,0,0,1)," +
                    "inset 0 -4px 0px rgba(0,0,0,0.5)," +
                    "0 8px 32px rgba(0,0,0,0.35)",
                }}
              >
                Book A Call
              </button>
            </a>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
