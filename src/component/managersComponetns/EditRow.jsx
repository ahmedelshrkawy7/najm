import { EditOutlined } from "@ant-design/icons";
import { useForm } from "react-hook-form";

/* eslint-disable react/prop-types */
const EditRow = ({ record, setCurrentView }) => {
  const { hanedleSubmit } = useForm({
    defaultValues: {},
  });

  return (
    <form>
      <div className="h-36 pt-6">
        <input
          className="bg-[#E6E6E6] px-2 py-2 rounded-lg border border-gray-300 sm:w-1/2 md:w-[40%] lg:w-1/2 w-full 
                        "
          defaultValue={record.name}
          // cursor-not-allowed"
          // disabled
        />
      </div>

      <div className="py-3 pt-0 flex items-center justify-end">
        <button
          type="submit"
          onClick={() => {
            setCurrentView("success");
          }}
          className=" bg-[#33835C] text-white p-1 px-10 rounded-lg "
        >
          <EditOutlined /> {"تعديل"}
        </button>
      </div>
    </form>
  );
};

export default EditRow;
