import React, { useEffect } from "react";
import ReportsHeader from "../../custom hooks/ReportsHeader";
import { InputText } from "../forms/inputs/InputText";

const ContactInformation = ({
  errors,
  control,
  contactInforamtionValues,
  setV,
  emailControl,
  phoneControl,
  nameControl,
}) => {
  useEffect(() => {
    if (
      contactInforamtionValues.indexOf("") === -1 &&
      emailControl.match(/^[^@]+@[^@]+\.[^@]+$/) &&
      phoneControl.match(/^(?:\+966|00966|966|0)?5\d{8}$/g) &&
      nameControl.match(/^[\u0600-\u06FF_]+/)
    ) {
      setV(true);
    } else {
      setV(false);
    }
  }, [contactInforamtionValues]);

  // "^[A-Za-z][A-Za-z0-9_]{7,29}$"
  return (
    <>
      <ReportsHeader
        title={"معلومات الاتصال"}
        subTitle={"يُرجي ملئ الحقول التالية"}
      />
      <div className="px-8 pt-4 pb-8  space-y-6">
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4">
          <InputText
            errors={errors}
            control={control}
            name="user_name"
            inputTitle={"الاسم"}
            inputPlaceHolder={"الاسم..."}
            pattern={{
              value: /^[\u0600-\u06FF_]+/,
              message: "ادخل الاسم صحيح",
            }}
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
            pattern={{
              value: /^(?:\+966|00966|966|0)?5\d{8}$/g,
              message: "يجب ادخال رقم جوال صحيح",
            }}
          />
        </div>
      </div>
    </>
  );
};

export default ContactInformation;
