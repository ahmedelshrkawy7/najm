import { Input, Space } from "antd";
import { useRef } from "react";
import { Controller } from "react-hook-form";
const Location = ({
  src,
  inpTitle,
  inputPlaceholder,
  width,
  control,
  errors,
  title,
}) => {
  const inputRef = useRef(null);
  return (
    <div className="flex flex-col self-start gap-4">
      <div>
        <h2>{inpTitle}</h2>
      </div>
      <Space.Compact style={{ maxWidth: "62vw" }}>
        <div className="flex flex-col w-full">
          <Controller
            control={control}
            name={title}
            rules={{ required: "هذا الحق مطلوب", message: "هذا الحقل مطلوب" }}
            render={({ field, fieldState }) => (
              <div>
                <Input
                  maxLength={100}
                  {...field}
                  ref={(e) => {
                    inputRef.current = e;
                  }}
                  onKeyUp={() => {
                    if (inputRef.current) {
                      inputRef.current.input.style.width =
                        (field.value.length + 30) * 4 + "px";
                    }
                  }}
                  className="focus:border-green-600 p-[10px] w-[70vw] sm:w-full  hover:border-green-600 "
                  placeholder={inputPlaceholder}
                  suffix={<img width={width} src={src} />}
                />
              </div>
            )}
          />
        </div>
      </Space.Compact>
    </div>
  );
};

export default Location;
