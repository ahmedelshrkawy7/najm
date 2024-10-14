/* eslint-disable no-unused-vars */
import { EditOutlined } from "@ant-design/icons";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import useApi from "../../utils/useApi";
import { useEffect } from "react";
import { AppstoreOutlined, MailOutlined } from "@ant-design/icons";

/* eslint-disable react/prop-types */
const RiskCard = ({
  record,
  currentView,
  setCurrentView,
  refetch,
  closeModal,
}) => {
  const data = [
    {
      id: 1,
      label: "نوع الخطر:",
      value: record?.risk_type,
      icon: <AppstoreOutlined className="text-green-600 text-lg" />,
    },
    {
      id: 2,
      label: "النوع:",
      value: record?.main,
      icon: <AppstoreOutlined className="text-green-600 text-lg" />,
    },
    {
      id: 3,
      label: "وزن البلغ:",
      value: record?.report_weight,
      icon: <AppstoreOutlined className="text-green-600 text-lg" />,
    },
    {
      id: 4,
      label: "عدد الأيام:",
      value: record?.num_of_days,
      icon: <MailOutlined className="text-green-600 text-lg" />,
    },
  ];

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
      `/admin/risk-types/${record?.id}`,
      { ...data, department_id: record?.id, name_en: watch("name_ar") },
    ]);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-7 p-4 py-2 bg-white">
        {data.map((item) => (
          <div
            key={item.id}
            className="flex items-center space-x-4 rtl:space-x-reverse gap-2"
          >
            <div className="bg-green-100 rounded-full p-2 flex items-center justify-center">
              {item.icon}
            </div>
            <div className="flex items-center space-x-1 rtl:space-x-reverse gap-2">
              <p className="text-sm text-gray-500">{item.label}</p>
              <p className="font-semibold text-black">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="col-span-2 flex items-start justify-end pt-6">
        <button
          type="submit"
          className="bg-[#33835C] text-white p-1 px-10 rounded-lg outline-none"
        >
          <EditOutlined /> {"تعديل"}
        </button>
      </div>
    </form>
  );
};

export default RiskCard;
