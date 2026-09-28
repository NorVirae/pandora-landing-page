import { useState, useRef, useEffect } from "react";
import zentativ from "../assets/zentativ.webp";
import jobraker from "../assets/jobraker.jpeg";

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

const Btn2 = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isVisible = isOpen || isHovered;

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 200);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="text-background flex w-fit cursor-pointer items-center gap-2 rounded-lg border bg-white px-4 py-3 text-sm font-medium transition-transform active:scale-95 lg:px-5"
        style={{
          boxShadow:
            "0 0 0 0 rgba(0,0,0,1)," +
            "inset 0 -4px 0px rgba(0,0,0,0.5)," +
            "0 8px 32px rgba(0,0,0,0.35)",
        }}
      >
        <span>View Projects</span>
        <svg
          className={`h-3.5 w-3.5 transition-transform duration-200 ${
            isVisible ? "rotate-180" : ""
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

      {/* Projects Dropdown Menu */}
      <div
        className={`absolute top-full left-1/2 -translate-x-1/2 z-50 pt-2 transition-all duration-200 ${
          isVisible
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        <div className="w-56 rounded-xl border border-[#383838] bg-[#1a1a1a]/95 p-1.5 shadow-[0_12px_32px_rgba(0,0,0,0.7)] backdrop-blur-xl">
          <div className="flex flex-col gap-1">
            {projectItems.map((project) => (
              <a
                key={project.name}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  setIsOpen(false);
                  setIsHovered(false);
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
  );
};

export default Btn2;
