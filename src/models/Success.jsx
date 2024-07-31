import { Button, Result } from "antd";
import { Link } from "react-router-dom";

const Success = () => {
  return (
    <div className="bg-[#fff] w-1/2 rounded-md">
      <Result
        status="success"
        title=" WB123 شكرً لتعاونكم تم تأكيد البلاغ رقم "
        subTitle="في حال توفر مستجدات او معلومات إضافية تختص بالبلاغ المرفوع من قبلكم، يرجى تزويدنا بالمعلومات عبر البريد الإلكتروني للإبلاغ عن الممارسات المخالفة: wb@najm.sa"
        extra={[
          <Link to="/">
            <Button
              key="console"
              size="large"
              className="bg-green-500 text-white"
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
