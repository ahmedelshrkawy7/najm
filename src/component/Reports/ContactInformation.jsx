import ReportsHeader from "../../custom hooks/ReportsHeader";
import { InputText } from "../forms/inputs/InputText";

const ContactInformation = ({ errors, control }) => {
  console.log(control);
  return (
    <>
      <ReportsHeader
        title={"معلومات الاتصال"}
        subTitle={"يُرجي ملئ الحقول التالية"}
      />
      <div className="px-8 pt-4 pb-8  space-y-6">
        <div className="flex flex-wrap gap-4 items-center">
          <InputText
            errors={errors}
            control={control}
            name="nameControl"
            inputTitle={"الاسم"}
            inputPlaceHolder={"الاسم..."}
          />
          <InputText
            errors={errors}
            control={control}
            name="emailControl"
            inputTitle={"البريد الالكترونى"}
            inputPlaceHolder={"البريد الالكترونى..."}
          />
          <InputText
            errors={errors}
            control={control}
            name="phoneControl"
            inputTitle={"رقم الجوال"}
            inputPlaceHolder={"رقم الجوال...."}
          />
        </div>
      </div>
    </>
  );
};

export default ContactInformation;
