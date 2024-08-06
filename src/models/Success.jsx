import { Button, Result } from "antd";
import { Link } from "react-router-dom";

const Success = ({ id }) => {
  console.log(id);
  return !id ? (
    <div className="loader"></div>
  ) : (
    <div className="bg-[#fff] w-1/2 rounded-md">
      <Result
        status="success"
        title={id && ` شكرًا لتعاونكم تم تأكيد البلاغ رقم ${id}`}
        subTitle="في حال توفر مستجدات او معلومات إضافية تختص بالبلاغ المرفوع من قبلكم، يرجى تزويدنا بالمعلومات عبر البريد الإلكتروني للإبلاغ عن الممارسات المخالفة: wb@najm.sa"
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
