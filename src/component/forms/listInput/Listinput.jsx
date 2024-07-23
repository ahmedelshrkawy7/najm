import { PlusOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, Input, Space } from "antd";
import { useRef, useState } from "react";
import "./ListInput.css";
<<<<<<< HEAD
=======
import { Controller } from "react-hook-form";
>>>>>>> master

const Listinput = ({ icon, control, errors, listInputTitle }) => {
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
<<<<<<< HEAD
  return (
    <div className="listinput">
      <div>
        <h5> أسماء الأشخاص المشتبه بهم</h5>
=======
  // console.log(errors.listInputControl)
  return (
    <div className="listinput">
      <div>
        <h5>{listInputTitle}</h5>
>>>>>>> master
      </div>

      <Space.Compact
        className=""
        style={{
          width: "300px",
<<<<<<< HEAD
          border: "1px solid green ",
=======
          // border: "1px solid transparent",
>>>>>>> master
          borderRadius: "10px",
        }}
        size="large"
      >
<<<<<<< HEAD
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
=======
        <Controller
          control={control}
          name="listInputControl"
          rules={{ required: "هذا الحق مطلوب" }}
          render={({ field, fieldState }) => (
            <div className="flex flex-col w-full">
              <div className="relative">
                <Input
                  onChange={(e) => setV(e.target.value)}
                  placeholder="اسم الشخص"
                  className="border hover:!border-[#d9d9d9] outline-none focus:border-[#d9d9d9]"
                  value={v}
                  {...field}
                />

                <Button
                  style={{
                    background: "#33835C0F",
                    color: "#33835C",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: 100,
                    borderWidth: 1,
                    borderRadius: "4px",
                    borderColor: "#d9d9d9",
                  }}
                  icon={icon}
                  ghost={true}
                  onClick={addLabel}
                ></Button>
              </div>
              {errors.listInputControl && !v && (
                <p className="text-red-500">
                  {errors.listInputControl?.message}
                </p>
              )}
            </div>
          )}
        />
>>>>>>> master
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
