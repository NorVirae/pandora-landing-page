import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import AnimatedText from "./components/animatedText";
import Benefits from "./Benefits";

// ── Grid background data (from ggg.svg) ──────────────────────────────
// Horizontal line pairs: each pair of y-values forms a "track"
const horizontalLines = [
  { y: 450.5, len: 1852 },
  { y: 480.5, len: 1852 },
  { y: 650.5, len: 1728 },
  { y: 680.5, len: 1728 },
  { y: 925.5, len: 1728 },
  { y: 955.5, len: 1728 },
];

// Diagonal lines going ↘ (top-left to bottom-right at ~60°)
const diagonalLinesA = [
  { x1: 376.567, y1: -144.835, x2: 1413.07, y2: 1650.44 },
  { x1: 346.567, y1: -144.835, x2: 1383.07, y2: 1650.44 },
  { x1: 559.067, y1: -144.835, x2: 1595.57, y2: 1650.44 },
  { x1: 589.067, y1: -144.835, x2: 1625.57, y2: 1650.44 },
  { x1: 847.567, y1: -198.75, x2: 1884.07, y2: 1596.52 },
  { x1: 878.567, y1: -198.75, x2: 1915.07, y2: 1596.52 },
];

// Diagonal lines going ↙ (matrix-transformed, top-right to bottom-left)
const diagonalLinesB = [
  { tx: 473, ty: 1650.19 },
  { tx: 503, ty: 1650.19 },
  { tx: 325, ty: 1596.27 },
  { tx: 295, ty: 1596.27 },
  { tx: 3, ty: 1596.27 },
  { tx: -27, ty: 1596.27 },
];



