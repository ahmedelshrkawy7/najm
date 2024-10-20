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
import { useMutation, useQuery } from "react-query";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { errorNotf } from "../../utils/notifications/Toast";
import { Select } from "antd";

const UserCard = ({
  record,
  currentView,
  setCurrentView,
  refetch,
  closeModal,
  setMessage,
}) => {
  const { Option } = Select;

  const { getData, postData } = useApi();

  const { data: { data: roles = [] } = {} } = useQuery(
    ["admin", ["/roles", ""]],
    getData
  );

  const { data: { data: _data = [] } = {} } = useQuery(
    ["admin", ["/departments", ""]],
    getData
  );

  const { data: { data: departs = [] } = {} } = useQuery(
    ["admin", ["/specializations", ""]],
    getData
  );

  const formFields = [
    {
      id: 1,
      label: "اسم القسم",
      placeholder: "وحدة مكافحة المخدرات بالأفلاج",
      icon: <ProfileOutlined className="text-green-600 text-xl" />,
      type: "select",
      options: departs,
      name: "specialization_id",
      val: record?.specialization?.name,
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
      val: record?.role[0].name,
    },
    {
      id: 4,
      label: "الإدارة",
      placeholder: "الإدارة العامة للشرطة الدولية",
      icon: <TeamOutlined className="text-green-600 text-xl" />,
      type: "select",
      options: _data,
      name: "department_id",
      val: record?.department?.name,
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

  const { handleSubmit, register, setValue } = useForm({
    defaultValues: {
      _method: "PUT",
      department_id: record?.department.id || "",
      specialization_id: record?.specialization.id || "",
      role_id: record?.role[0]?.id || "",
      email: record?.email || "",
      password: record?.password || "",
      name: record?.name || "",
    },
  });

  useEffect(() => {
    refetch();
  }, [refetch, record]);

  useEffect(() => {
    if (record) {
      setValue("email", record?.email || "");
      setValue("password", record?.password || "");
      setValue("role_id", record?.role[0]?.id || "");
      setValue("department_id", record?.department.id || "");
      setValue("specialization_id", record?.specialization.id || "");
      setValue("name", record?.name || "");
    }
  }, [record, setValue]);

  const mutation = useMutation(postData, {
    onSuccess: ({ data }) => {
      setCurrentView("success");
      setMessage(`تم تعديل المستخدم (${data?.data?.name}) بنجاح`);

      refetch();
    },
    onError: (err) => {
      closeModal();
      errorNotf(
        err.response.data.errors.message.replace(/[a-zA-Z0-9()]+/g, "")
      );
    },
  });

  const onSubmit = (data) => {
    mutation.mutate([
      `/admin/users/${record?.id}`,
      {
        ...data,
        user_type: "1",
      },
    ]);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white rounded-lg">
        {formFields.map((field) => {
          return (
            <div key={field.id} className="flex flex-col py-2 gap-2">
              <label className="flex items-center font-bold text-sm whitespace-nowrap gap-2">
                {field.icon}
                <span className="">{field.label}:</span>
              </label>
              {field.type === "select" ? (
                <Select
                  {...register(field.name, {
                    required: "هذا الحقل مطلوب",
                  })}
                  defaultValue={field.val}
                  className="h-[34px] w-full border border-gray-300 text-sm rounded-md focus:outline-none focus:ring-0"
                  placeholder={field.placeholder}
                  onChange={(value) => setValue(field.name, value)}
                >
                  {field?.options?.map((option) => (
                    <Option key={option.id} value={option?.id}>
                      {option?.name_ar || option?.name}
                    </Option>
                  ))}
                </Select>
              ) : (
                <input
                  type={field.type}
                  {...register(field.name, {
                    required: "هذا الحقل مطلوب",
                  })}
                  className="h-[34px] w-full border border-gray-300 p-1 text-sm rounded-md focus:outline-none focus:ring-0 placeholder:text-sm"
                  placeholder={field.placeholder}
                />
              )}
            </div>
          );
        })}
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
