import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface AnimatedTextProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  stagger?: number;
  duration?: number;
  delay?: number;
  scrollTrigger?: boolean;
  start?: string;
}

export const AnimatedText = ({
  text,
  className = "",
  as: Component = "h2",
  stagger = 0.05,
  duration = 0.9,
  delay = 0,
  scrollTrigger = true,
  start = "top 85%",
}: AnimatedTextProps) => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;
      const words = containerRef.current.querySelectorAll(".split-word");
      if (!words.length) return;

      const animConfig: gsap.TweenVars = {
        yPercent: 0,
        opacity: 1,
        duration,
        delay,
        ease: "expo.out",
        stagger: { each: stagger },
      };

      if (scrollTrigger) {
        animConfig.scrollTrigger = {
          trigger: containerRef.current,
          start,
          toggleActions: "play none none none",
        };
      }

      gsap.fromTo(
        words,
        { yPercent: 110, opacity: 0 },
        animConfig
      );
    },
    { scope: containerRef }
  );

  const lines = text.split("\n");

  return (
    <Component ref={containerRef as any} className={className}>
      {lines.map((line, lineIndex) => (
        <span key={lineIndex} className="inline">
          {line.split(" ").map((word, wordIndex) => (
            <span
              key={wordIndex}
              className="inline-block overflow-hidden align-top mr-[0.28em] last:mr-0"
            >
              <span className="split-word inline-block opacity-0 will-change-transform">
                {word}
              </span>
            </span>
          ))}
          {lineIndex < lines.length - 1 && <br />}
        </span>
      ))}
    </Component>
  );
};

export default AnimatedText;
