import { Input, Space } from "antd";
export const InputText = ({inputTitle,inputPlaceHolder}) => {
  return (

<div className="flex w-full md:w-auto flex-col gap-4">
      <div>
        <h2> {inputTitle} </h2>
      </div>
      <Space.Compact  size="large">
        <Input
           className="hover:border-emerald-500  focus:border-emerald-500 w-full md:w-[300px]"
          placeholder={inputPlaceHolder}
        />
      </Space.Compact>
    </div>
     
  );
};
