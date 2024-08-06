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
import { EyeOutlined } from "@ant-design/icons";
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
  const {
    isLoading,
    error,
    data: { report = {} } = {},
  } = useQuery("users", () => getData(`/reports/${id}`));
  console.log("🚀 ~ Test ~ data:", report);

  const values = Object.values(report);

  console.log(values[9]);
  const [showVideo, setShowVideo] = useState(false);
  const [showImg, setShowImg] = useState(false);
  const [src, setSrc] = useState("false");

  function showFunc(e, type) {
    setSrc(e?.target?.src);
    if (type == "image") {
      setShowImg(true);
    }
    if (type == "video") {
      setShowVideo(true);
    }
  }

  // bg-[#33835C1A]
  return (
    <div className="mt-14 p-4">
      <div className="px-8 border border-gray-300 rounded-md  pt-4">
        <div className="flex p-4 px-0 rounded-xl flex-col gap-6 mb-2">
          <div className="flex gap-2 items-center  rounded-full">
            <div className="h-12 w-12 bg-[#33835C1A] flex items-center justify-center rounded-full">
              <img src="../../../src/assets/icons/export.svg" />
            </div>
            <h2 className="text-lg self-center  font-semibold">تصنيف البلاغ</h2>
          </div>
          <div className="self-start -ml-1 mr-14 flex items-center bg-[#33835C] p-2 gap-2   rounded-lg text-white">
            <span>{values[7]?.name}</span>
          </div>
        </div>
        <div className=" mt-5  mb-6 py-4 rounded-xl">
          <div className="flex   gap-2 items-center  rounded-full">
            <div className="h-12 w-12 bg-[#33835C1A] flex items-center justify-center rounded-full">
              <img src="../../../src/assets/icons/export.svg" />
            </div>
            <h2 className="text-lg self-center  font-semibold">
              تفاصيل البلاغ
            </h2>
          </div>

          <div className="px-2 border rounded-xl pb-3 mt-4  md:mr-8 md:px-4">
            <ReportsTextIcon
              icon={note}
              description={true}
              subTitle={values[2] ? values[2] : "من فضلك اعد ادخال البيانات"}
            />
          </div>
          <div className="grid md:mr-8 grid-cols-1 lg:grid-cols-2  px-2 md:px-4 lg:gap-6">
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
          <div className="grid md:mr-8 grid-cols-1 lg:grid-cols-2  px-2 md:px-4 lg:gap-6">
            <ReportsTextIcon
              subTitle={values[4] === "" ? "لا يوجد" : values[4]}
              icon={prev4}
              title={labelProps.datePickerTitle}
            />
            <ReportsTextIcon
              subTitle={values[5] ? values[5] : "لا يوجد"}
              icon={prev5}
              title={labelProps.locationTitle}
            />
          </div>
          <div className="py-1">
            <div className="flex mt-4  gap-2 items-center  rounded-full">
              <div className="h-12 w-12 bg-[#33835C1A] flex items-center justify-center rounded-full">
                <img src={prev9} />
              </div>
              <h2 className="text-lg self-center  font-semibold">
                المستندات الداعمه للاشتباه
              </h2>
            </div>
            <div className="md:mr-12">
              <ReportsTextIcon
                icon={prev6}
                title={`الصور والفيديوهات(${values[9]?.images?.length}) `}
              />
              <div className="!pr-[53px]">
                <div className="flex mt-4 flex-wrap   gap-6">
                  {values[9]?.images?.map((img, index) => (
                    <div key={Math.random()}>
                      <div className="relative  w-[160px]">
                        {img?.file_type?.startsWith("image") && (
                          <div
                            className="relative wrapper transition-all duration-10000 w-full h-full "
                            style={{ aspectRatio: 16 / 9 }}
                          >
                            <img
                              className="rounded-md object-cover inline-block cursor-pointer w-full h-full "
                              src={img?.file_url}
                              onClick={(e) => {
                                showFunc(e, "image");
                              }}
                              draggable="false"
                            />
                            <span className="active cursor-pointer">
                              <EyeOutlined />
                            </span>
                          </div>
                        )}
                        {img.file_type.startsWith("video") && (
                          <div
                            className="relative wrapper transition-all duration-10000 "
                            style={{ aspectRatio: 16 / 9 }}
                          >
                            <video
                              className="rounded-md object-cover cursor-pointer inline-block h-full w-full"
                              src={img?.file_url}
                              muted
                              onClick={(e) => {
                                showFunc(e, "video");
                              }}
                            />
                            <span className="active cursor-pointer">
                              <EyeOutlined />
                            </span>
                          </div>
                        )}
                      </div>

                      {showImg && (
                        <div
                          className="w-screen h-screen fixed top-0 left-0 z-[1000] flex justify-center items-center bg-[#000000aa]"
                          onClick={() => {
                            setShowImg(false);
                          }}
                        >
                          <div className=" w-[500px] h-full ">
                            <img
                              draggable={false}
                              className="w-full h-full"
                              src={src}
                              style={{ objectFit: "contain" }}
                            />
                          </div>
                        </div>
                      )}
                      {showVideo && (
                        <div
                          className="w-screen h-screen fixed top-0 left-0 z-[1000] flex justify-center items-center bg-[#000000aa]"
                          onClick={() => {
                            setShowVideo(false);
                          }}
                        >
                          <div className="w-1/2">
                            <video
                              className="w-full h-full"
                              src={src}
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
            </div>
            <div className="pb-4 md:mr-12">
              <ReportsTextIcon
                icon={prev7}
                title={`الملفات(${values[9]?.files?.length}) `}
              />
              <div className="flex flex-wrap gap-10 mt-8 !pr-[53px]">
                {values[9]?.files?.map((file, index) => (
                  <div
                    onClick={() => {
                      window.open(file.file_url, "_blank");
                    }}
                    className="relative cursor-pointer"
                  >
                    <div className="flex items-center gap-4 bg-[#DC60651A] p-2 px-4 rounded-md border border-[#D74D5224]">
                      <div className="text-left">
                        <h2
                          className="font-bold text-[#D74D52] w-[120px] text-nowrap overflow-hidden text-ellipsis "
                          style={{ direction: "ltr" }}
                        >
                          {file?.file_name?.length > 50
                            ? "..." + file.file_name.slice(0, 20)
                            : file.file_name}
                        </h2>
                        <span className="text-sm text-gray-400">
                          {Math.ceil(file.file_size * Math.pow(10, -6))}
                          <span className="ml-1">mb</span>
                        </span>
                      </div>

                      <img
                        className="rounded-md w-[20px]"
                        src={`../src/assets/${
                          file.file_mimes_type.includes("pdf")
                            ? "pdf.png"
                            : "doc.svg"
                        }`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="p-4  mb-6">
          <div className="flex   gap-2 items-center  rounded-full">
            <div className="h-12 w-12 bg-[#33835C1A] flex items-center justify-center rounded-full">
              <img src="../../../src/assets/icons/export.svg" />
            </div>
            <h2 className="text-lg self-center  font-semibold">
              {" "}
              معلومات الاتصال
            </h2>
          </div>
          <div className="grid grid-cols-1  md:grid-cols-2 xl:grid-cols-3 md:-ml-1 md:mr-12 mt-2 xl:gap-24 items-center">
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
