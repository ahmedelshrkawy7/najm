import { CheckOutlined } from "@ant-design/icons";

const SuccessModel = ({ title }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3">
      <div className="w-12 h-12 bg-[#33835C] rounded-full flex justify-center items-center text-white text-2xl">
        <CheckOutlined />
      </div>
      <h2 className="text-lg font-medium">
        {title || "تم انشاء الادارة العامة بنجاح"}
      </h2>
    </div>
  );
};

export default SuccessModel;
