/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import { CloudUploadOutlined, LoadingOutlined } from "@ant-design/icons";
import UsableReport from "./UsableReport";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import useApi from "../utils/useApi";
import SuccessModal from "./successModal";
import FileInput from "../component/forms/fileInput/FileInput";
import { Spin } from "antd";

const ReportInfo = ({ title, action, _id,successMsg }) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
    register,
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      _method: "PUT",
      action: action,
      notes: "",
      files: [],
      parent_id: _id,
    },
  });

  const [fils, setFils] = useState([]);
  const [imgs, setImgs] = useState([]);
  const [videos, setVideos] = useState([]);

  const [currentView, setCurrentView] = useState("default");
  const { postData } = useApi();

  let { id } = useParams();
  const queryClient = useQueryClient();
  const mutation = useMutation(postData, {
    onSuccess: () => {
      setCurrentView("success");
      queryClient.invalidateQueries(["admin", ["/reports"], id]);
      // successNotf("تم اسناد البلاغ للادارة بنجاح");
    },
    onError: (err) => {
      console.log("🚀 ~ err:", err);
    },
  });

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    setValue("files", files);
  };

  let onSubmit = (data) => {
    console.log("🚀 ~ onSubmit ~ data:", data);
    mutation.mutate([`/reports/${id}`, data]);
  };
  return (
    <>
      {currentView === "default" ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-5 py-3 flex flex-col gap-2">
            <UsableReport
              selectTitle={"نوع الاجراء"}
              textAreaLabel={"يرجى كتابة الملاحظات"}
              control={control}
              data={[]}
              name=""
              title={title}
              notes={"notes"}
              files={"files"}
              errors={errors}
            />
            <div>
              {/* <label
                htmlFor="fileInput"
                className="mb-2 text-[15px] font-medium inline-block"
              >
                ارفاق مستند
              </label>
              <div>
                <label
                  className="flex gap-2 justify-center p-2 cursor-pointer bg-[#33835C1A] rounded text-black items-center w-[220px] h-[40px]"
                  htmlFor="fileInput"
                >
                  <CloudUploadOutlined className="text-[#33835C] text-[20px]" />
                  <span className="text-sm">إضافة مرفقات</span>
                </label>
                <input
                  multiple
                  id="fileInput"
                  type="file"
                  name="files"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div> */}
              <FileInput
                fils={fils}
                setFils={setFils}
                videos={videos}
                setVideos={setVideos}
                imgs={imgs}
                setImgs={setImgs}
                register={register}
                errors={errors}
                control={control}
                watch={watch}
                setValue={setValue}
              />
            </div>

            <div className="py-3 pt-0 flex items-center justify-end">
              <button
                type="submit"
                className=" bg-[#33835C] text-white p-1 px-10 rounded-lg "
              >
                {mutation.isLoading ? (
                  <Spin
                    indicator={
                      <LoadingOutlined spin style={{ color: "white" }} />
                    }
                    size="default"
                  />
                ) : (
                  "تاكيد"
                )}
              </button>
            </div>
          </div>
        </form>
      ) : (
        <SuccessModal title={successMsg} />
      )}
    </>
  );
};

export default ReportInfo;
