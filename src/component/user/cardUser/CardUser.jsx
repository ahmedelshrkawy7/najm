const CardUser = ({ title, onClick, active, src }) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white border-2 flex flex-col items-center justify-center rounded-3xl transition-all   py-12 px-4 cursor-pointer ${
        active && "!bg-[#33835C] text-white"
      } border-gray-100`}
    >
      <div
        className={`w-16 h-16 flex items-center justify-center rounded-full bg-[#EBF3EF] ${
          active && "bg-white"
        } `}
      >
        <img src={src} />
      </div>
      <h3 className={`text-black mt-3 ${active && "text-white"}`}>{title}</h3>
    </div>
  );
};
export default CardUser;
