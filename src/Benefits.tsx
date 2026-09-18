import { useState, useEffect, useRef, useCallback } from "react";
import power from "./assets/power.webp";
import compute from "./assets/compute.webp";
import agent from "./assets/agent.webp";
import arrow from "./assets/arrow.svg";
import AnimatedText from "./components/animatedText";

const cardShadow =
  "inset 0 5px 7px rgba(255,255,255,0.18)," +
  "inset 0 0 0 rgba(0, 0, 0,0)," +
  "inset 0 -3px 0 rgba(0,0,0,0.45)," +
  "inset 0 0 0 rgba(0,0,0,0)," +
  "0 8px 32px rgba(0,0,0,0.55)";

const benefits = [
  {
    index: 0,
    title: "Power Generation",
    desc: "Every cluster starts with a solar microgrid — generating ~250 kWh a day, enough to power 30 homes around the clock. It's not a side effect of the compute business; it's the foundation everything else runs on, and the reason the electricity bill for AI is close to zero.",
    tagline: "Solar that lights up homes, first.",
    img: power,
  },
  {
    index: 1,
    title: "Compute Generation",
    desc: "The same site that powers homes also runs a farm of GPU nodes - regional, edge-deployed compute for developers and businesses who've been priced out of the cloud. Because the electricity and the hardware are ours, compute runs at close to zero marginal cost.",
    tagline: "GPU power, running on power we already own.",
    img: compute,
  },
  {
    index: 2,
    title: "Agent as a Service",
    desc: "On top of that compute, we run and host AI agents that do real jobs: applying to jobs, answering customer support tickets, tutoring students — thousands of agents per node, each costing fractions of a cent to run.",
    tagline: "AI agents, live and working, not just infrastructure.",
    img: agent,
  },
];

const Benefits = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const total = benefits.length;

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  }, [total]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  }, [total]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext]);

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchStartX.current - touchEndX;
    if (diffX > 50) handleNext();
    if (diffX < -50) handlePrev();
    touchStartX.current = null;
  };

  return (
    <section
      className="power-info bg-background/80 absolute inset-0 z-0 flex h-screen w-full items-center justify-center overflow-hidden select-none perspective-[1400px]"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* 3D Carousel Stage */}
      <div className="relative flex h-full w-full items-center justify-center transform-3d">
        {benefits.map((benefit, i) => {
          let diff = i - activeIndex;
          if (diff > total / 2) diff -= total;
          if (diff < -total / 2) diff += total;

          const isCenter = diff === 0;
          const isLeft = diff === -1;
          const isRight = diff === 1;

          let transformStyle = "";
          let opacity = 0;
          let zIndex = 0;
          let filter = "brightness(0.6)";

          if (isCenter) {
            transformStyle =
              "translateX(0%) translateZ(0px) rotateY(0deg) scale(1)";
            opacity = 1;
            zIndex = 30;
            filter = "brightness(1)";
          } else if (isLeft) {
            transformStyle =
              "translateX(-56%) translateZ(-110px) rotateY(28deg) scale(0.86)";
            opacity = 0.9;
            zIndex = 15;
            filter = "brightness(0.3)";
          } else if (isRight) {
            transformStyle =
              "translateX(56%) translateZ(-110px) rotateY(-28deg) scale(0.86)";
            opacity = 0.9;
            zIndex = 15;
            filter = "brightness(0.3)";
          } else {
            transformStyle = `translateX(${diff * 80}%) translateZ(-200px) rotateY(${diff > 0 ? -45 : 45}deg) scale(0.7)`;
            opacity = 0;
            zIndex = 0;
          }

          return (
            <div
              key={benefit.index}
              onClick={() => {
                if (isLeft) handlePrev();
                if (isRight) handleNext();
              }}
              style={{
                transform: transformStyle,
                opacity,
                zIndex,
                filter,
              }}
              className={`bg-background absolute top-1/2 left-1/2 flex h-[82vh] max-h-165 min-h-115 w-[90vw] max-w-6xl -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden border border-white/10 p-5 shadow-2xl backdrop-blur-xl transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform transform-3d lg:flex-row lg:gap-10 lg:p-8 ${
                !isCenter ? "cursor-pointer hover:opacity-85" : ""
              }`}
            >
              {/* Left Side: Image */}
              <div className="border-border relative h-[42%] w-full basis-1/2 overflow-hidden border lg:h-full">
                <img
                  src={benefit.img}
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  alt={benefit.title}
                />
              </div>

              {/* Right Side: Content */}
              <div className="border-border flex h-[58%] basis-1/2 flex-col justify-between border-t pt-4 lg:h-full lg:border-t-0 lg:pt-0">
                {/* 3D border card */}
                <div
                  className="overflow-hidden"
                  style={{
                    padding: "1px",
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.30) 0%, rgba(255,255,255,0.08) 40%, rgba(0,0,0,0.35) 100%)",
                  }}
                >
                  <div
                    className="bg-foreground p-4 lg:p-8"
                    style={{ boxShadow: cardShadow }}
                  >
                    <AnimatedText
                      as="h2"
                      text={benefit.title}
                      scrollTrigger={false}
                      className="space text-xl font-medium tracking-tight text-white lg:text-3xl"
                      stagger={0.04}
                    />

                    <p className="mt-3 text-xs leading-relaxed text-white/70 lg:mt-5 lg:text-sm">
                      {benefit.desc}
                    </p>
                  </div>
                </div>

                {/* Bottom Tagline & Indicator Bar */}
                <div className="relative mt-auto py-4 lg:py-10">
                  <div className="absolute top-0 left-0 flex h-full w-1.25 flex-col justify-between">
                    {[0, 1, 2].map((barIndex) => (
                      <div
                        key={barIndex}
                        className={`w-full transition-all duration-300 ${
                          barIndex === benefit.index
                            ? "bg-primary basis-[60%]"
                            : "basis-[15%] bg-white"
                        }`}
                      />
                    ))}
                  </div>
                  <AnimatedText
                    as="h2"
                    text={benefit.tagline}
                    scrollTrigger={false}
                    className="space pr-2 text-end text-lg font-medium tracking-tight text-white capitalize lg:ml-[40%] lg:text-start lg:text-2xl"
                    stagger={0.03}
                  />
                </div>
              </div>
            </div>
          );
        })}

        {/* "PREV" Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          aria-label="Previous Benefit"
          className="hover:text-primary absolute top-1/2 left-3 z-30 -translate-y-1/2 cursor-pointer rounded-full bg-neutral-600/30 p-3 font-mono text-[11px] text-white/90 shadow-2xl backdrop-blur-xl transition-all duration-300 active:scale-95 lg:p-4"
        >
          <img src={arrow} className="rotate-180 lg:h-6" alt="previous" />
        </button>

        {/* "NEXT" Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          aria-label="Next Benefit"
          className="hover:text-primary absolute top-1/2 right-3 z-30 -translate-y-1/2 cursor-pointer rounded-full bg-neutral-600/30 p-3 font-mono text-[11px] text-white/90 shadow-2xl backdrop-blur-xl transition-all duration-300 active:scale-95 lg:p-4"
        >
          <img src={arrow} className="lg:h-6" alt="previous" />
        </button>

        {/* Pagination Dots */}
        <div className="absolute bottom-5 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2.5">
          {benefits.map((_, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                setActiveIndex(i);
              }}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 cursor-pointer rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? "bg-primary w-8 shadow-[0_0_12px_rgba(20,238,5,0.7)]"
                  : "w-2 bg-neutral-600 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
