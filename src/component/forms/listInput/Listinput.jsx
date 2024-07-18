import { PlusOutlined } from "@ant-design/icons";
import { Button, Input, Space } from "antd";
import { useRef, useState } from "react";
import "./ListInput.css";

const Listinput = () => {
  const [data, setData] = useState([]);

  const inputRef = useRef("");

  function addLabel() {
    console.log(inputRef.current.input.value);

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
        <Input
          placeholder="add text"
          style={{ border: "none" }}
          ref={inputRef}
        />
      </Space.Compact>

      <div className="container">
        <div className="tag">
          <p>this is indide</p>
          <span>&times;</span>
        </div>
      </div>
    </>
  );
};

export default Listinput;
