import { useRef } from "react";
import power from "./assets/power.webp";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import AnimatedText from "./components/animatedText";

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const maskApertureRef = useRef<SVGGElement>(null);
  const portalBorderRef = useRef<SVGGElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const heroOverlayRef = useRef<HTMLDivElement>(null);
  const darkBackdropRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (
        !containerRef.current ||
        !maskApertureRef.current ||
        !portalBorderRef.current ||
        !darkBackdropRef.current
      )
        return;

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
          end: "+=150%",
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
      className="relative h-screen bg-hero min-h-screen w-full overflow-hidden"
    >
      {/* Underneath Layer: Power Section (Revealed via Aperture) */}
      <div className="power-info bg-background absolute inset-0 z-0 flex h-screen min-h-screen w-full flex-col p-5 lg:flex-row lg:gap-10">
        <div className="border-border h-full basis-1/2 border">
          <img src={power} className="h-full w-full" alt="power grid" />
        </div>

        {/* Power Gen */}
        <div className="border-border flex h-[50vh] flex-col border lg:h-full lg:basis-1/2">
          {/* 3D border */}
          <div
            style={{
              padding: "1px",
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.30) 0%, rgba(255,255,255,0.08) 40%, rgba(0,0,0,0.35) 100%)",
            }}
          >
            <div
              className="bg-foreground p-3 lg:p-10"
              style={{
                boxShadow:
                  /* inner top highlight */ "inset 0 5px 7px rgba(255,255,255,0.18)," +
                  /* inner left highlight */ "inset 0 0 0 rgba(0, 0, 0,0)," +
                  /* inner bottom shadow */ "inset 0 -3px 0 rgba(0,0,0,0.45)," +
                  /* inner right shadow */ "inset 0 0 0 rgba(0,0,0,0)," +
                  /* outer depth / lift */ "0 8px 32px rgba(0,0,0,0.55)",
              }}
            >
              <div className="bg-foreground p-3 lg:p-10">
                <h2 className="space text-2xl font-medium tracking-tight lg:text-3xl">
                  Power Generation
                </h2>

                <p className="mt-5 text-xs leading-relaxed lg:text-sm">
                  Every cluster starts with a solar microgrid — generating ~250
                  kWh a day, enough to power 30 homes around the clock. It's not
                  a side effect of the compute business; it's the foundation
                  everything else runs on, and the reason the electricity bill
                  for AI is close to zero.
                </p>
              </div>
            </div>
          </div>

          <div className="relative mt-auto py-10 lg:py-20">
            <div className="absolute top-0 left-0 flex h-full w-1.25 flex-col justify-between">
              <div className="bg-primary basis-[60%]" />

              <div className="basis-[15%] bg-white" />

              <div className="basis-[15%] bg-white" />
            </div>
            <AnimatedText
              as="h2"
              text={"Solar that lights up\nhomes, first."}
              className="space pr-2 text-end text-2xl font-medium tracking-tight capitalize lg:ml-[50%] lg:text-start lg:text-3xl"
            />
          </div>
        </div>
      </div>

      
      {/* Foreground Layer: Hero Dark Overlay with SVG Mask Aperture */}
      <div
        ref={heroOverlayRef}
        className="pointer-events-none absolute inset-0 z-10 h-full w-full"
      >
        {/* Dark backdrop that stretches its clip-path to the screen corners (Podium-style) */}
        <div
          ref={darkBackdropRef}
          className="absolute inset-0 h-full w-full bg-[#0f0f0f]"
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
        {/* Bottom Hero Write Up & Scroll Cue */}
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
