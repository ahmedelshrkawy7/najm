import { PlusOutlined } from "@ant-design/icons";
import { Input, Space } from "antd";
export const InputText = () => {
  return (
    <>
      <Space.Compact size="large">
        <Input
          addonBefore={<PlusOutlined />}
          placeholder="this is placeholder"
        />
      </Space.Compact>
    </>
  );
};
