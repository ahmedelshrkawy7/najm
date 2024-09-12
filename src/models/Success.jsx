import { Button, Result } from "antd";
import { Link } from "react-router-dom";
import icon from "../assets/icons/success.png";

const Success = ({ report }) => {
  const date = new Date(report?.date).getFullYear();
  const dateX = String(date).substring(2, 4);
  return !report?.id ? (
    <div className="loader"></div>
  ) : (
    <div className="bg-[#fff]  z-[99999] top-0 left-0 w-[85vw] sm:max-w-[600px]   rounded-md">
      <Result
        icon={
          <div className="flex justify-center">
            <img src={icon} alt="" />{" "}
          </div>
        }
        status="success"
        title={
          <h1 className="font-bold">
            {report?.id &&
              ` شكرًا لتعاونكم تم تأكيد البلاغ رقم ${report?.id}-${dateX}-WB`}
          </h1>
        }
        subTitle={
          <div className="flex   text-base justify-center ">
            <span className="text-black max-w-96 ">
              {" "}
              في حال توفر مستجدات او معلومات إضافية تختص بالبلاغ المرفوع من
              قبلكم، يرجى تزويدنا بالمعلومات عبر البريد الإلكتروني للإبلاغ عن
              الممارسات المخالفة: wb@najm.sa"
            </span>
          </div>
        }
        extra={[
          <Link to="/">
            <Button
              key="console"
              size="large"
              className="bg-[#33835C] hover:!bg-[#33835C] hover:!text-white  hover:!border-[#33835C]  text-white"
            >
              الرجوع للرئيسية
            </Button>
          </Link>,
        ]}
      />
    </div>
  );
};

export default Success;
