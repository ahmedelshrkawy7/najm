/* eslint-disable react/prop-types */

const ManagerCard = ({ icon, title, buttons }) => {
  console.log(icon);
  return (
    <div className="rounded-lg shadow  flex flex-col items-center overflow-hidden">
      <div className="bg-white w-full text-center py-2">
        <div className="mx-auto mt-2 w-14 h-14 rounded-full bg-[#EBF3EF] flex items-center justify-center">
          <img className="w-fit h-fit" src={icon} alt="" />
        </div>
        <h2 className="text-md font-semibold my-2">{title}</h2>
      </div>
      <div className="w-full p-0 bg-[#EBF3EF]">
        <div className="flex gap-4 p-4 justify-center">
          {buttons.map((button, index) => (
            <button
              key={index}
              className="bg-[#33835C] text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-200 text-sm"
            >
              {button}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManagerCard;
