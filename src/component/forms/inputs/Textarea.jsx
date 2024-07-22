import { Input } from "antd";
import { Controller } from "react-hook-form";
import { json } from "react-router-dom";
const { TextArea } = Input;

const Textarea = ({register,control,errors}) => {
  console.log(errors)
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="font-medium text-lg">وصف البلاغ</h2>
      </div>
      <Controller name="textareaControl" rules={
         {required:"هذا الحقل مطلوب",message:"هذا الحقل مطلوب"}
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
      }/>
      
      
    </div>
  );
};

export default Textarea;
