const Btn = ({ className = "" }: { className?: string }) => {
  return (
    <div
      className={`border-border ${className} w-fit rounded-2xl border bg-[#3D3D3D]`}
      style={{ padding: "8px" }}
    >
      <a
        href={`https://wa.me/2349072896677?text=Hi Johnpaul, I'm _____ and I came across Pandora and I'd like to book a call`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <button
          type="button"
          style={{
            boxShadow:
              "0px 0 10px 1px rgba(0,120,0,0.5)," +
              "inset 0 -6px 2px rgba(0,0,0,0.75)," +
              "0 8px 32px rgba(0,120,0,0.35)",
          }}
          className="text-background space2 bg-primary flex w-fit cursor-pointer items-center rounded-lg px-4 py-3 font-medium lg:px-5 border"
        >
          Book A Call
        </button>
      </a>
    </div>
  );
};

export default Btn;
