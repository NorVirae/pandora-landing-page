import node from "./assets/node.webp";
import battery from "./assets/battery.webp";
import sessions from "./assets/sessions.webp";
import agents from "./assets/agents.webp";
import load from "./assets/load.webp";
const Grid = () => {
  return (
    <section className="p-5">
      {/* Pandora Node */}
      <div className="grid-area relative isolate h-[50vh] rounded-b-lg lg:h-screen">
        <p className="space mt-10 text-center text-2xl font-medium tracking-tight capitalize lg:text-5xl">
          One node. Five ways it earns. <br className="hidden md:block" />
          Here's what it puts out.
        </p>

        <img
          src={node}
          alt="pandora node"
          className="absolute bottom-0 left-1/2 -z-1 h-44 w-full -translate-x-1/2 lg:h-8/12 lg:w-8/12"
        />
      </div>

      {/* Grid Area */}

      <div className="mt-5 grid grid-cols-7 gap-5">
        {/* Battery */}
        <article className="border-border relative col-span-7 h-48 overflow-clip rounded-lg border lg:col-span-3 lg:h-96">
          <img
            src={battery}
            className="h-full w-full object-cover"
            alt="daily power generation"
          />
          <div className="grid-info absolute bottom-0 left-0 h-1/3 w-full px-4 py-3 lg:h-1/4 lg:px-8">
            <h2 className="space text-xl font-medium lg:text-2xl">
              250KWh generated per day
            </h2>

            <span className="text-sm lg:text-base">
              {" "}
              Enough to help keep 6 homes running around the clock.
            </span>
          </div>
        </article>

        {/* Session */}
        <article className="border-border relative col-span-7 h-48 overflow-clip rounded-lg border lg:col-span-4 lg:h-96">
          <img
            src={sessions}
            className="h-full w-full object-cover"
            alt="daily power generation"
          />
          <div className="grid-info absolute bottom-0 left-0 h-1/3 w-full px-4 py-3 lg:h-1/4 lg:px-8">
            <h2 className="space text-xl font-medium lg:text-2xl">
              10,000+ AI Agents/Node
            </h2>

            <span className="text-sm lg:text-base">
              Running businesses' automations at a fraction of cloud cost.
            </span>
          </div>
        </article>

        {/* Agents */}
        <article className="border-border relative col-span-7 h-48 overflow-clip rounded-lg border lg:col-span-4 lg:h-96">
          <img
            src={agents}
            className="h-full w-full object-cover"
            alt="daily power generation"
          />
          <div className="grid-info absolute bottom-0 left-0 h-1/3 w-full px-4 py-3 lg:h-1/4 lg:px-8">
            <h2 className="space text-xl font-medium lg:text-2xl">
              30–40 concurrent AI sessions
            </h2>

            <span className="text-sm lg:text-base">
              Serving thousands of users per day through smart batching.
            </span>
          </div>
        </article>

        {/* Load */}
        <article className="border-border relative col-span-7 h-48 overflow-clip rounded-lg border lg:col-span-3 lg:h-96">
          <img
            src={load}
            className="h-full w-full object-cover"
            alt="daily power generation"
          />
          <div className="grid-info absolute bottom-0 left-0 h-1/3 w-full px-4 py-3 lg:h-1/4 lg:px-8">
            <h2 className="space text-xl font-medium lg:text-2xl">
              2–4 Sec At Light Load
            </h2>

            <span className="text-sm lg:text-base">
              Regional edge placement, meaning no overseas round-trip.
            </span>
          </div>
        </article>
      </div>
    </section>
  );
};
export default Grid;
