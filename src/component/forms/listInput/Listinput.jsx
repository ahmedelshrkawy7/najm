import { PlusOutlined } from "@ant-design/icons";
import { Input, Space } from "antd";

const Listinput = () => {
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

export default Listinput;
