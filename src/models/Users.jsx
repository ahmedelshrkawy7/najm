/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// import React from "react";
// import { Input, Radio } from "antd";

// const Users = ({ currentView, setCurrentView }) => {
//   return (
//     <div className="max-w-4xl mx-auto bg-white rounded-md py-2">
//       <div className="flex flex-col md:flex-row items-start md:items-center mb-4 gap-2">
//         <span className="font-bold ">نوع المستخدم:</span>
//         <Radio.Group defaultValue="main" className="self-center">
//           <Radio value="main">دائم</Radio>
//           <Radio value="branch">مؤقت</Radio>
//         </Radio.Group>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//         <div>
//           <label className="block mb-2">الإدارة</label>
//           <select className="w-full border border-gray-300 rounded px-3 py-2">
//             <option value="police_department">
//               الإدارة العامة للشرطة الدولية
//             </option>
//           </select>
//         </div>
//         <div>
//           <label className="block mb-2">اسم القسم</label>
//           <select className="w-full border border-gray-300 rounded px-3 py-2">
//             <option value="narcotics_unit">
//               وحدة مكافحة المخدرات بالأفلاج
//             </option>
//           </select>
//         </div>

//         <div>
//           <label className="block mb-2">اسم الشخص</label>
//           <Input defaultValue="خالد الحازمي" />
//         </div>
//         <div>
//           <label className="block mb-2">البريد الإلكتروني</label>
//           <Input
//             defaultValue="Khaled_Elhazmy123@najm.sa"
//             addonAfter="@najm.sa"
//           />
//         </div>

//         <div>
//           <label className="block mb-2">الصلاحية</label>
//           <select className="w-full border border-gray-300 rounded px-3 py-2">
//             <option value="report_reviewer">مراجع بلاغات</option>
//           </select>
//         </div>
//         <div>
//           <label className="block mb-2">كلمة المرور</label>
//           <Input.Password defaultValue="*********" />
//         </div>
//       </div>

//       <div className="text-left">
//         <button
//           onClick={() => {
//             setCurrentView("success");
//           }}
//           className="bg-[#33835C] text-white py-2 px-10 rounded-lg outline-none w-full md:w-auto"
//         >
//           اضافة
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Users;

