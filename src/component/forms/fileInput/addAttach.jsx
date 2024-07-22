import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload } from "antd";
import "./AddAttach.css";
import exportSvg from "../../../assets/icons/export.svg";
import { Controller } from "react-hook-form";
const props = {
  name: "file",
  action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
  UploadOutlined: true,
  headers: {
    authorization: "authorization-text",
  },
  listType: "picture",
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};
const AddAttach = ({ control, errors }) => {
  return (
    <Controller
      name="fileInputControl"
      control={control}
      rules={{ required: "هذا الحقل مطلوب", message: "هذا الحقل مطلوب" }}
      render={({ field }) => (
        <div>
          <Upload {...field} {...props}>
            <Button
              className="bg-[#33835C1A] hover:!bg-[#33835C1A] hover:!text-[#33835C] hover:!border-[#33835C] text-[#33835C] w-[300px] !py-5 mt-4"
              icon={<img src={exportSvg} />}
            >
              إرفق من هنا
            </Button>
          </Upload>
          {errors.fileInputControl && <p>{errors.fileInputControl.message}</p>}
        </div>
      )}
    />
  );
};

export default AddAttach;
