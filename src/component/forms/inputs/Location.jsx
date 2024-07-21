import { Input, Space } from "antd";
import location from "../../../assets/icons/location@2x.png";

const Location = () => {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2>thsi is header</h2>
      </div>
      <Space.Compact size="large" style={{ width: "300px" }}>
        <Input
          className="focus:border-green-600 hover:border-green-600 "
          placeholder="Enter our location"
          suffix={<img src={location} style={{ width: "25px" }} />}
        />
      </Space.Compact>
    </div>
  );
};

export default Location;
