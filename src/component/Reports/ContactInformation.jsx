/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
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
  setValue,
}) => {
  useEffect(() => {
    if (
      contactInforamtionValues.indexOf("") === -1 &&
      emailControl.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
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
        <div className="bg-[#33835C1A] max-w-[1163px] rounded-md">
          <p className="max-w-3xl p-4 text-sm text-[#33835C] leading-7  font-medium">
            الغرض من مشاركة معلومات الإتصال هو للتواصل في حال الحاجة لمعلومات
            إضافية حول البلاغ علماً بأن معالجة البلاغ تتم بسرية تامة بما في ذلك
            معلوماتك الشخصية من قبل ادارة مكافحة الجرائم المالية بشركة نجم.
          </p>
        </div>
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4">
          <InputText
            errors={errors}
            control={control}
            name="user_name"
            inputTitle={"الاسم"}
            inputPlaceHolder={"الاسم..."}
            setValue={setValue}
            max={50}
          />
          <InputText
            errors={errors}
            control={control}
            max={35}
            name="user_email"
            inputTitle={"البريد الالكترونى"}
            pattern={{
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "يجب ادخال البريد الالكترونى",
            }}
            inputPlaceHolder={"البريد الالكترونى..."}
            icon={"*"}
          />
          <InputText
            errors={errors}
            control={control}
            name="user_phone"
            max={10}
            inputTitle={"رقم الجوال"}
            inputPlaceHolder={"رقم الجوال...."}
            setValue={setValue}
            pattern={{
              value:
                /\+?\d{1,4}[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,}/g,
              message: "يجب ادخال رقم جوال صحيح",
            }}
          />
        </div>
      </div>
    </>
  );
};

export default ContactInformation;
//
//
// &&
// nameControl.match(/^[\u0600-\u06FF_]+/)
