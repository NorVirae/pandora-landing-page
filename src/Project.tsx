import AnimatedText from "./components/animatedText";

const Project = () => {
  return (
    <section className="bg-team relative flex items justify-between lg:flex-row flex-col px-5 py-20 text-center">
      <div className="basis-[30%]">
        <AnimatedText
          as="h2"
          text="Project Pandora"
          className="space3 text-primary text-2xl text-start font-medium tracking-tight capitalize lg:text-4xl"
          stagger={0.06}
        />
      </div>
      <div className="basis-[70%]">
        
        <p className="lg:mt-0 mt-5 leading-relaxed text-balance text-white/70 text-justify text-base md:text-xl md:leading-loose">
          Across Africa, two shortages sit side by side. Around 600 million
          people live without reliable electricity. At the same time, African
          developers and businesses can't afford the computing power that
          artificial intelligence runs on, because it's rented by the hour,
          priced in dollars, and housed in data centres on other continents. <br />
          Project Pandora treats these as one problem. It builds solar
          installations that do two jobs at once: they power homes in the
          community around them, and they run the processors that AI depends on.
          The electricity and the computing come from the same sunlight.
        </p>
      </div>
    </section>
  );
};

export default Project;

