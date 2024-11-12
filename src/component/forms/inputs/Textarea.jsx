/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Input } from "antd";
import { useEffect, useRef, useState } from "react";
import { Controller } from "react-hook-form";
const { TextArea } = Input;
import { Tooltip } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const Textarea = ({
  register,
  control,
  errors,
  textAreaTitle,
  watch,
  iconLabel,
  nameType,
  inputPlaceHolder,
  note,
  // prevData,
}) => {
  const refVal = useRef(null);
  const wrapperRef = useRef(null);
  const textAreaRef = refVal.current;
  const value = watch("description");
  // console.log(prevData);
  const handleInput = (e) => {
    if (textAreaRef.current) {
      textAreaRef.style.height = "auto";
      textAreaRef.style.height = e.target.scrollHeight + "px";
    }
  };
  // console.log(errors, watch("desription"));
  return (
    <div ref={wrapperRef} className="flex flex-col gap-4 relative">
      <div className="flex">
        <h2 className=" ">{textAreaTitle}</h2>
        <span className="text-red-500">{iconLabel}</span>
        {note && (
          <Tooltip
            title={<p className="text-white">{note}</p>}
            overlayStyle={{
              // width: "100%",
              // maxWidth: "none",
              // paddingInline: "40px",
              whiteSpace: "normal", // Allow text to wrap within the tooltip
              wordWrap: "break-word", // Break words when necessary
              maxWidth: "none", // Remove any max-width limitation
              width: "92.5%", // Allow width to auto-size based on content
              paddingInline: "16px", // Optional: Adds some padding inside
              textAlign: "left",
              right: "3.7%",
            }} // Prevents max-width constraint
          >
            <ExclamationCircleOutlined
              style={{ color: "red", marginInline: "8px", cursor: "pointer" }}
            />
          </Tooltip>
        )}
      </div>
      {/* <textarea
        ref={ref}
        rows={1}
        onChange={(e) => setValue(e.target.value)}
        className="!max-h-[250px]"
        value={value}
      /> */}
      <Controller
        name={nameType}
        // rules={{
        //   required: "من فضلك ادخل وصف البلاغ  ",
        //   validate: (value) => {
        //     return value.trim() === "" && "هذ الحقل لا يمكن ان يكون فارغا";
        //   },
        // }}
        control={control}
        render={({ field }) => (
          <>
            <TextArea
              placeholder={inputPlaceHolder || "اكتب نص البلاغ هنا..."}
              {...field}
              // value={field.value || prevData}
              ref={refVal}
              onChange={(e) => {
                // field.onChange(e.target.value.trimStart());
                field.onChange(e);
                handleInput(e);
              }}
              autoSize={{ minRows: 4 }}
              className={`scrollbar scrollbar-w-2 scrollbar-thumb-[#33835c] scrollbar-thumb-rounded-full hover:border-green-500 focus:border-green-500 max-h-72' ${
                errors.description?.message && "border-red-500"
              }`}
            />
            {errors.description && (
              <p className="text-red-500 -mt-2">{errors.description.message}</p>
            )}
          </>
        )}
      />
    </div>
  );
};

export default Textarea;
