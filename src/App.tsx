import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "lenis";
import Hero from "./Hero";
import Benefits from "./Benefits";
import Grid from "./Grid";
import Advantages from "./Advantages";
import Team from "./Team";
import Cta from "./Cta";
import Navbar from "./components/navbar";

gsap.registerPlugin(ScrollTrigger);

function App() {
  // Initialize Lenis smooth scrolling with GSAP ticker sync
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenis.on("scroll", ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, []);

  return (
    <main className="plus-jakarta bg-background min-h-screen text-white selection:bg-[#14EE05] selection:text-black relative">
      <Navbar/>
      <Hero />
      <Benefits />
      <Grid />
      <Advantages />
      <Team />
      <Cta />
    </main>
  );
}

export default App;
