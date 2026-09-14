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
    <nav className="fixed top-5 z-10 flex w-screen items-center justify-center">
      <div className="bg-navbar border-border flex py-2 w-4/5 items-center justify-center rounded border px-3 lg:justify-between">
        <img src={logo} className="lg:h-auto h-7" alt="pandora" />

        <div className="hidden items-center gap-x-10 lg:flex">
          {menuItems.map((item) => (
            <a className="space" href={item.id} key={item.id}>
              {item.name}
            </a>
          ))}
          <button className="text-background flex w-fit cursor-pointer items-center rounded-lg bg-white px-2 py-2 font-medium lg:px-3">
            Book A Call
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
