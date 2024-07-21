import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload } from "antd";
import "./AddAttach.css";
import styled from "styled-components";

const CustomUploadUpload = styled(Upload)`
  :where(.css-dev-only-do-not-override-p8b6i).ant-btn-default {
    width: 300px;
    padding: 2rem;
    color: green;
    font-size: 1.5rem;
  }
  :where(.css-dev-only-do-not-override-p8b6i).ant-btn-default:hover {
    border: 2px solid green;
    color: green !important;
    background: lightgreen;
  }
`;

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
    <CustomUploadUpload {...props}>
      <Button icon={<UploadOutlined />}>إرفق من هنا</Button>
    </CustomUploadUpload>
  );
};

export default AddAttach;
