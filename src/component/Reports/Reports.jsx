import ReportsHeader from "../../pages/user/ReportsHeader";
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
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getData, postData } from "../../utils/apiHandler";

const Reports = () => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [title, setTitle] = useState("");

  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery("classifications", () =>
    getData("/report-classification")
  );

  const post = useMutation(postData, {
    onSuccess: () => {
      // setKey(e?.data?.data.key);
      // navigate("/otp", {
      //   state: e?.data?.data.key,
      //   email: formik.values.email,
    },
    onError: ({ message }) => {},
  });
  // const queryClient = useQuery("report-classification", getData);
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      textareaControl: "",
      locationInputControl: "",
      InputControl: "",
    },
  });

  const disabled = Object.keys(errors).length > 0 || !title;
  console.log(disabled, errors.textareaControl);

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
  // bg-[linear-gradient(to_right,rgba(0,128,2,0),rgba(0,128,2,1))]

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
            className=" bg-[#33835C] text-white  rounded-md disabled:bg-green-100 p-3"
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
