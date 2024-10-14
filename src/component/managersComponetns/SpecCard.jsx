/* eslint-disable no-unused-vars */
import { EditOutlined } from "@ant-design/icons";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import useApi from "../../utils/useApi";
import { useEffect } from "react";

/* eslint-disable react/prop-types */
const SpecCard = ({
  record,
  currentView,
  setCurrentView,
  refetch,
  closeModal,
}) => {
  console.log("🚀 ~ EditRow ~ record:", record);
  const { handleSubmit, control, watch, setValue } = useForm({
    defaultValues: {
      _method: "PUT",
      name_ar: "",
      name_en: "",
      department_id: "",
    },
  });

  const queryClient = useQueryClient();
  const { postData } = useApi();

  const mutation = useMutation(postData, {
    onSuccess: () => {
      // reset();
      setCurrentView("success");
      //   queryClient.invalidateQueries(["admin", ["/admin/departments"]]);
      refetch();
    },
    onError: (err) => {
      console.log("🚀 ~ err:", err);
      closeModal();
      // errorNotf("تم انشاء الادارة مسبقا");
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

    mutation.mutate([
      `/admin/specializations/${record?.id}`,
      { ...data, department_id: record?.id, name_en: watch("name_ar") },
    ]);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="h-36 pt-6">
        <input
          className="bg-[#E6E6E6] px-2 py-2 rounded-lg border border-gray-300 sm:w-1/2 md:w-[40%] lg:w-1/2 w-full"
          {...control.register("name_ar", {
            required: "اسم القسم مطلوب",
          })}
          // cursor-not-allowed"
          // disabled
        />
      </div>

      <div className="py-3 pt-0 flex items-center justify-end">
        <button
          type="submit"
          onClick={() => {}}
          className=" bg-[#33835C] text-white p-1 px-10 rounded-lg "
        >
          <EditOutlined /> {"تعديل"}
        </button>
      </div>
    </form>
  );
};

export default SpecCard;
