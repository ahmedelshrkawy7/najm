import React, { useEffect, useRef, useState } from "react";
import VideoDisplay from "../../models/VideoDisplay";
import prev6 from "../../assets/icons/prev6.svg";

import {
  EyeOutlined,
  CloseCircleOutlined,
  CloseOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
const ReportImages = ({ imgs, setImgs, preview, videos, setVideos }) => {
  console.log("🚀 ~ ReportImages ~ imgs:", imgs);
  // let photos = imgs?.filter((el) => {
  //   return el?.file_type?.includes("image") || el?.type?.includes("image");
  // });
  // let videos = imgs?.filter((el) => {
  //   return el?.file_type?.includes("video") || el?.type?.includes("video");
  // });
  console.log(videos);
  const handleDeleteImages = (id) => {
    const images = [...imgs];
    images.splice(id, 1);
    setImgs(images);
  };
  const handleDeleteVideos = (id) => {
    const images = [...videos];
    images.splice(id, 1);
    setVideos(images);
  };

  const myImage = useRef();
  const [showVideo, setShowVideo] = useState(false);
  const [showImg, setShowImg] = useState(false);
  const [imgSrc, setSrc] = useState("false");
  const [videoSrc, setVideoSrc] = useState("");
  function showFunc(index, type) {
    if (type == "image") {
      setShowImg(true);
      setSrc(imgs[index]);
    }
    if (type == "video") {
      setShowVideo(true);
      setVideoSrc(videos[index]);
    }
  }

  console.log(imgs, videos);
  return (
    <>
      {!!imgs?.length > 0 && (
        <>
          <div
            className={`flex mb-4 flex-col  
       mt-4 gap-1`}
          >
            <div className="flex items-center gap-4 ">
              <div className=" rounded-full   h-12  flex items-center justify-center">
                <img src={prev6} />
              </div>

              <span className="font-medium !min-w-[100px]">
                الصور ( {imgs.length} )
              </span>
            </div>
          </div>

          <div className="flex flex-wrap mt-4  gap-6">
            {imgs.map((img, index) => (
              <div key={Math.random()}>
                {!img && <p>Loading</p>}
                <div className=" relative h-full w-[220px] ">
                  {preview && (
                    <div
                      onClick={() => handleDeleteImages(img.name)}
                      className="absolute cursor-pointer w-5 h-5 -left-2 -top-1  text-white rounded-full flex items-center justify-center z-50 bg-green-700 "
                    >
                      <span className=" font-bold  -mt-[3px] text-[20px] ">
                        &times;
                      </span>
                    </div>
                  )}
                  {
                    <div
                      className="relative wrapper transition-all duration-1000 h-full border border-gray-300 rounded-md "
                      style={{ aspectRatio: 16 / 9 }}
                    >
                      <img
                        className="rounded-md object-cover cursor-pointer  w-full h-full"
                        src={
                          img.file_url ? img.file_url : URL.createObjectURL(img)
                        }
                        ref={myImage}
                        draggable="false"
                      />

                      <div
                        className="active cursor-pointer h-full w-full bg-[#000] "
                        onClick={() => {
                          showFunc(index, "image");
                        }}
                      >
                        <EyeOutlined
                          className="z-10 text-white text-[20px]"
                          style={{ zIndex: 99 }}
                        />
                      </div>
                      <div className="absolute top-2 right-2 w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center z-[999]">
                        <a
                          href={
                            img.file_urls
                              ? img?.file_url
                              : URL.createObjectURL(new Blob([img]))
                          }
                          download={`image-${img?.file_name || img?.name}.jpg`}
                        >
                          <DownloadOutlined className="text-white text-[16px]" />
                        </a>
                      </div>
                    </div>
                  }
                </div>

                {showImg && (
                  <div className="w-screen h-screen fixed top-0 left-0 z-[1000] flex justify-center items-center !bg-black/50">
                    <div className="relative  w-1/2 flex justify-center items-center scale-75">
                      <img
                        draggable={false}
                        className="object-contain "
                        src={
                          imgSrc?.file_url
                            ? imgSrc?.file_url
                            : URL.createObjectURL(imgSrc)
                        }
                        style={{ objectFit: "contain" }}
                      />

                      <div
                        className="absolute cursor-pointer  -top-7 -left-5 w-7 h-7 text-white bg-[#33835C] rounded-full font-semibold flex justify-center items-center"
                        onClick={() => {
                          setShowImg(false);
                        }}
                      >
                        <span className="-mt-[2px] text-[25px] ">&times;</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
            <div
              className={`flex mb-4 flex-col  
       mt-4 gap-2`}
            ></div>{" "}
          </div>
        </>
      )}
      {!!videos?.length > 0 && (
        <>
          <div className="flex items-center gap-2 ">
            <div className=" rounded-full   h-12  flex items-center justify-center">
              <img src={prev6} />
            </div>

            <span className="font-medium !min-w-[100px]">
              الفيديو ( {videos.length} )
            </span>
          </div>

          <div className="flex flex-wrap mt-4  gap-6">
            {videos.map((img, index) => {
              console.log(img);
              return (
                <div key={Math.random()}>
                  {!img && <p>Loading</p>}
                  <div className=" relative h-full w-[220px] ">
                    <>
                      {preview && (
                        <div
                          onClick={() => handleDeleteVideos(img.name)}
                          className="absolute cursor-pointer w-5 h-5 -left-2 -top-1  text-white rounded-full flex items-center justify-center z-50 bg-green-700 "
                        >
                          <span className=" font-bold  -mt-[3px] text-[20px] ">
                            &times;
                          </span>
                        </div>
                      )}
                      <div
                        className="relative wrapper transition-all duration-1000 h-full  border border-gray-300"
                        style={{ aspectRatio: 16 / 9 }}
                      >
                        <video
                          className="rounded-md object-cover cursor-pointer inline-block w-full h-full"
                          src={img?.file_url || URL?.createObjectURL(img)}
                          muted
                          // poster={img?.type.startsWith("audio") ? prev6 : ""}
                        />
                        <span
                          className="active cursor-pointer"
                          onClick={() => {
                            showFunc(index, "video");
                          }}
                        >
                          <EyeOutlined className="text-[20px] text-white" />
                        </span>
                      </div>
                      <div className="absolute top-2 right-2 w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center z-[999]">
                        <a
                          href={
                            img?.file_urls
                              ? img?.file_url
                              : URL.createObjectURL(new Blob([img]))
                          }
                          download={`image-${img?.file_name || img?.name}.jpg`}
                        >
                          <DownloadOutlined className="text-white text-[16px]" />
                        </a>
                      </div>
                    </>
                  </div>
                  {showVideo && (
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
                          src={
                            videoSrc?.file_url
                              ? videoSrc?.file_url
                              : URL.createObjectURL(videoSrc)
                          }
                          muted
                          controls
                        />
                      </div>
                    </div>
                  )}
                  {/* {showImg && (
                  <div className="w-screen h-screen fixed top-0 left-0 z-[1000] flex justify-center items-center !bg-black/50">
                    <div className="relative  w-1/2 flex justify-center items-center scale-75">
                      <img
                        draggable={false}
                        className="object-contain "
                        src={src?.file_url || URL.createObjectURL(src)}
                        style={{ objectFit: "contain" }}
                      />

                      <div
                        className="absolute cursor-pointer  -top-7 -left-5 w-7 h-7 text-white bg-[#33835C] rounded-full font-semibold flex justify-center items-center"
                        onClick={() => {
                          setShowImg(false);
                        }}
                      >
                        <span className="-mt-[2px] text-[25px] ">&times;</span>
                      </div>
                    </div>
                  </div>
                )}
                {showVideo && (
                  <div className="w-screen h-screen fixed top-0 left-0 z-[1000] flex justify-center items-center bg-black/50">
                    <div className=" h-1/2 relative">
                      <div className="cursor-pointer">
                        <div
                          className="absolute cursor-pointer  -top-4 -left-3 w-6 h-6 text-white bg-[#33835C] rounded-full font-semibold flex justify-center items-center z-50"
                          onClick={() => {
                            setShowVideo(false);
                          }}
                        >
                          <span className="-mt-[2px] text-[20px]">&times;</span>
                        </div>
                      </div>
                      <video
                        className="w-full h-full"
                        src={src?.file_url || URL.createObjectURL(src)}
                        muted
                        controls
                      />
                    </div>
                  </div>
                )} */}
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

export default React.memo(ReportImages);
