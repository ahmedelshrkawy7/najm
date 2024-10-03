/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { CheckOutlined } from "@ant-design/icons";

const SuccessModal = ({ title, close, setShowSvg, confirm }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3 ">
      <div className="w-12 h-12 bg-[#33835C] rounded-full flex justify-center items-center text-white text-2xl">
        <CheckOutlined />
      </div>
      <h2 className="text-lg font-medium">
        {title || "تم انشاء الادارة العامة بنجاح"}
      </h2>
      {close && (
        // <span
        //   className="text-[28px] leading-[0] self-center  text-white cursor-pointer absolute top-3 right-2 font-bold"
        //   onClick={() => {
        //     setShowSvg(false);
        //   }}
        // >
        //   &times;
        // </span>
        <div className="px-5 py-3 pt-0 flex items-center justify-end">
          <button
            className=" bg-[#33835C] text-white p-1 px-10 rounded-lg"
            onClick={() => {
              // setShowSvg(true);
              confirm();
            }}
          >
            {close}
          </button>
        </div>
      )}
    </div>
  );
};

export default SuccessModal;
