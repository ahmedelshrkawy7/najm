import ReportsHeader from "../../custom hooks/ReportsHeader";

import ReportsTextIcon from "./ReportsTextIcon";
import note from "../../assets/icons/note.svg";
import prev2 from "../../assets/icons/prev2.svg";
import prev3 from "../../assets/icons/prev3.svg";
import prev4 from "../../assets/icons/prev4.svg";
import prev5 from "../../assets/icons/prev5.svg";
import prev6 from "../../assets/icons/prev6.svg";
import prev7 from "../../assets/icons/prev7.svg";
import prev8 from "../../assets/icons/prev8.svg";
import prev9 from "../../assets/icons/prev9.svg";
import prev1 from "../../assets/icons/prev1.svg";
import ReportImages from "./ReportImages";
import ReportFiles from "./ReportFiles";
const ReportsPreview = ({
  labelProps,
  values,
  fils,
  setFils,
  imgs,
  setImgs,
}) => {
  const date = new Date(values[3].$d);
  const fullDate =
    date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();

  return (
    <>
      <ReportsHeader title={"بيانات البلاغ"} />
      <div className="px-8 pt-4">
        <div className="flex border border-gray-300 p-4 rounded-xl flex-col gap-6 mb-2">
          <div className="flex justify-between items-center border-b border-gray-300 pb-4">
            <h2 className="text-xl font-semibold">تصنيف البلاغ</h2>
            <img src="../../../src/assets/icons/export.svg" />
          </div>
          <button className="self-start bg-[#33835C] p-4 px-5 mb-4 rounded-lg text-white">
            مخالفة لمدونة قواعد السلوك
          </button>
        </div>
        <div className="border mt-5 border-gray-300 mb-6 py-4 rounded-xl">
          <div className="flex justify-between items-center mx-4  border-b border-gray-300 pb-4">
            <h2 className="text-xl font-semibold">تفاصيل البلاغ</h2>
            <img src="../../../src/assets/icons/export.svg" />
          </div>
          <div className="px-4">
            <ReportsTextIcon
              icon={note}
              title={labelProps.textarea}
              subTitle={values[0] ? values[0] : "من فضلك اعد ادخال البيانات"}
            />
          </div>
          <div className="flex px-4 gap-6">
            <ReportsTextIcon
              subTitle={values[2] === "1" ? "نعم" : "لا"}
              icon={prev2}
              title={labelProps.selectTitle}
            />
            {values[2] === "1" && (
              <ReportsTextIcon
                subTitle={
                  values[4] ? (
                    <div className="flex gap-2">
                      {values[4]?.map((val) => (
                        <span>{val.name}</span>
                      ))}
                    </div>
                  ) : (
                    "من فضلك اعد ادخال البيانات"
                  )
                }
                icon={prev3}
                title={labelProps.listInputTitle}
              />
            )}
          </div>
          <div className="flex px-4 gap-6 border-b">
            <ReportsTextIcon
              subTitle={fullDate ? fullDate : "من فضلك اعد ادخال البيانات"}
              icon={prev4}
              title={labelProps.datePickerTitle}
            />
            <ReportsTextIcon
              subTitle={values[1] ? values[1] : "من فضلك اعد ادخال البيانات"}
              icon={prev5}
              title={labelProps.locationTitle}
            />
          </div>
          <div className="p-4 py-1">
            <div className="">
              <ReportsTextIcon
                icon={prev9}
                title={"المستندات الداعمة للاشتباه"}
              />
            </div>
            <div className=" ">
              <ReportsTextIcon
                icon={prev6}
                title={`الصور والفيديوهات(${imgs.length}) `}
              />
              <ReportImages imgs={imgs} setImgs={setImgs} />
            </div>
            <div className="pb-4">
              <ReportsTextIcon
                icon={prev7}
                title={`الملفات(${fils.length}) `}
              />
              <ReportFiles fils={fils} setFils={setFils} />
            </div>
          </div>
        </div>
        <div className="border border-gray-300 p-4 rounded-lg mb-6">
          <div className="flex justify-between items-center border-b border-gray-300 pb-4">
            <h2 className="text-xl font-semibold">معلومات الاتصال</h2>
            <img src="../../../src/assets/icons/export.svg" />
          </div>{" "}
          <div className="flex gap-24 items-center">
            <ReportsTextIcon
              subTitle={values[5] ? values[5] : "من فضلك اعد ادخال البيانات"}
              icon={note}
              title={"الاسم"}
            />
            <ReportsTextIcon
              subTitle={values[6] ? values[6] : "من فضلك اعد ادخال البيانات"}
              icon={prev1}
              title={"البريد الالكترونى"}
            />
            <ReportsTextIcon
              subTitle={values[7] ? values[7] : "من فضلك اعد ادخال البيانات"}
              icon={prev8}
              title={"رقم الجوال"}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportsPreview;
