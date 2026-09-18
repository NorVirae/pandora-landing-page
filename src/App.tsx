import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "lenis";
import Hero from "./Hero";
import Grid from "./Grid";
import Project from "./Project";
import Advantages from "./Advantages";
import Team from "./Team";
import Cta from "./Cta";
import Navbar from "./components/navbar";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const lenis = new Lenis({
    lerp: 0.05,
  });

  const raf = (time: number) => {
    lenis.raf(time);
    requestAnimationFrame(raf);
  };

  requestAnimationFrame(raf);

  return (
    <main className="plus-jakarta bg-background relative min-h-screen text-white selection:bg-[#14EE05] selection:text-black">
      <Navbar />
      <Hero />
      <Grid />
      <Project/>
      <Advantages />
      <Team />
      <Cta />
    </main>
  );
}

export default App;
