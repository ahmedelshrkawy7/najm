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
import { sendData } from "../../utils/http";
import { useNavigate } from "react-router-dom";

const labelProps = {
  textarea: "وصف البلاغ",
  selectTitle: "هل انت على علم باسماء المشتبه بهم؟",
  listInputTitle: "أسماء الاشخاص المشتبه بهم",
  datePickerTitle: "تاريخ ارتكاب المخالفة",
  locationTitle: "مكان حدوث المخالفة",
};

const Reports = () => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [title, setTitle] = useState("");
  const [v, setV] = useState(true);
  const navigate = useNavigate();
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
    setValue,
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
    },
  });

  const values = watch(
    [
      "textareaControl",
      "locationInputControl",
      "InputControl",
      "datePickerControl",
      "listInputControl",
      "nameControl",
      "emailControl",
      "phoneControl",
    ],
    false
  );

  const [
    textareaControl,
    locationInputControl,
    InputControl,
    datePickerControl,
    listInputControl,
    nameControl,
    emailControl,
    phoneControl,
  ] = values;
  console.log(nameControl, emailControl, phoneControl);

  const reportDetailsValues = [
    textareaControl,
    locationInputControl,
    InputControl,
    datePickerControl,
  ];

  const contactInforamtionValues = [nameControl, emailControl, phoneControl];
  console.log(emailControl);

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
          labelProps={labelProps}
          errors={errors}
          handleSubmit={handleSubmit}
          register={register}
          watch={watch}
          reportDetailsValues={reportDetailsValues}
          setV={setV}
          setValue={setValue}
          control={control}
        />
      ),
    },
    {
      title: "معلومات الاتصال",
      content: (
        <ContactInformation
          contactInforamtionValues={contactInforamtionValues}
          errors={errors}
          control={control}
          setV={setV}
          v={v}
          emailControl={emailControl}
        />
      ),
    },
    {
      title: "معاينة البلاغ",
      content: <ReportsPreview values={values} labelProps={labelProps} />,
    },
  ];

  const onSubmit = (data) => {
    console.log(data);
  };

  const next = () => {
    // const nextSubmit = handleSubmit(onSubmit)();
    // console.log(nextSubmit);
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
          onClick={() => {
            if (current === 0) {
              return navigate("/");
            }
            return prev();
          }}
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
            disabled={!title || v === false}
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
