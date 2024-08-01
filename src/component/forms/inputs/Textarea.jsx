import { Input } from "antd";
import { useEffect, useRef, useState } from "react";
import { Controller } from "react-hook-form";
const { TextArea } = Input;

const Textarea = ({
  register,
  control,
  errors,
  textAreaTitle,
  watch,
  iconLabel,
}) => {
  const refVal = useRef(null);
  const wrapperRef = useRef(null);
  const textAreaRef = refVal.current;
  const value = watch("description");

  const handleInput = (e) => {
    if (textAreaRef.current) {
      textAreaRef.style.height = "auto";
      textAreaRef.style.height = e.target.scrollHeight + "px";
    }
  };

  return (
    <div ref={wrapperRef} className="flex flex-col gap-4">
      <div className="flex">
        <h2 className="font-medium text-lg">{textAreaTitle}</h2>
        <span className="text-red-500">{iconLabel}</span>
      </div>
      {/* <textarea
        ref={ref}
        rows={1}
        onChange={(e) => setValue(e.target.value)}
        className="!max-h-[250px]"
        value={value}
      /> */}
      <Controller
        name="description"
        rules={{ required: "هذا الحقل مطلوب", message: "هذا الحقل مطلوب" }}
        control={control}
        render={({ field }) => (
          <>
            <TextArea
              placeholder="اكتب نص البلاغ هنا..."
              {...field}
              ref={refVal}
              onChange={(e) => {
                field.onChange(e);
                handleInput(e);
              }}
              autoSize={{ minRows: 4 }}
              className="scrollbar scrollbar-w-2 scrollbar-thumb-[#33835c] scrollbar-thumb-rounded-full hover:border-green-500 focus:border-green-500 max-h-72"
            />
            {errors.description && (
              <p className="text-red-500">{errors.description.message}</p>
            )}
          </>
        )}
      />
    </div>
  );
};

export default Textarea;
