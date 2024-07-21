import { PlusOutlined } from "@ant-design/icons";
import { Button, Input, Space } from "antd";
import { useRef, useState } from "react";

const Listinput = () => {
  const [data, setData] = useState([]);
  console.log("🚀 ~ Listinput ~ data:", data);

  const inputRef = useRef("");

  function addLabel() {
    console.log(
      "🚀 ~ addLabel ~ inputRef.current.value:",
      inputRef.current.input.value
    );

    if (inputRef.current.input.value) {
      setData([...data, inputRef.current.input.value]);
    }
  }
  return (
    <>
      <Space.Compact
        style={{
          width: "100%",
          border: "1px solid green ",
          borderRadius: "10px",
        }}
        size="large"
      >
        <Input
          placeholder="add text"
          style={{ border: "none" }}
          ref={inputRef}
        />
        <Button
          style={{
            background: "#33835C0F",
            color: "#33835C",
            border: "none",
            outline: "none",
          }}
          icon={<PlusOutlined />}
          ghost={true}
          onClick={addLabel}
        ></Button>
      </Space.Compact>

      <div className="container"></div>
    </>
  );
};

export default Listinput;
