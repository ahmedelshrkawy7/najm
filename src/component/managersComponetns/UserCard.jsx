/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {
  TeamOutlined,
  UserOutlined,
  MailOutlined,
  LockOutlined,
  ProfileOutlined,
  EditOutlined,
} from "@ant-design/icons";
import useApi from "../../utils/useApi";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

const UserCard = ({
  record,
  currentView,
  setCurrentView,
  refetch,
  closeModal,
}) => {
  console.log("🚀 ~ record:", record);
  const { getData, postData } = useApi();

  const { data: { data: roles = [] } = {} } = useQuery(
    ["admin", ["/roles", ""]],
    getData
  );
  console.log("🚀 ~ roles:", roles);

  const { data: { data: _data = [] } = {} } = useQuery(
    ["admin", ["/departments", ""]],
    getData
  );
  console.log("🚀 ~ UserCard ~ _data:", _data);

  const { data: { data: departs = [] } = {} } = useQuery(
    ["admin", ["/specializations", ""]],
    getData
  );
  console.log("🚀 ~ UserCard ~ departs:", departs);

  const formFields = [
    {
      id: 1,
      label: "اسم القسم",
      placeholder: "وحدة مكافحة المخدرات بالأفلاج",
      icon: <ProfileOutlined className="text-green-600 text-xl" />,
      type: "select",
      options: departs,
      name: "specialization_id",
    },
    {
      id: 2,
      label: "الايميل",
      placeholder: "Khaled_Elhazmy123@najm.Sa",
      icon: <MailOutlined className="text-green-600 text-xl" />,
      type: "email",
      name: "email",
    },
    {
      id: 3,
      label: "الصلاحية",
      placeholder: "مراجع بلاغات",
      icon: <UserOutlined className="text-green-600 text-xl" />,
      type: "select",
      options: roles,
      name: "role_id",
    },
    {
      id: 4,
      label: "الإدارة",
      placeholder: "الإدارة العامة للشرطة الدولية",
      icon: <TeamOutlined className="text-green-600 text-xl" />,
      type: "select",
      options: _data,
      name: "department_id",
    },
    {
      id: 5,
      label: "اسم الشخص",
      placeholder: "خالد الحازمي",
      icon: <UserOutlined className="text-green-600 text-xl" />,
      type: "text",
      name: "name",
    },
    {
      id: 6,
      label: "كلمة المرور",
      placeholder: "36741198",
      icon: <LockOutlined className="text-green-600 text-xl" />,
      type: "password",
      name: "password",
    },
  ];

  const { handleSubmit, register, watch, setValue, reset } = useForm({
    defaultValues: {
      _method: "PUT",
      department_id: record?.department_name,
      specialization_id: record?.specialization_name,
      role_id: "",
      email: "",
      password: "",
      name: "",
    },
  });

  useEffect(() => {
    refetch();
  }, [refetch, record]);

  useEffect(() => {
    if (record) {
      setValue("email", record?.user_email || "");
      setValue("password", record?.password || "");
      setValue("role_id", record?.role[0]?.id || "");
      setValue("department_id", record?.department_name || "");
      setValue("specialization_id", record?.specialization_name || "");
      setValue("name", record?.user_name || "");
    }
  }, [record, setValue]);

  //   const queryClient = useQueryClient();

  const mutation = useMutation(postData, {
    onSuccess: () => {
      // reset();
      setCurrentView("success");
      //   queryClient.invalidateQueries(["admin", ["/admin/departments"]]);
      refetch();
    },
    onError: (err) => {
      console.log("🚀 ~ err:", err);
      //   closeModal();
      // errorNotf("تم انشاء الادارة مسبقا");
    },
  });

  const onSubmit = (data) => {
    console.log("🚀 ~ onSubmit ~ data:", { ...data, user_type: "1" });
    mutation.mutate([
      `/admin/users/${record?.id}`,
      {
        ...data,
        // role_id: roles?.find((role) => role.name === watch("role_id"))?.id,
        user_type: "1",
      },
    ]);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white rounded-lg">
        {formFields.map((field) => (
          <div
            key={field.id}
            className="flex items-center space-x-2 py-2 gap-2"
          >
            {field.icon}
            <label className="font-bold text-sm  whitespace-nowrap">
              {field.label}:
            </label>
            {field.type === "select" ? (
              <select
                {...register(field.name, {
                  required: "اسم القسم مطلوب",
                })}
                className="w-full border border-gray-300 p-1 text-sm rounded-md focus:outline-none focus:ring-0"
              >
                {field?.options?.map((option, index) => (
                  <option key={option.id} value={option?.id}>
                    {option?.name_ar || option?.name}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                {...register(field.name, {
                  required: "اسم القسم مطلوب",
                })}
                className="w-full border border-gray-300 p-1 text-sm rounded-md focus:outline-none focus:ring-0 placeholder:text-sm"
                placeholder={field.placeholder}
              />
            )}
          </div>
        ))}
      </div>
      <div className="col-span-2 flex items-start justify-end pt-6">
        <button className="bg-[#33835C] text-white p-1 px-10 rounded-lg outline-none w-fit">
          <EditOutlined /> {"تعديل"}
        </button>
      </div>
    </form>
  );
};

export default UserCard;
