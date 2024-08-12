import React from "react";
import {
  RightOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
const Footer = () => {
  return (
    <div className="bg-[#55565a] pb-6">
      <div className="w-[90%] mx-auto ">
        <div>
          <img
            src="https://najm.sa/sites/ar/_catalogs/masterpage/Najm/images/assets/najm-footer.svg"
            className="w-[100px] h-[130px]  -mr-2"
          />
        </div>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 text-white/85 mt-5 gap-6 pb-4">
            <div className="text-sm md:text-md">
              <div className="space-y-3">
                <div className="flex gap-2 items-center">
                  <RightOutlined className="rotate-180" />
                  <p>شركة نجم لخدمات التأمين </p>
                </div>
                <div className="flex gap-2 items-center">
                  <RightOutlined className="rotate-180" />
                  <p>شركة مساهمة مغلقة</p>
                </div>
                <div className="flex gap-2 items-center">
                  <RightOutlined className="rotate-180" />
                  <p>الرياض، الصحافة</p>
                </div>
              </div>
            </div>
            <div className="text-sm md:text-md">
              <div className=" space-y-3 ">
                <div className="flex gap-2 items-center">
                  <RightOutlined className="rotate-180" />
                  <p>سجل تجاري : 1010229751</p>
                </div>
                <div className="flex gap-2 items-center">
                  <RightOutlined className="rotate-180" />
                  <p>رقم الترخيص : 177788</p>
                </div>
                <div className="flex gap-2 items-center">
                  <RightOutlined className="rotate-180" />
                  <p>الشركة خاضعة لرقابة وإشراف هيئة التأمين</p>
                </div>
              </div>
            </div>
            <div className="text-sm md:text-md">
              <div className=" space-y-3 ">
                <div className="flex gap-2 items-center">
                  <PhoneOutlined />
                  <p>199033</p>
                </div>
                <div className="flex gap-2 items-center">
                  <EnvironmentOutlined />
                  <p>طريق الثمامة، الصحافة، 3244، الرياض 13315</p>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2  mt-4 border-t pt-4 border-gray-300/40">
            <div className="text-white/85 text-center lg:text-right">
              <p className="text-sm  pb-2 md:pb-0">
                جميع الحقوق محفوظة لشركة نجم لخدمات التأمين 2022
              </p>
            </div>
            <div className=" text-white/85 text-center">
              <p className="text-sm  md:text-center">
                سياسة الخصوصية وشروط الاستخدام
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
