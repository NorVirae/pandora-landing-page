import { useState, useRef, useEffect, useCallback } from "react";
import jp from "./assets/jp.webp";
import frank from "./assets/frank.webp";
import isaac from "./assets/isaac.webp";
import udo from "./assets/udo.webp";
import arrow from "./assets/arrow.svg";
import AnimatedText from "./components/animatedText";

const team = [
  {
    index: "0",
    name: "Johnpaul Ezeagwu",
    role: "C.E.O Pandora Dynamics",
    img: jp,
  },
  {
    index: "1",
    name: "Mba Norbert Frank",
    role: "C.T.O Pandoradynamics",
    img: frank,
  },
  {
    index: "2",
    name: "Edmund Uchechukwu Isaac",
    role: "C.O.O Pandora Dynamics",
    img: isaac,
  },
  {
    index: "3",
    name: "Udochukwu Chimbo",
    role: "Head of Design. Pandora Dynamics",
    img: udo,
  },
];

const Team = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 5);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
  }, []);

  useEffect(() => {
    checkScroll();
    // Recheck after initial render/image loading
    const timer = setTimeout(checkScroll, 100);
    window.addEventListener("resize", checkScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll]);

  const handlePrev = () => {
    if (scrollContainerRef.current) {
      const cardWidth =
        scrollContainerRef.current.firstElementChild?.clientWidth || 300;
      scrollContainerRef.current.scrollBy({
        left: -(cardWidth + 250),
        behavior: "smooth",
      });
    }
  };

  const handleNext = () => {
    if (scrollContainerRef.current) {
      const cardWidth =
        scrollContainerRef.current.firstElementChild?.clientWidth || 300;
      scrollContainerRef.current.scrollBy({
        left: cardWidth + 250,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="about"
      className="bg-team relative mt-40 flex flex-col p-5 py-10 pb-10 lg:h-screen lg:justify-between"
    >
      <div className="flex flex-col justify-between gap-3 lg:flex-row lg:gap-0">
        <AnimatedText
          as="h2"
          text="Built by operators, not spectators."
          className="space text-2xl font-medium tracking-tight capitalize lg:max-w-xl lg:text-5xl"
          stagger={0.06}
        />

        <p className="text-xs leading-relaxed md:w-md md:text-sm">
          Project Pandora is its most active venture: infrastructure built by
          people who've shipped hands-on, technical work before, not first-time
          founders theorizing about Africa's power gap from the outside.
        </p>
      </div>

      <div
        ref={scrollContainerRef}
        onScroll={checkScroll}
        className="scrollbar-hide mt-5 flex h-64 w-full flex-nowrap gap-x-5 overflow-x-auto scroll-smooth lg:mt-10 lg:h-auto lg:basis-[80%] lg:gap-x-10"
      >
        {/* "PREV" Button */}
        {canScrollLeft && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            aria-label="Previous Team Member"
            className="hover:text-primary -translate-y-1/ absolute top-2/3 left-3 z-10 cursor-pointer rounded-full bg-neutral-800/80 p-3 font-mono text-[11px] text-white/90 shadow-2xl backdrop-blur-xl transition-all duration-300 active:scale-95 lg:p-4"
          >
            <img src={arrow} className="rotate-180 lg:h-6" alt="previous" />
          </button>
        )}

        {/* "NEXT" Button */}
        {canScrollRight && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            aria-label="Next Team Member"
            className="hover:text-primary absolute top-2/3 right-3 z-10 -translate-y-1/2 cursor-pointer rounded-full bg-neutral-800/80 p-3 font-mono text-[11px] text-white/90 shadow-2xl backdrop-blur-xl transition-all duration-300 active:scale-95 lg:p-4"
          >
            <img src={arrow} className="lg:h-6" alt="next" />
          </button>
        )}
        {team.map((member) => (
          <div
            key={member.index}
            className="bg-foreground border-border relative h-full w-64 shrink-0 border [clip-path:polygon(48px_0,100%_0,100%_calc(100%-48px),calc(100%-48px)_100%,0_100%,0_48px)] lg:w-auto lg:basis-1/3"
          >
            <img
              src={member.img}
              className="h-full w-full object-cover object-center"
              alt={member.name}
            />
            <div className="grid-info absolute bottom-0 left-0 w-full px-2 pt-1 pb-2 lg:px-5 lg:pb-5">
              <span className="space text-base font-medium text-white lg:text-2xl">
                {member.name}
              </span>
              <p className="text-xs text-white/70 lg:text-lg">{member.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Team;
