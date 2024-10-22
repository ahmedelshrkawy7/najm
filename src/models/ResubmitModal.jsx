/* eslint-disable react/prop-types */

const ResubmitModal = ({ handleSubmit, onSubmit, errors, register }) => {
  return (
    <form
      className="px-5 py-3 flex flex-col gap-4 pt-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="relative">
        <label htmlFor="textarea" className="font-medium text-[15px]">
          يرجى كتابة سبب اعادة البلاغ
        </label>
        <textarea
          id="textarea"
          className="my-2 border border-gray-300 p-2 rounded-md w-full resize-none h-24 outline-none placeholder:text-sm"
          placeholder="اكتب هنا"
          name="reason"
          {...register("reason", {
            required: "هذا الحقل مطلوب",
          })}
        ></textarea>
        {errors.reason && (
          <p className="text-red-500 absolute -bottom-3">{errors.reason.message}</p>
        )}
      </div>
      <div className="relative">
        <label htmlFor="textarea" className="font-medium text-[15px]">
          الملاحظات
        </label>
        <textarea
          id="textarea"
          className="my-2 border border-gray-300 p-2 rounded-md w-full resize-none h-24 outline-none placeholder:text-sm"
          placeholder="اكتب هنا"
          name="notes"
          {...register("notes", {
            required: "هذا الحقل مطلوب",
          })}
        ></textarea>
        {errors.notes && (
          <p className="text-red-500 absolute ">{errors.notes.message}</p>
        )}
      </div>

      <div className="py-3 pt-0 flex items-center justify-end">
        <button
          type="submit"
          className=" bg-[#33835C] text-white p-1 px-10 rounded-lg "
        >
          تاكيد
        </button>
      </div>
    </form>
  );
};

export default ResubmitModal;
