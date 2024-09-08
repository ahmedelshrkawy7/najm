/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

const MyCard = ({ name, currentView, setCurrentView }) => {
  // console.log(name);
  // console.log("card", currentView);
  return (
    <>
      <div className="flex gap-4 flex-wrap h-36 mb-6 bg0-re">
        <div className="flex flex-col gap-2 md:w-[40%] w-full h-fit">
          <label className="font-medium">اسم الادارة</label>
          <input
            type="text"
            className="border border-gray-300 p-1 rounded-md outline-none flex-1 w-full"
            placeholder="الادارة العامة لشئون الوافدين"
          />
        </div>
        <div className="md:w-[40%] w-full">
          <label
            htmlFor="select"
            className="mb-2 text-[15px] font-medium inline-block"
          >
            اختر الادارة
          </label>
          <select
            id="select"
            className="rounded-md w-full flex items-center h-[37px] border border-gray-300 text-gray-400 outline-none"
            defaultValue=""
          >
            <option value="" disabled hidden>
              الادارة العامة للشرطة الدولية
            </option>
            <option className="text-[16px]" value="0">
              لا
            </option>
            <option className="text-[16px]" value="1">
              نعم
            </option>
          </select>
        </div>
      </div>
      <div className="flex items-center justify-end">
        <button
          onClick={
            () => {
              if (name) {
                // if (props.msg === "اضافة") {
                setCurrentView("success");
                // } else if (typeof props.msg === "object") {
                //   setCurrentView("edit");
                // } else {
                //   setCurrentView("default");
              } else {
                setCurrentView("default");
              }
            }
            //   }}
          }
          className=" bg-[#33835C] text-white p-2 px-10 rounded-lg "
        >
          اضافة
        </button>
      </div>
    </>
  );
};

export default MyCard;
