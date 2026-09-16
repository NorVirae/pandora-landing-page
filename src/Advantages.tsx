import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import icon1 from "./assets/icon-1.webp";
import icon2 from "./assets/icon-2.webp";
import icon3 from "./assets/icon-3.webp";
import icon4 from "./assets/icon-4.webp";
import icon5 from "./assets/icon-5.webp";
import Btn from "./components/btn";

const LINE_PATH =
  "m 347.899,-125.9379 v 226.637 L 233.3,214.0181 117.1,213.8791 1.5,327.1951 2.00043,553.4171 H 347.9 l 115.6,113.598 v 225.527 H 348.4 l -115.1,114.02 v 226.5 114.08";

const cardShadow =
  "inset 0 5px 7px rgba(255,255,255,0.18)," +
  "inset 0 0 0 rgba(0, 0, 0,0)," +
  "inset 0 -7px 0 rgba(0,0,0,0.45)," +
  "inset 0 0 0 rgba(0,0,0,0)," +
  "0 8px 32px rgba(0,0,0,0.55)";

const advantages = [
  {
    index: 0,
    icon: icon1,
    text: "Pandora's small, distributed nodes shed heat passively, eliminating the cooling tax entirely.",
    grid: "lg:col-start-2 lg:col-end-6 lg:row-start-1",
  },
  {
    index: 1,
    icon: icon2,
    text: "Pandora generates its own power on-site, so the multi-year grid queue simply doesn't apply.",
    grid: "lg:col-start-9 lg:col-end-13 lg:row-start-4",
  },
  {
    index: 2,
    icon: icon3,
    text: "Pandora is capital-light by design, each cluster pays for itself in as little as 6-8 months.",
    grid: "lg:col-start-3 lg:col-end-7 lg:row-start-6",
  },
  {
    index: 3,
    icon: icon4,
    text: "Pandora runs on thousands of small, battery-backed nodes, so no single failure can take down the network.",
    grid: "lg:col-start-8 lg:col-end-12 lg:row-start-8",
  },
  {
    index: 4,
    icon: icon5,
    text: "Pandora places compute physically close to African users, cutting latency and cost at the same time.",
    grid: "lg:col-start-2 lg:col-end-6 lg:row-start-10",
  },
];

const Advantages = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineProgressRef = useRef<SVGPathElement>(null);

  useGSAP(
    () => {
      const path = lineProgressRef.current;
      const section = sectionRef.current;
      if (!path || !section) return;

      const length = path.getTotalLength();
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });

      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          end: "+=200%",
          scrub: 1,
        },
      });

      // Animate advantage cards
      const cards = section.querySelectorAll(".advantage-card");
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "expo.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );
      });
    },
    { scope: sectionRef },
  );

  return (
    <section className="flex w-full flex-col items-center px-5">
      <Btn className={"my-20"} />
      <div
        ref={sectionRef}
        className="bg-pitch relative flex min-h-screen w-full flex-col items-center overflow-hidden rounded-lg"
      >
        <svg
          viewBox="0 0 578 1475"
          fill="none"
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-1/2 hidden h-full -translate-x-1/2 -translate-y-1/2 lg:block"
        >
          <defs>
            <filter
              id="advantages-line-glow"
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
            >
              <feDropShadow
                dx="0"
                dy="0"
                stdDeviation="6"
                floodColor="#14EE05"
                floodOpacity="0.9"
              />
            </filter>
            {/* Icon Glow Start */}
            
          </defs>
          {/* Icon Glow End */}
          <path
            d={LINE_PATH}
            stroke="#ffffff"
            strokeOpacity="0.1"
            strokeWidth="3"
            strokeDasharray="50 50"
          />
          <path
            ref={lineProgressRef}
            d={LINE_PATH}
            stroke="#14EE05"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#advantages-line-glow)"
          />
        </svg>

        <div className="relative grid min-h-screen w-full grid-cols-1 gap-6 lg:grid-cols-12 lg:grid-rows-11 lg:gap-0 lg:p-10 lg:px-16">
          {advantages.map((advantage) => (
            <article
              key={advantage.text}
              style={{ boxShadow: cardShadow }}
              className={`advantage-card bg-foreground self-start rounded p-5 lg:max-w-none ${advantage.grid}`}
            >
              <img
                src={advantage.icon}
                alt={"icon" + advantage.index}
                className="h-10 w-10 shrink-0"
                style={{
                  filter:
                    advantage.index !== 0
                      ? "url(#icon-glow-green)"
                      : "drop-shadow(0 0 4px rgba(20, 238, 5, 0.5))",
                }}
              />
              <p className="mt-4 text-sm leading-relaxed">{advantage.text}</p>
            </article>
          ))}
        </div>

        <Btn className="mt-5" />
      </div>
    </section>
  );
};

export default Advantages;
