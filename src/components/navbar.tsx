import logo from "../assets/pandora_logo.svg";

const menuItems = [
  {
    name: "How it works",
    id: "#home",
  },
  {
    name: "Benefits",
    id: "#benefits",
  },
  {
    name: "About Us",
    id: "#about",
  },
];

const Navbar = () => {
  return (
    <nav className="fixed top-5 z-20 flex w-screen items-center justify-center">
      <div className="bg-navbar border-border flex w-4/5 items-center justify-center rounded border px-3 py-2 lg:justify-between">
        <img src={logo} className="h-7 lg:h-auto" alt="pandora" />

        <div className="hidden items-center gap-x-10 lg:flex">
          {menuItems.map((item) => (
            <a className="space" href={item.id} key={item.id}>
              {item.name}
            </a>
          ))}
          <a
            href={`https://wa.me/2349072896677?text=Hi Johnpaul, I'm _____ and I came across Pandora and I'd like to book a call`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button
              className="text-background border flex w-fit cursor-pointer items-center rounded-lg bg-white px-2 py-2 font-medium lg:px-3"
              style={{
                boxShadow:
                  "0 0 0 0 rgba(0,0,0,1)," +
                  "inset 0 -4px 0px rgba(0,0,0,0.5)," +
                  "0 8px 32px rgba(0,0,0,0.35)",
              }}
            >
              Book A Call
            </button>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