const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const maskApertureRef = useRef<SVGGElement>(null);
  const portalBorderRef = useRef<SVGGElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const heroOverlayRef = useRef<HTMLDivElement>(null);
  const darkBackdropRef = useRef<HTMLDivElement>(null);
  const gridSvgRef = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      if (
        !containerRef.current ||
        !maskApertureRef.current ||
        !portalBorderRef.current ||
        !darkBackdropRef.current
      )
        return;

      // ── Animate grid pulse segments ──────────────────────────────
      const pulses = containerRef.current.querySelectorAll(".grid-pulse");
      pulses.forEach((pulse, i) => {
        const pathLength = (pulse as SVGPathElement).getTotalLength?.() || 2073;
        const segLen = 120; // visible "thick" segment length

        gsap.set(pulse, {
          strokeDasharray: `${segLen} ${pathLength}`,
          strokeDashoffset: segLen,
        });

        gsap.to(pulse, {
          strokeDashoffset: -pathLength,
          duration: 4 + (i % 3) * 1.5,
          ease: "none",
          repeat: -1,
          delay: i * 0.45,
        });
      });

      // Logo polygon in clip-path % coords — maps the Pandora logo shape
      // from the SVG viewBox (1920×1080) to % of viewport
      const logoClip =
        "polygon(31.2% 38.5%, 38.2% 26.7%, 50.0% 6.1%, 62.6% 26.7%, 69.8% 38.5%, 69.8% 71.6%, 62.4% 84.5%, 50.0% 84.5%, 37.6% 84.5%, 30.2% 71.6%)";
      const fullClip =
        "polygon(0% 0%, 50% 0%, 100% 0%, 100% 50%, 100% 100%, 50% 100%, 0% 100%, 0% 50%)";

      // Set initial clip-path on the dark backdrop
      gsap.set(darkBackdropRef.current, { clipPath: logoClip });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=80%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // 1. Fade out hero typography
      tl.to(
        heroContentRef.current,
        {
          opacity: 0,
          y: -50,
          ease: "power2.out",
          duration: 0.35,
        },
        0,
      );

      // 2a. Scale the neon border lines outward (glow effect)
      tl.to(
        portalBorderRef.current,
        {
          scale: 3.2,
          svgOrigin: "960 540",
          ease: "power1.in",
          duration: 0.45,
        },
        0,
      );
      tl.to(
        portalBorderRef.current,
        {
          scale: 38,
          svgOrigin: "960 540",
          ease: "power2.inOut",
          duration: 0.55,
        },
        0.45,
      );

      // 2b. ALSO scale the SVG mask aperture (keeps the dark overlay hole aligned)
      tl.to(
        maskApertureRef.current,
        {
          scale: 3.2,
          svgOrigin: "960 540",
          ease: "power1.in",
          duration: 0.45,
        },
        0,
      );
      tl.to(
        maskApertureRef.current,
        {
          scale: 38,
          svgOrigin: "960 540",
          ease: "power2.inOut",
          duration: 0.55,
        },
        0.45,
      );

      // 2c. Podium-style stretch: the dark backdrop's clip-path expands so
      //     its EDGES stretch to the screen corners
      tl.to(
        darkBackdropRef.current,
        {
          clipPath: fullClip,
          ease: "power2.inOut",
          duration: 1.0,
        },
        0,
      );

      // 3. Reveal the power content details
      tl.fromTo(
        ".power-info",
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, ease: "power2.out", duration: 0.4 },
        0.55,
      );

      // 4. Fade out overlay at the very end
      tl.to(
        heroOverlayRef.current,
        {
          opacity: 0,
          ease: "power1.inOut",
          duration: 0.15,
        },
        0.6,
      );

      // 5. Hold power section on screen while next panel slides over it
      tl.to({}, { duration: 0.5 });
    },
    { scope: containerRef, dependencies: [] },
  );

  return (
    <div
      id="home"
      ref={containerRef}
      className="relative h-screen min-h-screen w-full overflow-hidden bg-[#0f0f0f]"
    >
      {/* Inline SVG Grid Background (replaces bg-hero CSS) */}
      <svg
        ref={gridSvgRef}
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 1728 1117"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        {/* Background fill */}
        <rect width="1728" height="1117" fill="#0f0f0f" />

        {/* ── Horizontal grid lines ── */}
        {horizontalLines.map((line, i) => (
          <line
            key={`h-${i}`}
            x1={line.len}
            y1={line.y}
            x2="0"
            y2={line.y}
            stroke="#ffffff"
            strokeOpacity="0.15"
          />
        ))}

        {/* ── Diagonal lines A (↘ direction) ── */}
        {diagonalLinesA.map((line, i) => (
          <line
            key={`da-${i}`}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="#ffffff"
            strokeOpacity="0.15"
          />
        ))}

        {/* ── Diagonal lines B (↙ direction, matrix-transformed) ── */}
        {diagonalLinesB.map((line, i) => (
          <line
            key={`db-${i}`}
            x1="0"
            y1="-0.5"
            x2="2073"
            y2="-0.5"
            transform={`matrix(0.5,-0.866025,-0.866025,-0.5,${line.tx},${line.ty})`}
            stroke="#ffffff"
            strokeOpacity="0.15"
          />
        ))}


        {/* ── Animated pulse segments on horizontal tracks ── */}
        {horizontalLines.map((line, i) => (
          <line
            key={`hp-${i}`}
            className="grid-pulse"
            x1="0"
            y1={line.y}
            x2={line.len}
            y2={line.y}
            stroke="#14ee05"
            strokeWidth="3"
            strokeOpacity="0.6"
            strokeLinecap="round"
          />
        ))}

        {/* ── Animated pulse segments on diagonal A tracks ── */}
        {diagonalLinesA.map((line, i) => (
          <line
            key={`dap-${i}`}
            className="grid-pulse"
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="#14ee05"
            strokeWidth="3"
            strokeOpacity="0.5"
            strokeLinecap="round"
          />
        ))}

        {/* ── Animated pulse segments on diagonal B tracks ── */}
        {diagonalLinesB.map((line, i) => (
          <line
            key={`dbp-${i}`}
            className="grid-pulse"
            x1="0"
            y1="-0.5"
            x2="2073"
            y2="-0.5"
            transform={`matrix(0.5,-0.866025,-0.866025,-0.5,${line.tx},${line.ty})`}
            stroke="#14ee05"
            strokeWidth="3"
            strokeOpacity="0.5"
            strokeLinecap="round"
          />
        ))}
      </svg>

      {/* Underneath Layer: Benefits Section (Revealed via Aperture) */}
      <Benefits />

      {/* Foreground Layer: Hero Dark Overlay with SVG Mask Aperture */}
      <div
        ref={heroOverlayRef}
        className="pointer-events-none absolute inset-0 z-10 h-full w-full"
      >
        <div
          ref={darkBackdropRef}
          className="absolute left-1/2 top-1/2 h-5/12 w-5/12 -translate-x-1/2 -translate-y-1/2 bg-background rounded-full"
          style={{ willChange: "clip-path" }}
        />
        <svg
          className="absolute inset-0 h-full w-full scale-80 lg:scale-100"
          viewBox="0 0 1920 1080"
          preserveAspectRatio="xMidYMid slice"
          overflow="visible"
        >
          <defs>
            <filter
              id="portal-glow"
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
            >
              <feGaussianBlur stdDeviation="10" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* The Hero Aperture Mask */}
            <mask id="hero-mask">
              {/* Opaque white covers the entire canvas */}
              <rect
                x="-5000"
                y="-5000"
                width="10000"
                height="10000"
                fill="white"
              />
              {/* Black cutout creates the transparent aperture window */}
              <g
                ref={maskApertureRef}
                style={{ transformOrigin: "960px 540px" }}
              >
                <g transform="translate(597.5, 158)">
                  <path
                    d="M723.964 209.262L603.724 1L455.437 257.841L133.906 257.841L0.867188 488.271H322.398L322.144 488.71L480.565 763.103L724.01 763.103L564.107 486.143L723.964 209.262Z"
                    fill="black"
                  />
                </g>
              </g>
            </mask>
          </defs>

          {/* Glowing Neon Green Silhouette & Aperture Accents */}
          <g ref={portalBorderRef} style={{ transformOrigin: "960px 540px" }}>
            <g transform="translate(597.5, 158)">
              {/* Glowing outer contour */}
              <path
                d="M723.964 209.262L603.724 1L455.437 257.841L133.906 257.841L0.867188 488.271H322.398L322.144 488.71L480.565 763.103L724.01 763.103L564.107 486.143L723.964 209.262Z"
                stroke="#14EE05"
                strokeWidth="4"
                fill="none"
                filter="url(#portal-glow)"
              />
              {/* Layer 1 - Brightest Neon Green (#14EE05) */}
              <path
                d="M693.345 209.262L603.727 54.0391L468.382 288.463L146.852 288.463L49.1719 457.649L334.836 457.65L493.511 732.482H675.711L533.488 486.143L693.345 209.262Z"
                stroke="#14EE05"
                strokeWidth="22"
                strokeOpacity="0.85"
                fill="none"
              />

              {/* Layer 2 - Medium-Bright Green (#10BE04) */}
              <path
                d="M670.379 209.262L603.727 93.8179L478.089 311.429H156.559L85.3984 434.683L344.543 434.683L503.218 709.515H639.486L510.522 486.143L670.379 209.262Z"
                stroke="#10BE04"
                strokeWidth="18"
                strokeOpacity="0.75"
                fill="none"
              />

              {/* Layer 3 - Medium Green (#0C8C03) */}
              <path
                d="M509.687 694.203H615.332L495.208 486.142L655.066 209.261L603.725 120.336L484.558 326.74L163.028 326.739L109.547 419.371H351.012L509.687 694.203Z"
                stroke="#0C8C03"
                strokeWidth="16"
                strokeOpacity="0.7"
                fill="none"
              />

              {/* Layer 4 - Dark Green (#085A02) */}
              <path
                d="M121.617 411.516L354.426 411.517L513.213 686.163L602.902 686.164L487.626 486.777L647.818 209.703L603.725 133.438L487.612 334.272L166.276 334.272L121.617 411.516Z"
                stroke="#085A02"
                strokeWidth="14"
                strokeOpacity="0.65"
                fill="none"
              />

              {/* Layer 5 - Deep Dark Forest Green (#032801) */}
              <path
                d="M632.098 209.262L603.723 160.116L494.263 349.706L393.469 349.706H333.756H172.733L145.771 396.405H360.717L414.01 488.71L442.384 537.855L519.392 671.237H579.105L472.24 486.143L524.05 396.405L551.012 349.706L632.098 209.262Z"
                stroke="#032801"
                strokeWidth="12"
                strokeOpacity="0.6"
                fill="none"
              />

              {/* Inner Core Accent */}
              <path
                d="M603.722 186.636L500.733 365.018H386.996L357.905 365.018H179.202L169.921 381.094H367.187L429.319 488.71L442.382 511.336L525.861 655.926H554.952L456.928 486.143L517.578 381.094L526.86 365.018L616.785 209.262L603.722 186.636Z"
                stroke="#011500"
                strokeWidth="8"
                strokeOpacity="0.5"
                fill="none"
              />
            </g>
          </g>
        </svg>
      </div>

      {/* Hero Content: Branding & Typography */}
      <div
        ref={heroContentRef}
        className="pointer-events-none absolute inset-0 z-20 flex h-full w-full flex-col justify-end p-5 md:p-14"
      >
        <div className="relative flex w-full flex-col items-start justify-between gap-y-10 md:flex-row md:items-end">
          <AnimatedText
            as="h1"
            text={"Power and compute,\nfrom the same sun"}
            className="space text-3xl leading-tight font-medium sm:text-4xl md:text-5xl"
            scrollTrigger={false}
            delay={0.2}
            stagger={0.06}
          />

          <p className="text-xs leading-relaxed md:w-md md:text-sm">
            Pandora builds solar microgrids that light homes and run AI. One
            deployment closing two of Africa's largest gaps at once, and paying
            for itself in about eight months.
          </p>
        </div>
      </div>
    </div>
  );
};
export default Hero;
