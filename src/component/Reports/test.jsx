import { useParams } from "react-router-dom";
import useApi from "../../utils/useApi";
import { useQuery } from "react-query";
import ReportsTextIcon from "./ReportsTextIcon";
import ReportImages from "./ReportImages";
import ReportFiles from "./ReportFiles";
import ReportsHeader from "../../custom hooks/ReportsHeader";
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
import { useState } from "react";

const labelProps = {
  textarea: "وصف البلاغ",
  selectTitle: "هل انت على علم باسماء المشتبه بهم؟",
  listInputTitle: "أسماء الاشخاص المشتبه بهم",
  datePickerTitle: "تاريخ ارتكاب المخالفة",
  locationTitle: "مكان حدوث المخالفة",
};
const Test = () => {
  const { getData } = useApi();
  const { id } = useParams();
  const [showVideo, setShowVideo] = useState(false);
  const {
    isLoading,
    error,
    data: { report = {} } = {},
  } = useQuery("users", () => getData(`/reports/${id}`));
  console.log("🚀 ~ Test ~ data:", report);

  const values = Object.values(report);

  console.log(values[9]);

  return (
    <div className="mt-14">
      <div className="px-8 pt-4">
        <div className="flex border border-gray-300 p-4 rounded-xl flex-col gap-6 mb-2">
          <div className="flex justify-between items-center border-b border-gray-300 pb-4">
            <h2 className="text-xl font-semibold">تصنيف البلاغ</h2>
            <img src="../../../src/assets/icons/export.svg" />
          </div>
          <button className="self-start bg-[#33835C] p-4 px-5 mb-4 rounded-lg text-white">
            {values[7]?.name}
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
              subTitle={values[2] ? values[2] : "من فضلك اعد ادخال البيانات"}
            />
          </div>
          <div className="flex px-4 gap-6">
            <ReportsTextIcon
              subTitle={values[3] === true ? "نعم" : "لا"}
              icon={prev2}
              title={labelProps.selectTitle}
            />
            {values[3] === true && (
              <ReportsTextIcon
                subTitle={
                  values[8] ? (
                    <div className="flex gap-2">
                      {values[8]?.map((val) => (
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
              subTitle={values[4] ? values[4] : "من فضلك اعد ادخال البيانات"}
              icon={prev4}
              title={labelProps.datePickerTitle}
            />
            <ReportsTextIcon
              subTitle={values[5] ? values[5] : "من فضلك اعد ادخال البيانات"}
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
                title={`الصور والفيديوهات(${values[9]?.length}) `}
              />

              <div className="flex mt-4   gap-6">
                {values[9]?.map((img, index) => (
                  <div key={Math.random()}>
                    <div className=" relative h-[120px] w-[150]">
                      {img?.file_type?.startsWith("image") && (
                        <img
                          className="rounded-md w-full h-full"
                          src={img?.file_url}
                        />
                      )}
                      {img.file_type.startsWith("video") && (
                        <>
                          <video
                            className="w-full h-full "
                            src={img?.file_url}
                            muted
                            onClick={() => {
                              setShowVideo(true);
                            }}
                          />
                        </>
                      )}
                    </div>
                    {showVideo && (
                      <div
                        className="w-screen h-screen fixed top-0 left-0 z-[1000] flex justify-center items-center bg-[#000000aa]"
                        onClick={() => {
                          setShowVideo(false);
                        }}
                      >
                        <div className=" w-1/2 ">
                          <video
                            className="w-full h-full  "
                            src={img?.file_url}
                            muted
                            controls
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="pb-4">
              {/* <ReportsTextIcon
                icon={prev7}
                title={`الملفات(${fils.length}) `}
              /> */}
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
              subTitle={
                values[6] ? values[6].name : "من فضلك اعد ادخال البيانات"
              }
              icon={note}
              title={"الاسم"}
            />
            <ReportsTextIcon
              subTitle={
                values[6] ? values[6].email : "من فضلك اعد ادخال البيانات"
              }
              icon={prev1}
              title={"البريد الالكترونى"}
            />
            <ReportsTextIcon
              subTitle={
                values[6] ? values[6].phone : "من فضلك اعد ادخال البيانات"
              }
              icon={prev8}
              title={"رقم الجوال"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test;
