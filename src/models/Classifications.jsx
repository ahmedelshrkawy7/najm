/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import useApi from "../utils/useApi";
import { useForm } from "react-hook-form";
import { UploadOutlined, EditOutlined } from "@ant-design/icons"; // Import the Ant Design Upload icon
import { errorNotf } from "../utils/notifications/Toast";

const Classifications = ({
  record,

  currentView,
  setCurrentView,
  closeModal,
  setMessage,
  refetch,
}) => {
  console.log("🚀 ~ record:", record);
  const {
    handleSubmit,
    reset,
    formState: { errors },
    register,
    setValue,
    watch,
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      name_ar: record?.name || "",
      name_en: "",
      image_path: null,
    },
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleFileChange = (e) => {
    let img = e.target.files[0];
    if (img) {
      setValue("image_path", img);
      setSelectedFile(img);
      setIsDisabled(true);
    }
  };

  const queryClient = useQueryClient();
  const { postData } = useApi();

  const mutation = useMutation(postData, {
    onSuccess: ({ data }) => {
      setCurrentView("success");
      setMessage(`تم انشاء التصنيف (${data?.data?.name}) بنجاح`);
      refetch();
    },
    onError: (err) => {
      closeModal();
      errorNotf(err.response.data.errors.message);
    },
  });

  const onSubmit = (data) => {
    console.log("Form Submitted:", data);
    if (record?.id) {
      mutation.mutate([
        `/admin/report-classification/${record?.id}`,
        {
          ...data,
          _method: "PUT",
          image_path: watch("image_path") || null,
          name_en: watch("name_ar"),
        },
      ]);
    } else {
      mutation.mutate([
        `/admin/report-classification`,
        { ...data, name_en: watch("name_ar") },
      ]);
    }
  };

  useEffect(() => {
    if (record) {
      reset({
        name_ar: record?.name || "",
        name_en: record?.name || "",
      });
    }
  }, [record, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
        <div className="flex flex-col gap-1 relative">
          <label className="font-medium">اسم التصنيف</label>
          <input
            type="text"
            className={`border ${
              errors.name_ar ? "border-red-500" : "border-gray-300"
            } p-2 rounded-md outline-none w-full h-10`}
            placeholder="الابلاغ عن حادث"
            {...register("name_ar", {
              required: "اسم التصنيف مطلوب",
            })}
          />
          {errors.name_ar && (
            <span className="text-red-500 mt-1">{errors.name_ar.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-medium">رفع صورة</label>
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <button
              className={`bg-[#33835C1A] text-black p-2 rounded-md w-full flex items-center justify-center h-10 gap-1 text-sm ${
                isDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
              }`}
            >
              <UploadOutlined className="mr-2" />
              اضافة صورة
            </button>
          </div>
        </div>
      </div>

      {selectedFile && (
        <div className="text-sm flex items-center">
          <span
            onClick={() => {
              setValue("image_path", null);
              setSelectedFile(null);
              setIsDisabled(false);
            }}
            className="text-red-600 cursor-pointer ml-2 text-md"
          >
            &times;
          </span>
          <span>{selectedFile.name}</span>
        </div>
      )}

      {record?.image_path && !selectedFile && (
        <div className="flex justify-center">
          <img
            src={record.image_path}
            alt="User's selected"
            className="w-[150px] h-[150px] rounded-lg border border-gray-300 shadow-lg "
          />
        </div>
      )}

      <div className="flex justify-end">
        <button
          className="bg-[#33835C] text-white p-2 px-10 rounded-lg outline-none"
          type="submit"
        >
          <EditOutlined /> {"تعديل"}
        </button>
      </div>
    </form>
  );
};

export default Classifications;
