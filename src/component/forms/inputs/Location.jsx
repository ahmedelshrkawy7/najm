import { Input, Space } from "antd";
import { Controller } from "react-hook-form";


{/* <Controller name="textareaControl" rules={
  {required:"this is required field",message:"this is required field"}
} control={control} render={({field,fieldState})=>(
 <>
 <TextArea
 name="textarea"
 placeholder="اكتب نص البلاغ هنا..."
 rows={4}
 {...field}
 className=" hover:border-green-500 focus:border-green-500"
/>
{errors.textareaControl && <p className="text-red-500">{errors.textareaControl.message}</p>}
</>

)
}/> */}








const Location = ({src,inpTitle,inputPlaceholder,controlLocationName,width,control,errors,field,name}) => {

  return (
    <div className="flex flex-col self-start gap-4">
      <div>
        <h2>{inpTitle}</h2>
      </div>
      <Space.Compact  style={{ width: "300px"}}>
        
          <div className="flex flex-col w-full">
          <Input
          className="focus:border-green-600 p-[10px] hover:border-green-600 "
          placeholder={inputPlaceholder}
          {...field} 
          name={name}
          suffix={<img width={width} src={src}  />}
        />
          { errors[name] && <p className="text-red-500 mb">{errors[name].message}</p>} 
          {/* {errors.locationInputControl && <p className="text-red-500 mb">{errors.locationInputControl.message}</p>} */}
         </div>

      </Space.Compact>
    </div>
  );
};

export default Location;