/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Input, Radio, Select } from "antd";
import useApi from "../utils/useApi";
import { useMutation, useQuery } from "react-query";
import { errorNotf } from "../utils/notifications/Toast";
import { Option } from "antd/es/mentions";
import { UploadOutlined } from "@ant-design/icons";
const Users = ({
  currentView,
  setCurrentView,
  closeModal,
  setMessage,
  refetch: rf,
}) => {
  const { getData, postData } = useApi();

  const {
    handleSubmit,
    control,
    register,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      user_type: "1",
      department_id: "",
      specialization_id: "",
      name: "",
      email: "",
      role_id: "",
      password: "",
      image: null,
    },
  });

  const [imagePreview, setImagePreview] = useState("");
  let id = watch("department_id") && watch("department_id");

  const { data: { data = [] } = {} } = useQuery(
    ["admin", ["/roles", ""]],
    getData
  );

  const { data: { data: _data = [] } = {} } = useQuery(
    ["admin", ["/departments", ""]],
    getData
  );

  const { data: { data: departs = [] } = {}, refetch } = useQuery(
    ["admin", ["/admin/department-specializations"], id],
    getData,
    { enabled: !!id }
  );
  console.log("🚀 ~ Users ~ _data:", _data);

  console.log("🚀 ~ Users ~ data:", data);

  const mutation = useMutation(postData, {
    onSuccess: ({ data }) => {
      console.log("🚀 ~ Users ~ data:", data);
      reset();
      setCurrentView("success");
      setMessage(`تم انشاء المستخدم (${data?.data?.name}) بنجاح`);
      rf();
    },
    onError: (err) => {
      // errorNotf(err.response.data.errors.message);
      errorNotf(
        err.response.data.errors.message.replace(/[a-zA-Z0-9()]+/g, "")
      );

      closeModal();
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
    console.log("Form Data:", data);
    // setCurrentView("success");
    mutation.mutate([`/admin/users`, data]);
  };

  useEffect(() => {
    if (id) {
      refetch();
    }
  }, [refetch, id]);

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-md py-2">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col md:flex-row items-start md:items-center mb-4 gap-2">
          <span className="font-bold ">نوع المستخدم:</span>
          <Controller
            name="user_type"
            control={control}
            render={({ field }) => (
              <Radio.Group
                {...field}
                defaultValue={field.value}
                className="custom-radio"
              >
                <Radio value="1">دائم</Radio>
                <Radio value="0">مؤقت</Radio>
              </Radio.Group>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block mb-2">الإدارة</label>
            {/* <select
              {...register("department_id", {
                required: "يرجى اختيار الإدارة.",
              })}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="" disabled hidden>
                اختر الإدارة
              </option>
              {_data.map((department) => (
                <option key={department.id} value={department.id}>
                  {department.name_ar}
                </option>
              ))}
            </select> */}
            <Controller
              control={control}
              name="department_id"
              rules={{ required: "يجب اختيار إدارة" }}
              render={({ field }) => (
                <Select
                  {...field}
                  className={`rounded-md w-full flex items-center h-[34px] border${
                    errors.department_id ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="اختر الإدارة"
                  onChange={(value) => field.onChange(value)}
                >
                  <Option value="" disabled hidden>
                    اختر الإدارة
                  </Option>
                  {_data.map((department) => (
                    <Option key={department.id} value={department.id}>
                      {department.name_ar}
                    </Option>
                  ))}
                </Select>
              )}
            />
            {errors.department_id && (
              <p className="text-red-500">{errors.department_id.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-2">اسم القسم</label>
            {/* <select
              {...register("specialization_id", {
                required: "يرجى اختيار القسم.",
              })}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="" disabled hidden>
                اختر القسم
              </option>
              {departs.map((depart) => (
                <option key={depart.id} value={depart.id}>
                  {depart.name}
                </option>
              ))}
            </select> */}
            <Controller
              control={control}
              name="specialization_id"
              rules={{ required: "يرجى اختيار القسم" }}
              render={({ field }) => (
                <Select
                  {...field}
                  className={`rounded-md w-full flex items-center h-[34px] border${
                    errors.specialization_id
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder="اختر القسم"
                  onChange={(value) => field.onChange(value)}
                >
                  <Option value="" disabled hidden>
                    اختر القسم
                  </Option>
                  {departs.map((depart) => (
                    <Option key={depart.id} value={depart.id}>
                      {depart.name}
                    </Option>
                  ))}
                </Select>
              )}
            />
            {id && errors.specialization_id && (
              <p className="text-red-500">{errors.specialization_id.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-2">اسم الشخص</label>
            <Controller
              name="name"
              control={control}
              rules={{ required: "يرجى إدخال اسم الشخص." }}
              render={({ field }) => (
                <Input
                  placeholder="ادخل الاسم"
                  {...field}
                  className="h-[34px]"
                />
              )}
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-2">البريد الإلكتروني</label>
            <div className="relative h-[34px]">
              <Controller
                name="email"
                control={control}
                rules={{
                  required: "يرجى إدخال البريد الإلكتروني.",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "يرجى إدخال بريد إلكتروني صحيح.",
                  },
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="البريد الالكترونى"
                    // addonAfter="@najm.sa"
                    className="!h-full"
                  />
                )}
              />
            </div>

            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-2">الصلاحية</label>
            {/* <select
              {...register("role_id", { required: "يرجى اختيار الصلاحية." })}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="" disabled hidden>
                اختر الصلاحية
              </option>
              {data?.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select> */}
            <Controller
              control={control}
              name="role_id"
              rules={{ required: "يجب اختيار الصلاحية" }}
              render={({ field }) => (
                <Select
                  {...field}
                  className={`rounded-md w-full flex items-center h-[34px] border${
                    errors.department_id ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="اختر الصلاحية"
                  onChange={(value) => field.onChange(value)}
                >
                  <Option value="" disabled hidden>
                    اختر الصلاحية
                  </Option>
                  {data?.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </Select>
              )}
            />
            {errors.role_id && (
              <p className="text-red-500">{errors.role_id.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-2">كلمة المرور</label>
            <Controller
              name="password"
              control={control}
              rules={{ required: "يرجى إدخال كلمة المرور." }}
              render={({ field }) => (
                <Input.Password
                  placeholder="*******"
                  {...field}
                  className="h-[34px]"
                />
              )}
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>
          <div className="relative flex flex-col gap-3">
            <input
              type={"file"}
              name="image"
              // {...register("image")}
              onChange={handleFileChange}
              accept="image/*"
              className="absolute inset-0 w-full h-full opacity-0 "
              // placeholder={field.placeholder}
            />
            <button
              className={`bg-[#33835C1A] text-black p-2 rounded-md w-full flex items-center justify-center h-10 gap-1 text-sm 
                        `}
            >
              <UploadOutlined className="mr-2" />
              اضافة صورة
            </button>
            {imagePreview && (
              <img
                src={imagePreview}
                alt="User's selected"
                className="w-full h-[230px] object-cover rounded-lg border border-gray-300 shadow-lg cursor-pointer"
              />
            )}
          </div>
        </div>

        <div className="text-left">
          <button
            type="submit"
            className="bg-[#33835C] text-white py-2 px-10 rounded-lg outline-none w-full md:w-auto"
          >
            اضافة
          </button>
        </div>
      </form>
    </div>
  );
};

export default Users;
