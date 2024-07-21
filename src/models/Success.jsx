import { Button, Result } from "antd";

const Success = () => {
  return (
    <Result
      status="success"
      title=" WB123 شكرً لتعاونكم تم تأكيد البلاغ رقم "
      subTitle="في حال توفر مستجدات او معلومات إضافية تختص بالبلاغ المرفوع من قبلكم، يرجى تزويدنا بالمعلومات عبر البريد الإلكتروني للإبلاغ عن الممارسات المخالفة: wb@najm.sa"
      extra={[
        <Button key="console" size="large">
          الرجوع للرئيسية
        </Button>,
      ]}
    />
  );
};

export default Success;
