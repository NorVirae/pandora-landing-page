import compute from "./assets/compute.webp";
import agent from "./assets/agent.webp";

const cardShadow =
  "inset 0 5px 7px rgba(255,255,255,0.18)," +
  "inset 0 0 0 rgba(0, 0, 0,0)," +
  "inset 0 -3px 0 rgba(0,0,0,0.45)," +
  "inset 0 0 0 rgba(0,0,0,0)," +
  "0 8px 32px rgba(0,0,0,0.55)";
const benefits = [
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
    tagline: "AI agents, live and working - not just infrastructure.",
    img: agent,
  },
];

const Benefits = () => {
  return (
    <section className="mt-5">
      {benefits.map((benefit) => {
        return (
          <div
            key={benefit.index}
            className="panel mb-10 flex min-h-screen w-full flex-col overflow-hidden px-5 lg:h-screen lg:flex-row lg:gap-10"
          >
            <div className="border-border h-full basis-1/2 border">
              <img
                src={benefit.img}
                className="h-full w-full"
                alt="power grid"
              />
            </div>

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
                  style={{ boxShadow: cardShadow }}
                >
                  <h2 className="space text-2xl font-medium tracking-tight lg:text-3xl">
                    {benefit.title}
                  </h2>

                  <p className="mt-5 text-xs leading-relaxed lg:text-sm">
                    {benefit.desc}
                  </p>
                </div>
              </div>

              <div className="relative mt-auto py-10 lg:py-20">
                <div className="absolute top-0 left-0 flex h-full w-1.25 flex-col justify-between">
                  <div className="bg-primary basis-[60%]" />

                  <div className="basis-[15%] bg-white" />

                  <div className="basis-[15%] bg-white" />
                </div>
                <h2 className="space pr-2 text-end text-2xl font-medium tracking-tight capitalize lg:ml-[50%] lg:text-start lg:text-3xl">
                  {benefit.tagline}
                </h2>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
};
export default Benefits;
