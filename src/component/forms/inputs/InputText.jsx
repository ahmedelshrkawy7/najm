import { Input, Space } from "antd";
import { Controller } from "react-hook-form";

{
  /* <Controller
  control={control}
  name={title}
  rules={{ required: "هذا الحق مطلوب", message: "هذا الحقل مطلوب" }}
  render={({ field, fieldState }) => (
    <div>
      <Input
        {...field}
        className="focus:border-green-600 p-[10px] hover:border-green-600 "
        placeholder={inputPlaceholder}
        suffix={<img width={width} src={src} />}
      />
    </div>
  )}
/>;
{
  errors[title] && <p className="text-red-500">{errors[title].message}</p>;
} */
}

export const InputText = ({
  inputTitle,
  inputPlaceHolder,
  name,
  errors,
  control,
  pattern,
}) => {
  console.log(pattern);
  return (
    <div className="flex w-full md:w-auto flex-col self-start gap-4">
      <div>
        <h2> {inputTitle} </h2>
      </div>
      <Space.Compact size="large">
        <Controller
          control={control}
          name={name}
          rules={{
            required: "هذا الحقل مطلوب",
            pattern: pattern,
          }}
          render={({ field, fieldState }) => (
            <div>
              <Input
                {...field}
                className="hover:border-emerald-500  focus:border-emerald-500 w-full md:w-[300px]"
                placeholder={inputPlaceHolder}
              />
              {errors[name] && (
                <p className="text-red-500">{errors[name].message}</p>
              )}
            </div>
          )}
        />
      </Space.Compact>
    </div>
  );
};
