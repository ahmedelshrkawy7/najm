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
      emailControl.match(/^[^@]+@[^@]+\.[^@]+$/) &&
      phoneControl.match(
        /\+?\d{1,4}[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/g
      )
    ) {
      setV(true);
    } else {
      setV(false);
    }
  }, [contactInforamtionValues]);
  console.log(phoneControl);
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
