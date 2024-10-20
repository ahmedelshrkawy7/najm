/* eslint-disable no-unused-vars */
import { EditOutlined } from "@ant-design/icons";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import useApi from "../../utils/useApi";
import { useEffect } from "react";
import { errorNotf } from "../../utils/notifications/Toast";

/* eslint-disable react/prop-types */
const DeptCard = ({
  record,
  currentView,
  setCurrentView,
  refetch,
  closeModal,
  type,
  setMessage,
}) => {
  console.log("🚀 ~ EditRow ~ record:", record);
  const { handleSubmit, control, watch, setValue } = useForm({
    defaultValues: {
      _method: "PUT",
      name_ar: "",
      name_en: "",
    },
  });

  const queryClient = useQueryClient();
  const { postData } = useApi();

  const mutation = useMutation(postData, {
    onSuccess: ({ data }) => {
      console.log("🚀 ~ data:", data);
      // reset();
      setCurrentView("success");
      setMessage(
        type === "reportType"
          ? `تم تعديل البلاغ (${data?.data?.name}) بنجاح`
          : `تم تعديل الادارة (${data?.data?.name}) بنجاح`
      );

      queryClient.invalidateQueries(["admin", ["/admin/departments"]]);
      refetch();
    },
    onError: (err) => {
      console.log("🚀 ~ err:", err);
      closeModal();
      // errorNotf("تم انشاء الادارة مسبقا");
      errorNotf(
        err.response.data.errors.message.replace(/[a-zA-Z0-9()]+/g, "")
      );
    },
  });

  useEffect(() => {
    if (record) {
      setValue("name_ar", record.name || "");
      setValue("name_en", record.name || "");
    }
  }, [record, setValue]);

  const onSubmit = (data) => {
    console.log("Form Submitted:", data);
    if (type == "departments") {
      mutation.mutate([
        `/admin/departments/${record?.id}`,
        { ...data, name_en: watch("name_ar") },
      ]);
    } else {
      mutation.mutate([
        `/admin/report-types/${record?.id}`,
        { ...data, name_en: watch("name_ar") },
      ]);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="h-36 pt-6">
        <input
          className="bg-[#E6E6E6] px-2 py-2 rounded-lg border border-gray-300 sm:w-1/2 md:w-[40%] lg:w-1/2 w-full"
          {...control.register("name_ar", {
            required: "اسم الادارة مطلوب",
          })}
          // cursor-not-allowed"
          // disabled
        />
      </div>

      <div className="py-3 pt-0 flex items-center justify-end">
        <button
          type="submit"
          className=" bg-[#33835C] text-white p-1 px-10 rounded-lg "
        >
          <EditOutlined /> {"تعديل"}
        </button>
      </div>
    </form>
  );
};

export default DeptCard;
