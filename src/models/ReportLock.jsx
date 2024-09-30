import { Checkbox } from "antd";
import { useState } from "react";

const ReportLock = () => {
  const [checked, setChecked] = useState(true);

  const onChange = (e) => {
    console.log("checked = ", e.target.checked);
    setChecked(e.target.checked);
  };
  const label = "اقفال البلاغ";
  return (
    <div className="px-5 py-3 flex flex-col gap-2 mt-2">
      <div className="custom-checkbox font-medium">
        <Checkbox checked={checked} onChange={onChange}>
          {label}
        </Checkbox>
      </div>
      <div>
        <label
          htmlFor="textarea"
          className="font-medium text-[14px] mt-6 inline-block"
        >
          الملاحظات ونتيجة دراسة البلاغ
        </label>
        <textarea
          id="textarea"
          className="my-2 border border-gray-300 p-2 rounded-md w-full resize-none h-24 outline-none placeholder:text-sm"
          placeholder="اكتب هنا"
        ></textarea>
      </div>
      <div className="px-5 py-3 pt-0 flex items-center justify-end">
        <button
          className=" bg-[#33835C] text-white p-1 px-10 rounded-lg"
          onClick={() => {}}
        >
          تاكيد
        </button>
      </div>
    </div>
  );
};

export default ReportLock;
