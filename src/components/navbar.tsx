import { useState, useRef, useEffect } from "react";
import logo from "../assets/pandora_logo.svg";

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
  const navContainerRef = useRef<HTMLDivElement>(null);
  const [navWidth, setNavWidth] = useState(1024);

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
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm transition-opacity duration-300 lg:hidden"
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
                  className="space text-sm font-medium text-white/80 transition-colors duration-200 hover:text-primary"
                  href={item.id}
                  key={item.id}
                >
                  {item.name}
                </a>
              ))}
              <a
                href={`https://wa.me/2349072896677?text=Hi Johnpaul, I'm _____ and I came across Pandora and I'd like to book a call`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button
                  className="text-background border flex w-fit cursor-pointer items-center rounded-lg bg-white px-3 py-2 font-medium text-sm transition-transform active:scale-95"
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

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              className="flex h-8 w-8 flex-col items-center justify-center gap-1.5 rounded text-white/90 transition-colors hover:text-primary cursor-pointer active:scale-95 lg:hidden"
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
                className="space text-sm font-medium py-1.5 hover:text-primary transition-colors"
                href={item.id}
                key={item.id}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <a
              href={`https://wa.me/2349072896677?text=Hi Johnpaul, I'm _____ and I came across Pandora and I'd like to book a call`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="mt-1 w-full"
            >
              <button
                className="text-background border flex w-full cursor-pointer items-center justify-center rounded-lg bg-white px-3 py-2 text-sm font-medium transition-transform active:scale-95"
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
