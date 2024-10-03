/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, Input, message, Space } from "antd";
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
  nameType,
}) => {
  const [data, setData] = useState([]);

  // useEffect(() => {
  //   if (watch("list")) {
  //     setData([...values[4], { name: watch("list") }]);
  //   }
  // }, []);
  const arrayOfValues = watch("suspects") || [];
  console.log("🚀 ~ arrayOfValues:", arrayOfValues);
  const [isBlur, setIsBlur] = useState(false);

  console.log(watch("list"));

  function addLabel() {
    inputRef.current.input.style.width = "300px";
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
  const inputRef = useRef();
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
          name={nameType}
          // rules={{
          //   pattern: [],
          //   required: "هذا الحق مطلوب",
          //   validate: (value) => value !== "",
          // }}
          render={({
            field: { onChange, onBlur, value, name, ref },
            fieldState,
          }) => (
            <div className="flex  max-w-full flex-col">
              <div className="flex">
                <Input
                  value={value}
                  maxLength={100}
                  onBlur={() => {
                    setIsBlur(true);
                    onBlur();
                  }}
                  ref={(e) => {
                    inputRef.current = e;
                  }}
                  onKeyUp={() => {
                    if (inputRef.current) {
                      inputRef.current.input.style.width =
                        (value.length + 30) * 4 + "px";
                    }
                  }}
                  onChange={onChange}
                  placeholder="اسم الشخص"
                  className="border font-thin   text-[16px] pl-[48px] min-w-[200px] md:min-w-[300px]   max-w-full  hover:!border-[#d9d9d9] outline-none focus:border-[#d9d9d9] overflow-scroll "
                />

                <Button
                  style={{
                    background: "#33835C0F",
                    color: "#33835C",
                    zIndex: 100,
                    borderWidth: 1,
                    marginRight: "-40px",
                    borderRadius: "10px",
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
        {watch("suspects")?.map((el, index) => {
          return (
            <>
              <div className="tag flex items-center h-[40px] ">
                <h3 className="flex items-center">{el.name}</h3>
                <button
                  className="text-[20px] w-10 text-center flex items-center justify-center"
                  onClick={() => {
                    deleteTag(index);
                  }}
                >
                  <span className="text-[22px] font-semibold">&times;</span>
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
