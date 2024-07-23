import { Input, Space } from "antd";
<<<<<<< HEAD
import location from "../../../assets/icons/location@2x.png";

const Location = () => {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2>thsi is header</h2>
      </div>
      <Space.Compact size="large" style={{ width: "300px" }}>
        <Input
          className="focus:border-green-600 hover:border-green-600 "
          placeholder="Enter our location"
          suffix={<img src={location} style={{ width: "25px" }} />}
        />
=======
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
  return (
    <div className="flex flex-col self-start gap-4">
      <div>
        <h2>{inpTitle}</h2>
      </div>
      <Space.Compact style={{ width: "300px" }}>
        <div className="flex flex-col w-full">
          <Controller
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
          />
          {errors[title] && (
            <p className="text-red-500">{errors[title].message}</p>
          )}
        </div>
>>>>>>> master
      </Space.Compact>
    </div>
  );
};

export default Location;
