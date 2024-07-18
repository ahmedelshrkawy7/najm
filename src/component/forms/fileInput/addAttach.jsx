import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload } from "antd";
import "./AddAttach.css";

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
const AddAttach = () => {
  return (
    <Upload {...props}>
      <Button icon={<UploadOutlined />}>إرفق من هنا</Button>
    </Upload>
  );
};

export default AddAttach;
