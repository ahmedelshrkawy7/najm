import { useContext, useEffect } from "react";
import ReportsHeader from "../../custom hooks/ReportsHeader";
import {
  Steps,
  useState,
  ReportClassification,
  theme,
  ReportsPreview,
} from "../../import";
import ContactInformation from "./ContactInformation";
import ReportDetails from "./ReportDetails";
import { useForm } from "react-hook-form";

const Reports = () => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [title, setTitle] = useState("");
  const [v, setV] = useState([]);
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
    getValues,
    control,
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      textareaControl: "",
      locationInputControl: "",
      InputControl: "",
      datePickerControl: "",
      listInputControl: "",
    },
  });

  const values = watch([
    "textareaControl",
    "locationInputControl",
    "InputControl",
    "datePickerControl",
    "listInputControl",
  ]);

  let value = true;

  let va = getValues();
  console.log(va);
  // let checkTitle = () => {
  //   if (!title) {
  //     value = true;
  //   } else {
  //     value = false;
  //   }
  //   return value;
  // };
  const allValues = [...values, title];
  console.log(allValues, value);
  const returnVal = () => {
    for (let i = 0; i < allValues.length; i++) {
      if (allValues.at(i) === "") {
        console.log("fst");
        value = true;
        titleIsValid;
      } else {
        console.log("snd");
        value = false;
      }
      return value;
    }
  };

  // useEffect(() => {
  //   checkTitle();
  // }, [title]);

  useEffect(() => {
    returnVal();
  }, [values]);

  // console.log(checkTitle());
  // // console.log(returnVal());

  const disabled = returnVal();

  const handleSelected = (title) => {
    setTitle(title);
  };

  const steps = [
    {
      title: "تصنيف البلاغ",
      content: (
        <ReportClassification title={title} handleSelected={handleSelected} />
      ),
    },
    {
      title: "تفاصيل البلاغ",
      content: (
        <ReportDetails
          errors={errors}
          handleSubmit={handleSubmit}
          register={register}
          watch={watch}
          control={control}
        />
      ),
    },
    {
      title: "معلومات الاتصال",
      content: <ContactInformation />,
    },
    {
      title: "معاينة البلاغ",
      content: <ReportsPreview />,
    },
  ];

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const contentStyle = {
    backgroundColor: "white",
    borderRadius: 12,
    overflow: "hidden",
    border: `1px solid ${token.colorBorder}`,
    marginTop: 50,
  };

  return (
    <div className="main_container mx-auto">
      <h2 className='text-3xl w-fit my-12 relative after:absolute after:content-[""] after:top-12 after:right-0 after:w-full after:h-[2px] after:block after:bg-gradient-to-l after:from-[#33835C]  after:to-[#33835C'>
        تقديم بلاغ
      </h2>
      <Steps current={current} items={items} />
      <div style={contentStyle}>{steps[current].content}</div>
      <div className="flex justify-between mt-6">
        <button
          className=" bg-white border border-[#33835C] text-[#33835C]  flex gap-2  p-3 rounded-md"
          onClick={prev}
        >
          <span>&rarr;</span>
          <span>رجوع</span>
        </button>
        {current === items.length - 1 && (
          <button className="bg-[#33835C] rounded-md text-white p-3">
            تاكيد البلاغ
          </button>
        )}
        {current < items.length - 1 && (
          <button
            disabled={disabled}
            className={
              " bg-[#33835C] text-white rounded-md disabled:bg-[#2eac72]  disabled:cursor-not-allowed disabled:text-black p-3"
            }
            onClick={next}
          >
            <span>التالى </span>
            <span>&larr;</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Reports;
