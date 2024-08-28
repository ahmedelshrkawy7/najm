import React from "react";
import ReportDetails from "../../component/Reports/ReportDetails";
import { useForm } from "react-hook-form";

const PreparingStudy = () => {
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
    setValue,
    control,
    resetField,
    getValues,
  } = useForm({
    mode: "all",
    defaultValues: {
      description: "",
      address: "",
      suspectKnown: "0",
      date: "",
      suspects: [],
      user_name: "",
      user_email: "",
      user_phone: "",
      fileInput: "",
    },
  });
  return <div></div>;
};

export default PreparingStudy;
