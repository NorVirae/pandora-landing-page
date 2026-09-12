
const Btn = ({ className = "" }: { className?: string }) => {
  return (
    <div
      className={`border-border ${className} w-fit rounded-2xl border bg-[#3D3D3D]`}
      style={{ padding: "8px" }}
    >
      <button
        type="button"
        style={{
          boxShadow:
            "0px 0 10px 1px rgba(0,120,0,0.5)," +
            "inset 0 -4px 0 rgba(0,0,0,0.6)," +
            "0 8px 32px rgba(0,120,0,0.35)",
        }}
        className="text-background space2 bg-primary flex w-fit cursor-pointer items-center rounded-lg px-5 py-3 font-medium"
      >
        Book A Call
      </button>
    </div>
  );
}

export default Btn