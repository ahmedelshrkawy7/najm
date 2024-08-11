import { PlusOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, Input, Space } from "antd";
import { useEffect, useRef, useState } from "react";
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
  values,
  iconLabel,
  getValues,
}) => {
  const [data, setData] = useState([]);

  // useEffect(() => {
  //   if (watch("list")) {
  //     setData([...values[4], { name: watch("list") }]);
  //   }
  // }, []);
  const arrayOfValues = watch("suspects");
  const [isBlur, setIsBlur] = useState(false);

  function addLabel() {
    if (watch("list")) {
      setData([...data, { name: watch("list") }]);
      setValue("suspects", [...arrayOfValues, { name: watch("list") }]);
      setValue("list", "");
    }
  }
  const disabled = watch("list") !== "";
  console.log(disabled);
  function deleteTag(index) {
    const data1 = watch("suspects");
    data1.splice(index, 1);
    setValue("suspects", data1);
    setData(data1);
  }
  return (
    <div className="listinput">
      <div className="flex gap-2">
        <h5>{listInputTitle}</h5>
        <span className="text-red-500">{iconLabel}</span>
      </div>

      <Space.Compact
        style={{
          // border: "1px solid transparent",
          borderRadius: "10px",
        }}
        size="large"
      >
        <Controller
          control={control}
          name="list"
          rules={{
            required: "هذا الحق مطلوب",
            validate: (value) => value !== "",
          }}
          render={({
            field: { onChange, onBlur, value, name, ref },
            fieldState,
          }) => (
            <div className="flex w-[300px] flex-col">
              <div className="flex">
                <Input
                  ref={ref}
                  value={value}
                  maxLength={50}
                  onBlur={() => {
                    setIsBlur(true);
                    onBlur();
                  }}
                  onChange={onChange}
                  placeholder="اسم الشخص"
                  className="border  pl-[48px]  hover:!border-[#d9d9d9] outline-none focus:border-[#d9d9d9] overflow-scroll"
                />

                <Button
                  style={{
                    background: "#33835C0F",
                    color: "#33835C",
                    zIndex: 100,
                    borderWidth: 1,
                    marginRight: "-40px",
                    borderRadius: "1px",
                    borderColor: "#d9d9d9",
                  }}
                  icon={icon}
                  disabled={!disabled}
                  ghost={true}
                  onClick={addLabel}
                ></Button>
              </div>
              {arrayOfValues?.length === 0 && isBlur && (
                <p className="text-red-500">
                  يجب تاكيد وجود شخص واحد على الاقل
                </p>
              )}
            </div>
          )}
        />
      </Space.Compact>

      <div className="container flex gap-5 flex-wrap">
        {watch("suspects").map((el, index) => {
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
