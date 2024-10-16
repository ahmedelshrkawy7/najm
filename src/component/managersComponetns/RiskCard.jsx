/* eslint-disable no-unused-vars */
import { EditOutlined } from "@ant-design/icons";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
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
  console.log("🚀 ~ record:", record);
  const { postData, getData } = useApi();

  const { data: { data: weights = [] } = {} } = useQuery(
    ["admin", ["/admin/report-weights", ""]],
    getData
  );
  console.log("🚀 ~ weights:", weights);

  const { data: { data: risk_types = [] } = {} } = useQuery(
    ["admin", ["/admin/main-risks", ""]],
    getData
  );

  console.log("🚀 ~ record:", record);
  const _data = [
    {
      id: 2,
      label: "النوع:",
      value: record?.main,
      icon: <AppstoreOutlined className="text-green-600 text-lg" />,
      name: "risk_type",
    },
    {
      id: 1,
      label: "نوع الخطر:",
      value: record?.risk_type,
      icon: <AppstoreOutlined className="text-green-600 text-lg" />,
      name: "name",
      isSelect: true,
      options: risk_types,
      val: record?.main,
    },
    {
      id: 3,
      label: "وزن البلغ:",
      value: record?.report_weight,
      icon: <AppstoreOutlined className="text-green-600 text-lg" />,
      name: "report_weight_id",
      isSelect: true,
      options: weights,
      val: record?.report_weight.weight,
    },
    {
      id: 4,
      label: "عدد الأيام:",
      value: record?.num_of_days,
      icon: <MailOutlined className="text-green-600 text-lg" />,
      name: "num_of_days",
    },
  ];

  const { handleSubmit, control, watch, setValue } = useForm({
    defaultValues: {
      _method: "PUT",
      num_of_days: "",
      report_weight_id: "",
      parent_id: "",
      name: "",
      risk_type: "",
    },
  });

  const queryClient = useQueryClient();

  const mutation = useMutation(postData, {
    onSuccess: () => {
      setCurrentView("success");
      refetch();
    },
    onError: (err) => {
      console.log("🚀 ~ err:", err);
      // closeModal();
    },
  });

  useEffect(() => {
    if (record) {
      setValue("risk_type", record.risk_type || "");
      setValue("report_weight_id", record?.report_weight.id);
      setValue("num_of_days", record.num_of_days || "");
      setValue("name", record.main || "رئييسي");
    }
  }, [record, setValue]);

  const onSubmit = (data) => {
    console.log("Form Submitted:", data);
    mutation.mutate([
      `/admin/risk-types/${record?.id}`,
      {
        ...data,
        parent_id: record?.id,

        risk_type: "0",
      },
    ]);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-2 bg-white">
        {_data?.map((item) => {
          console.log(item);

          return (
            <div
              key={item.id}
              className="flex items-center space-x-4 rtl:space-x-reverse gap-2"
            >
              <div className="bg-green-100 rounded-full p-2 flex items-center justify-center">
                {item.icon}
              </div>
              <div className="flex items-center w-full">
                <p className="text-sm font-bold w-28">{item.label}</p>
                {item.isSelect ? (
                  <select
                    {...control.register(item.name)}
                    defaultValue={
                      record?.report_weight ? String(record.report_weight) : ""
                    } // Set the default value
                    className="border border-gray-300 rounded-lg px-2 py-1 text-black text-xs w-full h-8"
                  >
                    <option selected hidden>
                      {item.val}
                    </option>
                    {item.options.map((option) => (
                      <option key={option?.id} value={option?.id}>
                        {option.weight || option.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    {...control.register(item.name)}
                    defaultValue={item.value}
                    className="border border-gray-300 rounded-lg px-2 py-1 text-black text-xs w-full h-8"
                  />
                )}
              </div>
            </div>
          );
        })}
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
