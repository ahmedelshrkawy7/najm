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
<<<<<<< HEAD
import { EyeOutlined, PhoneOutlined, NumberOutlined } from "@ant-design/icons";
import { useState } from "react";
import NotFound from "../../NotFound";
=======
import { EyeOutlined, NumberOutlined, PhoneOutlined } from "@ant-design/icons";
import { useState } from "react";
import { UserOutlined, ContainerOutlined } from "@ant-design/icons";
>>>>>>> be7af2d7b91c5769345ab15712a600fdedf031bb

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
    data: { data: { report } = {} } = {},
  } = useQuery(["users", ["/reports"], id], getData);

  // console.log(id);
  console.log(report);

  const values = Object.values(report ?? {});
  console.log(values);

  const [showVideo, setShowVideo] = useState(false);
  const [showImg, setShowImg] = useState(false);
  const [src, setSrc] = useState("");

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-80px)]">
        <div className="loader"></div>;
      </div>
    );
  }

  if (!report) {
    return (
      <>
        <NotFound msg={"البلاغ غير موجود"} />
      </>
    );
  }

  const photos = values[9]?.images?.filter((img) =>
    img.file_type?.startsWith("image")
  );
  const videos = values[9]?.images?.filter((img) =>
    img.file_type?.startsWith("video")
  );

  function showFunc(type, src) {
    setSrc(src);
    if (type == "image") {
      setShowImg(true);
    }
    if (type == "video") {
      setShowVideo(true);
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-80px)]">
        <div className="loader"></div>;
      </div>
    );
  }

  if (!report) {
    return (
      <>
        <NotFound msg={"البلاغ غير موجود"} />
      </>
    );
  }

  // bg-[#33835C1A]
  return (
<<<<<<< HEAD
    <>
      <div className="mt-14 p-4">
        <div className="px-8 border border-gray-300 rounded-md  pt-4">
          <div className="flex gap-2 items-center  rounded-full pb-3">
=======
    <div className="mt-14 p-4">
      <div className="px-8 border border-gray-300 rounded-md  pt-4">
        <div className="border p-4 rounded-md border-gray-300">
          <div className="flex gap-2  items-center justify-end  rounded-full pb-3">
>>>>>>> be7af2d7b91c5769345ab15712a600fdedf031bb
            <div className="h-12 w-12 bg-[#33835C1A] text-[#33835C] flex items-center justify-center rounded-full">
              <NumberOutlined />
            </div>
            <h2 className="text-lg self-center  font-semibold">
              رقم البلاغ {values[0]}
            </h2>
          </div>
          <div className="flex p-4 px-0 rounded-xl flex-col gap-6 mb-2">
            <div className="flex gap-2 items-center  rounded-full">
              <div className="h-12 w-12 bg-[#33835C1A] flex items-center justify-center rounded-full">
                <img src="../../../src/assets/icons/export.svg" />
              </div>
              <h2 className="text-lg self-center  font-semibold">
                تصنيف البلاغ
<<<<<<< HEAD
              </h2>
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
                  <div className="flex mt-4    gap-6">
                    {values[9]?.images?.map((img, index) => (
                      <div key={Math.random()}>
                        <div className="relative h-[120px] w-[160px]">
                          {img?.file_type?.startsWith("image") && (
                            <div className="relative wrapper transition-all duration-10000 ">
                              <img
                                className="rounded-md object-cover inline-block cursor-pointer  w-full h-full"
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
                            <div className="relative wrapper transition-all duration-10000 ">
                              <video
                                className="rounded-md object-cover cursor-pointer inline-block w-full h-[140px]"
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
                <div className="flex gap-10 mt-8">
                  {values[9]?.files?.map((file, index) => (
                    <div
                      onClick={() => {
                        window.open(file.file_url, "_blank");
                      }}
                      className="relative cursor-pointer"
                    >
                      <div className="flex items-center gap-4 bg-[#DC60651A] p-2 px-4 rounded-md border border-[#D74D5224]">
                        <div className="text-left">
                          <h2 className="font-bold text-[#D74D52]">
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
                {/* <img src="../../../src/assets/icons/export.svg" /> */}
                <PhoneOutlined className="text-[#33835C]" />
=======
              </h2>
            </div>
            <div className="self-start  -ml-1 mr-14 flex items-center bg-[#33835C] p-10 px-8 gap-2   rounded-lg text-white">
              <div className="bg-white rounded-full flex p-2 justify-center items-center w-8 h-8">
                <img
                  className="w-full h-full"
                  src="../../src/assets/icons/money-3.svg"
                />
              </div>
              <span>{values[7]?.name}</span>
            </div>
          </div>
          <div className=" mt-5  mb-6 py-4 rounded-xl">
            <div className="flex   gap-2 items-center  rounded-full">
              <div className="h-12 w-12 bg-[#33835C1A] flex items-center justify-center rounded-full">
                <ContainerOutlined className="text-[#33835C]" />
              </div>
              <h2 className="text-lg self-center  font-semibold">
                تفاصيل البلاغ
              </h2>
            </div>

            <div className="border border-gray-200 text-wrap rounded-xl pb-3 mt-4 pl-[42px] mr-9">
              <ReportsTextIcon
                icon={note}
                description={true}
                subTitle={values[2] ? values[2] : "من فضلك اعد ادخال البيانات"}
              />
            </div>
            <div className="md:mr-8  px-2 md:px-4 ">
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
            <div className="md:mr-8   px-2 md:px-4">
              <ReportsTextIcon
                subTitle={values[3] === true ? "نعم" : "لا"}
                icon={prev2}
                title={labelProps.selectTitle}
              />
              {values[3] === true && (
                <ReportsTextIcon
                  bottom={true}
                  subTitle={
                    values[8] ? (
                      <div className="flex max-h-[260px] scrollbar scrollbar-w-2 scrollbar-thumb-[#33835c] scrollbar-thumb-rounded-full  overflow-x-scroll gap-2 flex-wrap">
                        {values[8]?.map((val) => (
                          <div className="tag flex items-center">
                            <h3 className="flex items-center">{val.name}</h3>
                            <button className="cursor-default">
                              <UserOutlined />
                            </button>
                          </div>
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
          </div>
        </div>
        <div className="border border-gray-300 py-1 my-8 rounded-lg px-4">
          <div className="flex mt-4  gap-2 items-center  rounded-full">
            <div className="h-12 w-12 bg-[#33835C1A] flex items-center justify-center rounded-full">
              <img src={prev9} />
            </div>
            <h2 className="text-lg self-center  font-semibold">
              المستندات الداعمه للاشتباه
            </h2>
          </div>
          <div className="md:mr-12">
            <div className="flex items-center gap-4 mt-4">
              <div className=" rounded-full   h-12  flex items-center justify-center">
                <img src={prev6} />
              </div>
              <span className="font-medium !min-w-[100px]">
                الصور ( {photos.length} )
              </span>
            </div>
            <div className="!pr-[53px]">
              <div className="flex mt-4 flex-wrap   gap-6">
                {photos.map((img, index) => (
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
                            draggable="false"
                          />

                          <div
                            className="active cursor-pointer h-full w-full bg-[#000] "
                            onClick={() => {
                              showFunc("image", img?.file_url);
                            }}
                          >
                            <EyeOutlined
                              className="z-10 text-white text-[20px]"
                              style={{ zIndex: 99 }}
                            />
                          </div>
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
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="md:mr-12">
            <div className="flex items-center gap-4 mt-4">
              <div className=" rounded-full   h-12  flex items-center justify-center">
                <img src={prev6} />
              </div>
              <span className="font-medium !min-w-[100px]">
                الفيديو ( {videos.length} )
              </span>
            </div>
            <div className="!pr-[53px]">
              <div className="flex mt-4 flex-wrap   gap-6">
                {videos.map((img, index) => (
                  <div key={Math.random()}>
                    <div className="relative  w-[160px]">
                      {img?.file_type?.startsWith("video") && (
                        <div
                          className="relative wrapper transition-all duration-10000 w-full h-full "
                          style={{ aspectRatio: 16 / 9 }}
                        >
                          <video
                            className="rounded-md object-cover cursor-pointer inline-block w-full h-full"
                            src={img?.file_url}
                            muted
                          />
                          <div
                            className="active cursor-pointer h-full w-full bg-[#000] "
                            onClick={() => {
                              showFunc("video", img?.file_url);
                            }}
                          >
                            <EyeOutlined
                              className="z-10 text-white text-[20px]"
                              style={{ zIndex: 99 }}
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {showVideo && (
                      <>
                        <div className="w-screen h-screen fixed top-0 left-0 z-[1000] flex justify-center items-center bg-black/50">
                          <div className=" h-1/2 relative">
                            <div className="cursor-pointer">
                              <div
                                className="absolute cursor-pointer  -top-4 -left-3 w-6 h-6 text-white bg-[#33835C] rounded-full font-semibold flex justify-center items-center"
                                onClick={() => {
                                  setShowVideo(false);
                                }}
                              >
                                <span className="-mt-[2px] text-[20px]">
                                  &times;
                                </span>
                              </div>
                            </div>
                            <video
                              className="w-full h-full"
                              src={src}
                              muted
                              controls
                            />
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="pb-4 md:msr-12">
              <div className="flex items-center gap-2 ">
                <div className=" rounded-full   h-12  flex items-center justify-center">
                  <img src={prev7} />
                </div>

                <span className="font-medium !min-w-[100px]">
                  الملفات ( {values[9]?.files.length} )
                </span>
              </div>
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
>>>>>>> be7af2d7b91c5769345ab15712a600fdedf031bb
              </div>
              <h2 className="text-lg self-center  font-semibold">
                {" "}
                معلومات الاتصال
              </h2>
            </div>
<<<<<<< HEAD
=======
          </div>

          <div className="border border-gray-300 rounded-lg mb-6 mt-4 p-4">
            <div className="flex   gap-2 items-center  rounded-full">
              <div className="h-12 w-12 bg-[#33835C1A] flex items-center justify-center rounded-full">
                <PhoneOutlined className="text-[#33835C]" />
              </div>
              <h2 className="text-lg self-center  font-semibold">
                {" "}
                معلومات الاتصال
              </h2>
            </div>
>>>>>>> be7af2d7b91c5769345ab15712a600fdedf031bb
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
    </>
  );
};

export default Test;
