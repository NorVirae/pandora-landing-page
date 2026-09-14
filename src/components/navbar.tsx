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
    <nav className="fixed w-screen top-5 z-10 flex items-center justify-center">
      <div className="bg-navbar border-border flex h-15 w-4/5 items-center justify-center lg:justify-between rounded border px-3">
        <img src={logo} alt="pandora" />

        <div className="lg:flex hidden items-center gap-x-10">
          {menuItems.map((item) => (
            <a className="space" href={item.id} key={item.id}>
              {item.name}
            </a>
          ))}
          <button className="text-background  bg-white flex w-fit cursor-pointer items-center rounded-lg px-2 py-2 font-medium lg:px-3">
            Book A Call
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
