/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {
  TeamOutlined,
  UserOutlined,
  MailOutlined,
  LockOutlined,
  ProfileOutlined,
  EditOutlined,
  CameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import useApi from "../../utils/useApi";
import { useMutation, useQuery } from "react-query";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
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
  console.log("🚀 ~ record:", record);
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
      // val: record?.role[0]?.name,
      val: record?.role?.name,
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
    {
      id: 7,
      label: "الصورة",
      placeholder: "اختر صورة",
      icon: <CameraOutlined className="text-green-600 text-xl" />,
      type: "file",
      name: "image",
    },
  ];

  const { handleSubmit, register, setValue, watch, getValues } = useForm({
    mode: "onBlur",
    defaultValues: {
      _method: "PUT",
      department_id: record?.department.id || "",
      specialization_id: record?.specialization.id || "",
      // role_id: record?.role[0]?.id || "",
      role_id: record?.role?.id || "",
      email: record?.email || "",
      password: record?.password || "",
      name: record?.name || "",
      image: null,
    },
  });

  useEffect(() => {
    refetch();
  }, [refetch, record]);
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    if (record) {
      setValue("email", record?.email || "");
      setValue("password", record?.password || "");
      // setValue("role_id", record?.role[0]?.id || "");
      setValue("role_id", record?.role?.id || "");
      setValue("department_id", record?.department.id || "");
      setValue("specialization_id", record?.specialization.id || "");
      setValue("name", record?.name || "");
      setValue("image", null);
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

  const handleFileChange = (e) => {
    let img = e.target.files[0];
    console.log("🚀 ~ handleFileChange ~ img:", img);
    if (img) {
      setValue("image", img);
      setImagePreview(URL.createObjectURL(img));
    }
  };

  const onSubmit = (data) => {
    mutation.mutate([
      `/admin/users/${record?.id}`,
      {
        ...data,
        user_type: "1",
        password: data.password ? null : watch("password"),
      },
    ]);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white rounded-lg">
        {formFields.map((field) => {
          return (
            <div key={field.id} className="flex flex-col py-2 gap-2">
              {field.type !== "file" && (
                <label className="flex items-center font-bold text-sm whitespace-nowrap gap-2">
                  {field.icon}
                  <span className="">{field.label}:</span>
                </label>
              )}
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
              ) : field.type === "file" ? (
                <>
                  <div className="flex flex-col gap-3">
                    <div className="relative ">
                      <input
                        type={field.type}
                        // {...register(field.name)}
                        onChange={handleFileChange}
                        accept="image/*"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        placeholder={field.placeholder}
                      />
                      <button
                        className={`bg-[#33835C1A] text-black p-2 rounded-md w-full flex items-center justify-center h-10 gap-1 text-sm 
                        `}
                      >
                        <UploadOutlined className="mr-2" />
                        اضافة صورة
                      </button>
                    </div>
                    {record?.user_image && (
                      <img
                        src={imagePreview || record?.user_image}
                        alt="User's selected"
                        className="w-full h-[230px] rounded-lg border border-gray-300 shadow-lg cursor-pointer object-cover"
                      />
                    )}
                  </div>
                </>
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
        <button
          type="submit"
          className="bg-[#33835C] text-white p-1 px-10 rounded-lg outline-none w-fit"
        >
          <EditOutlined /> {"تعديل"}
        </button>
      </div>
    </form>
  );
};

export default UserCard;
