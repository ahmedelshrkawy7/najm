import React, { useEffect } from "react";
import ReportsHeader from "../../custom hooks/ReportsHeader";
import { InputText } from "../forms/inputs/InputText";

const ContactInformation = ({
  errors,
  control,
  contactInforamtionValues,
  setV,
  user_email,
}) => {
  useEffect(() => {
    if (
      contactInforamtionValues.indexOf("") === -1 &&
      user_email.match(/^[^@]+@[^@]+\.[^@]+$/)
    ) {
      setV(true);
    } else {
      setV(false);
    }
  }, [contactInforamtionValues]);
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
            name="user_name"
            inputTitle={"الاسم"}
            inputPlaceHolder={"الاسم..."}
          />
          <InputText
            errors={errors}
            control={control}
            name="user_email"
            inputTitle={"البريد الالكترونى"}
            pattern={{
              value: /^[^@]+@[^@]+\.[^@]+$/,
              message: "يجب ادخال البريد الالكترونى",
            }}
            inputPlaceHolder={"البريد الالكترونى..."}
          />
          <InputText
            errors={errors}
            control={control}
            name="user_phone"
            inputTitle={"رقم الجوال"}
            inputPlaceHolder={"رقم الجوال...."}
          />
        </div>
      </div>
    </>
  );
};

export default ContactInformation;
