import { useRef } from "react";
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
import useApi from "../../utils/useApi";
import { QueryClient, useMutation } from "react-query";
import Success from "../../models/Success";
import { data } from "autoprefixer";
import Error from "../../models/Error";
import { toast } from "react-toastify";

const labelProps = {
  textarea: "وصف البلاغ",
  selectTitle: "هل انت على علم باسماء المشتبه بهم؟",
  listInputTitle: "أسماء الاشخاص المشتبه بهم",
  datePickerTitle: "تاريخ ارتكاب المخالفة",
  locationTitle: "مكان حدوث المخالفة",
};

const Reports = () => {
  const queryClient = new QueryClient();
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [card, setCards] = useState({
    name: "",
    report_classification_id: 0,
    src: "",
  });
  const [v, setV] = useState(true);
  const navigate = useNavigate();
  const [imgs, setImgs] = useState([]);
  const [fils, setFils] = useState([]);
  const [showmodal, setShowmodal] = useState(false);
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
    setValue,
    control,
    resetField,
    getValues,
  } = useForm({
    mode: "all",
    defaultValues: {
      description: "",
      address: "",
      suspectKnown: "0",
      datePickerControl: "",
      suspects: [],
      user_name: "",
      user_email: "",
      user_phone: "",
      fileInput: "",
    },
  });
  const values = watch(
    [
      "description",
      "address",
      "suspectKnown",
      "datePickerControl",
      "suspects",
      "user_name",
      "user_email",
      "user_phone",
      "fileInput",
    ],
    false
  );

  const date = new Date(values?.[3]?.$d);
  const month =
    date?.getUTCMonth() + 1 < 10
      ? "0" + (date?.getUTCMonth() + 1)
      : date?.getUTCMonth() + 1;

  const getDay = date?.getDate() < 10 ? "0" + date?.getDate() : date?.getDate();

  const fullDate = date?.getFullYear() + "-" + month + "-" + getDay;

  console.log(fullDate);

  const newValues = getValues();
  const {
    list,
    datePickerControl: datePicker,
    fileInput,
    suspects,
    ...restValues
  } = newValues;

  const allFiles = [...imgs, ...fils];
  console.log(allFiles);
  const hidden = watch("suspectKnown") === "0";
  let dataObject = {
    ...restValues,
    files: allFiles,
    date: fullDate,
    report_classification_id: card.report_classification_id,
    suspects: suspects,
  };

  if (hidden) {
    dataObject = {
      ...restValues,
      files: allFiles,
      date: fullDate,
      report_classification_id: card.report_classification_id,
    };
  }

  console.log(fullDate);

  if (fullDate === "NaN-NaN-NaN") {
    dataObject = {
      ...restValues,
      suspects: suspects,
      files: allFiles,
      report_classification_id: card.report_classification_id,
    };
  }

  const { postData } = useApi();

  const Post = useMutation(postData, {
    onSuccess: (e) => {},
    onError: ({ message }) => {},
  });

  console.log(Post.data?.data?.data?.report?.id);

  const [
    description,
    address,
    InputControl,
    datePickerControl,
    listInputControl,
    user_name,
    user_email,
    user_phone,
  ] = values;

  const reportDetailsValues = [description];

  const contactInforamtionValues = [user_name, user_email, user_phone];

  const handleSelected = (card) => {
    setCards(card);
  };

  const steps = [
    {
      title: "تصنيف البلاغ",
      content: (
        <ReportClassification _card={card} handleSelected={handleSelected} />
      ),
    },
    {
      title: "تفاصيل البلاغ",
      content: (
        <ReportDetails
          labelProps={labelProps}
          listInputControl={listInputControl}
          errors={errors}
          handleSubmit={handleSubmit}
          register={register}
          watch={watch}
          reportDetailsValues={reportDetailsValues}
          setV={setV}
          title={card.name}
          imgs={imgs}
          setImgs={setImgs}
          fils={fils}
          setFils={setFils}
          setValue={setValue}
          control={control}
          resetField={resetField}
          getValues={getValues}
          values={values}
          date={date}
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
          setValue={setValue}
          emailControl={user_email}
          phoneControl={user_phone}
          nameControl={user_name}
        />
      ),
    },
    {
      title: "معاينة البلاغ",
      content: (
        <ReportsPreview
          fils={fils}
          setFils={setFils}
          imgs={imgs}
          setImgs={setImgs}
          values={values}
          labelProps={labelProps}
          title={card.name}
          src={card.src}
        />
      ),
    },
  ];

  const next = () => {
    if (!card.name) {
      return toast.error("برجاء اختيار تصنيف البلاغ", {
        className: "font-bold",
      });
    }
    setCurrent(current + 1);
  };

  const prev = () => {
    if (card.name) {
      setV(true);
    }
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const contentStyle = {
    backgroundColor: "white",
    borderRadius: 12,
    overflow: "hidden",
    border: `1px solid ${token.colorBorder}`,
    marginTop: 50,
    maxWidth: "100%",
  };
  const dialogRef = useRef();
  return (
    <div className="main_container mx-auto w-screen">
      <h2 className='text-3xl w-fit my-12 relative after:absolute after:content-[""] after:top-12 after:right-0 after:w-full after:h-[2px] after:block after:bg-gradient-to-l after:from-[#33835C]  after:to-[#33835C'>
        تقديم بلاغ
      </h2>
      <Steps current={current} items={items} />
      <dialog
        ref={dialogRef}
        className="backdrop:bg-black/50"
        onClick={(e) => {
          if (e.target === dialogRef.current) {
            dialogRef?.current?.close();
            document.documentElement.style.overflow = "";
          }
        }}
      >
        <div className="py-2 flex flex-col items-center justify-center !fixed rounded-lg w-[85%] md:w-1/2 h-20  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-green-700 bg-white">
          <h2 className="md:text-xl">من فضلك ادخل سبب البلاغ</h2>
          <span
            className="absolute -top-2 -right-2 w-5 h-5 text-white bg-green-600 rounded-full cursor-pointer font-semibold flex justify-center items-center"
            onClick={() => {
              dialogRef?.current.close();
              document.documentElement.style.overflow = "";
            }}
          >
            x
          </span>
        </div>
      </dialog>
      <div style={contentStyle}>{steps[current].content}</div>
      <div className="flex justify-end gap-4 mt-6">
        <button
          className=" bg-white hover:bg-[#33835C] hover:text-white  text-center border w-[100px] border-[#33835C] text-[#33835C]    p-2  rounded-md"
          onClick={() => {
            if (current === 0) {
              return navigate("/");
            }
            return prev();
          }}
        >
          {/* <span>&rarr;</span> */}
          <span className="text-center">رجوع</span>
        </button>
        {current === items.length - 1 && (
          <button
            onClick={() => {
              Post.mutate(["/reports", dataObject]);
              setShowmodal(true);
            }}
            className={
              " bg-[#33835C] hover:bg-white hover:text-[#33835C] border border-[#33835C] hover:border-[#33835C] w-[100px] text-white rounded-md disabled:bg-[#2eac72]  disabled:cursor-not-allowed disabled:text-black p-2"
            }
          >
            تاكيد البلاغ
          </button>
        )}

        {current < items.length - 1 && (
          <button
            disabled={v === false}
            className={
              " bg-[#33835C] hover:bg-white hover:text-[#33835C] border border-[#33835C] hover:border-[#33835C] w-[100px] text-white rounded-md disabled:bg-[#2eac72]  disabled:cursor-not-allowed disabled:text-black p-2"
            }
            onClick={() => {
              // if (dialogRef?.current && !card.name) {
              //   document.documentElement.style.overflow = "hidden";
              //   return dialogRef.current.showModal();
              // }
              next();
            }}
          >
            <span>التالى </span>
            {/* <span>&larr;</span> */}
          </button>
        )}
      </div>

      {showmodal && (
        <div className=" fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-[#000000aa]">
          <Success id={Post.data?.data?.data?.report?.id} />
        </div>
      )}
    </div>
  );
};

export default Reports;
