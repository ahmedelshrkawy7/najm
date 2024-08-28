import React from "react";
import ReportsTextIcon from "../component/Reports/ReportsTextIcon";
import note from "../assets/icons/note.svg";
import prev1 from "../assets/icons/prev1.svg";
import prev8 from "../assets/icons/prev8.svg";
const ContactInformation = ({ values = [] }) => {
  console.log(values);
  return (
    <>
      <ReportsTextIcon
        row={true}
        subTitle={values?.user_name || values?.user?.name}
        icon={note}
        title={"الاسم"}
      />
      <ReportsTextIcon
        row={true}
        subTitle={values?.user_email || values?.user?.email}
        icon={prev1}
        title={"البريد الالكترونى"}
      />
      <ReportsTextIcon
        row={true}
        subTitle={values?.user_phone || values?.user?.phone}
        icon={prev8}
        title={"رقم الجوال"}
      />
    </>
  );
};

export default ContactInformation;
