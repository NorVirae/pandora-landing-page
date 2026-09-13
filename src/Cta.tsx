import Btn from "./components/btn";
import tlAnchor from "./assets/tl.svg"
import blAnchor from "./assets/bl.svg";
import trAnchor from "./assets/tr.svg";
import brAnchor from "./assets/br.svg";
const Cta = () => {
  return (
    <section className="relative isolate flex h-screen flex-col items-center justify-center gap-y-5 overflow-clip px-5 lg:gap-y-10">
      {/* Svg Anchors */}
      <img
        src={tlAnchor}
        className="pointer-events-none absolute top-0 left-0 w-2/5"
        alt="tl-anchor"
      />
      <img
        src={blAnchor}
        className="pointer-events-none absolute bottom-0 left-0 w-2/5"
        alt="tl-anchor"
      />

      <img
        src={trAnchor}
        className="pointer-events-none absolute top-0 right-0 w-2/5"
        alt="tl-anchor"
      />
      <img
        src={brAnchor}
        className="pointer-events-none absolute bottom-0 right-0 w-2/5"
        alt="tl-anchor"
      />
      <div className="bg-cta"></div>

      <h2 className="space text-center text-2xl font-medium tracking-tight text-pretty capitalize lg:max-w-xl lg:text-5xl">
        Ready to build on power you can trust?
      </h2>
      <p className="text-center text-xs leading-relaxed md:w-md md:text-sm">
        Whether you're renting compute, deploying an agent, or exploring a
        partnership, the infrastructure is live and ready for you.
      </p>
      <Btn />

      <span className="absolute bottom-5 text-sm">
        ©2026, Pandora. All rights reserved
      </span>
    </section>
  );
};

export default Cta;
