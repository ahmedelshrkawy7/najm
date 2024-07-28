import { PlusOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, Input, Space } from "antd";
import { useRef, useState } from "react";
import "./ListInput.css";
import { Controller } from "react-hook-form";

const Listinput = ({
  icon,
  control,
  errors,
  listInputTitle,
  setValue,
  watch,
  resetField,
}) => {
  const [data, setData] = useState([]);
  // const [v, setV] = useState("");

  const inputRef = useRef("");
  function addLabel() {
    console.log(data);
    if (watch("list")) {
      setData([...data, { name: watch("list") }]);
      setValue("suspects", [...data, { name: watch("list") }]);
      setValue("list", "");
    }
  }

  function deleteTag(index) {
    const data1 = [...data];
    data1.splice(index, 1);

    setData(data1);
  }
  // console.log(errors.listInputControl)
  return (
    <div className="listinput">
      <div>
        <h5>{listInputTitle}</h5>
      </div>

      <Space.Compact
        className=""
        style={{
          width: "300px",
          // border: "1px solid transparent",
          borderRadius: "10px",
        }}
        size="large"
      >
        <Controller
          control={control}
          name="list"
          rules={{ required: "هذا الحق مطلوب" }}
          render={({
            field: { onChange, onBlur, value, name, ref },
            fieldState,
          }) => (
            <div className="flex flex-col w-full">
              <div className="relative">
                <Input
                  onBlur={onBlur}
                  ref={ref}
                  value={value}
                  onChange={onChange}
                  placeholder="اسم الشخص"
                  className="border hover:!border-[#d9d9d9] outline-none focus:border-[#d9d9d9]"
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
              {errors.list && !watch("list") && (
                <p className="text-red-500">{errors.list?.message}</p>
              )}
            </div>
          )}
        />
      </Space.Compact>

      <div className="container flex gap-5 flex-wrap">
        {data.map((el, index) => {
          return (
            <>
              <div className="tag flex items-center ">
                <h3 className="flex items-center">{el.name}</h3>
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
