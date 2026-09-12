import udo from "./assets/udo.webp";

const team = [
  {
    index: "0",
    name: "Guy 1",
    role: "Founder",
    img: "",
  },
  {
    index: "1",
    name: "Guy 2",
    role: "Lead Developer",
    img: "",
  },
  {
    index: "2",
    name: "Guy 3",
    role: "Designer",
    img: "",
  },
  {
    index: "3",
    name: "Guy 4",
    role: "Developer",
    img: "",
  },
  {
    index: "4",
    name: "Guy 5",
    role: "Systems Engineer",
    img: "",
  },
];
const Team = () => {
  return (
    <section className="bg-team mt-40 flex h-screen flex-col p-5 py-10 lg:justify-between">
      <div className="flex flex-col justify-between gap-3 lg:flex-row lg:gap-0">
        <h2 className="space text-2xl font-medium tracking-tight capitalize lg:max-w-xl lg:text-5xl">
          Built by operators, not spectators.
        </h2>

        <p className="text-xs leading-relaxed md:w-md md:text-sm">
          Project Pandora is its most active venture: infrastructure built by
          people who've shipped hands-on, technical work before, not first-time
          founders theorizing about Africa's power gap from the outside.
        </p>
      </div>

      <div className="scrollbar-hide mt-5 flex h-64 w-full flex-nowrap gap-x-5 overflow-x-auto lg:mt-0 lg:h-auto lg:basis-[75%] lg:gap-x-10">
        {team.map((member) => (
          <div
            key={member.index}
            className="bg-foreground border-border relative h-full w-64 shrink-0 border [clip-path:polygon(48px_0,100%_0,100%_calc(100%-48px),calc(100%-48px)_100%,0_100%,0_48px)] lg:w-auto lg:basis-1/3"
          >
            
            <img src={udo} className="object-cover h-full w-full object-center" alt={member.name} />
            <div className="absolute bottom-0 left-0 w-full px-2 pb-2 lg:px-5 lg:pb-5 grid-info pt-1">
              <span className="space text-lg font-medium text-white lg:text-2xl">
                {member.name}
              </span>
              <p className="text-sm text-white lg:text-lg">{member.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Team;
