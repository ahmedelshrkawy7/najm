import { PlusOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, Input, Space } from "antd";
import { useRef, useState } from "react";
import "./ListInput.css";

const Listinput = () => {
  const [data, setData] = useState([]);
  const [v, setV] = useState("");

  const inputRef = useRef("");

  function addLabel() {
    if (v) {
      setData([...data, v]);
      setV("");
    }
  }

  function deleteTag(index) {
    const data1 = [...data];
    data1.splice(index, 1);

    setData(data1);
  }
  return (
    <div className="listinput">
      <div>
        <h5> أسماء الأشخاص المشتبه بهم</h5>
      </div>

      <Space.Compact
        style={{
          width: "300px",
          border: "1px solid green ",
          borderRadius: "10px",
        }}
        size="large"
      >
        <Input
          placeholder="add text"
          style={{ border: "none" }}
          value={v}
          onChange={(e) => setV(e.target.value)}
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

      <div className="container flex gap-5 flex-wrap">
        {data.map((el, index) => {
          return (
            <>
              <div className="tag flex items-center ">
                <h3 className="flex items-center">{el}</h3>
                <button
                  onClick={() => {
                    deleteTag(index);
                  }}
                >
                  <CloseOutlined />
                </button>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Listinput;
