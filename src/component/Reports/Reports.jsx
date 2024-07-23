<<<<<<< HEAD
=======
import { useContext, useEffect } from "react";
import ReportsHeader from "../../custom hooks/ReportsHeader";
>>>>>>> master
import {
  Steps,
  useState,
  ReportClassification,
  theme,
  ReportsPreview,
} from "../../import";
<<<<<<< HEAD
import Listinput from "../forms/listInput/Listinput";
=======
import ContactInformation from "./ContactInformation";
import ReportDetails from "./ReportDetails";
import { useForm } from "react-hook-form";

const labelProps = {
  textarea: "وصف البلاغ",
  selectTitle: "هل انت على علم باسماء المشتبه بهم؟",
  listInputTitle: "أسماء الاشخاص المشتبه بهم",
  datePickerTitle: "تاريخ ارتكاب المخالفة",
  locationTitle: "مكان حدوث المخالفة",
};
>>>>>>> master

const Reports = () => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
<<<<<<< HEAD
  const [selectedCard, setSelectedCard] = useState("");
  const handleSelceted = (id) => {
    setSelectedCard(id);
  };
=======
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
      nameControl: "",
      emailControl: "",
      phoneControl: "",
      fileInputControl: "",
    },
  });

  const values = watch([
    "textareaControl",
    "locationInputControl",
    "InputControl",
    "datePickerControl",
    "listInputControl",
    "fileInputControl",
  ]);
  console.log(values);
  const handleSelected = (title) => {
    setTitle(title);
  };

>>>>>>> master
  const steps = [
    {
      title: "تصنيف البلاغ",
      content: (
<<<<<<< HEAD
        <ReportClassification
          selectedCard={selectedCard}
          handleSelceted={handleSelceted}
        />
=======
        <ReportClassification title={title} handleSelected={handleSelected} />
>>>>>>> master
      ),
    },
    {
      title: "تفاصيل البلاغ",
<<<<<<< HEAD
      content: <Listinput />,
    },
    {
      title: "معلومات الاتصال",
      content: "last content",
    },
    {
      title: "معاينة البلاغ",
      content: <ReportsPreview selectedCard={selectedCard} />,
=======
      content: (
        <ReportDetails
          labelProps={labelProps}
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
      content: <ContactInformation errors={errors} control={control} />,
    },
    {
      title: "معاينة البلاغ",
      content: <ReportsPreview values={values} labelProps={labelProps} />,
>>>>>>> master
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
<<<<<<< HEAD
  // bg-[linear-gradient(to_right,rgba(0,128,2,0),rgba(0,128,2,1))]
=======

>>>>>>> master
  return (
    <div className="main_container mx-auto">
      <h2 className='text-3xl w-fit my-12 relative after:absolute after:content-[""] after:top-12 after:right-0 after:w-full after:h-[2px] after:block after:bg-gradient-to-l after:from-[#33835C]  after:to-[#33835C'>
        تقديم بلاغ
      </h2>
      <Steps current={current} items={items} />
<<<<<<< HEAD
      <div style={contentStyle}>
        <h2 className="bg-[#33835C] text-xl px-8 py-4 text-white">
          تصنيف البلاغ
        </h2>
        {steps[current].content}
      </div>
=======
      <div style={contentStyle}>{steps[current].content}</div>
>>>>>>> master
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
<<<<<<< HEAD
            className=" bg-[#33835C] text-white  rounded-md disabled:bg-green-100 p-3"
=======
            className={
              " bg-[#33835C] text-white rounded-md disabled:bg-[#2eac72]  disabled:cursor-not-allowed disabled:text-black p-3"
            }
>>>>>>> master
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
