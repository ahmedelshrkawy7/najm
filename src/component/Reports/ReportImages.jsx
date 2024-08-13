import React, { useRef, useState } from "react";
import VideoDisplay from "../../models/VideoDisplay";
import {
  EyeOutlined,
  CloseCircleOutlined,
  CloseOutlined,
} from "@ant-design/icons";
const ReportImages = ({ imgs, setImgs, preview }) => {
  console.log("🚀 ~ ReportImages ~ imgs:", imgs);
  const handleDeleteImages = (id) => {
    const images = [...imgs];
    images.splice(id, 1);
    setImgs(images);
  };

  console.log(imgs);
  const myImage = useRef();

  const [showVideo, setShowVideo] = useState(false);
  const [showImg, setShowImg] = useState(false);
  const [src, setSrc] = useState("false");

  function showFunc(index, type) {
    setSrc(imgs[index]);
    if (type == "image") {
      setShowImg(true);
    }
    if (type == "video") {
      setShowVideo(true);
    }
  }
  return (
    <>
      <div className="flex flex-wrap mt-4  gap-6">
        {imgs.map((img, index) => (
          <div key={Math.random()}>
            {!img && <p>Loading</p>}
            <div className=" relative h-full w-[220px] ">
              {preview && (
                <span
                  onClick={() => handleDeleteImages(index)}
                  className="absolute cursor-pointer w-2 p-2 h-1 -left-2 -top-1 text-center  text-white rounded-full flex items-center justify-center z-50"
                >
                  <span className="-mt-[2px] text-[12px] font-bold ">
                    <CloseOutlined
                      style={{ fontWeight: 700, strokeWidth: 2 }}
                      className="font-bold"
                    />
                  </span>
                </span>
              )}
              {img?.type.startsWith("image") && (
                <div
                  className="relative wrapper transition-all duration-1000 h-full "
                  style={{ aspectRatio: 16 / 9 }}
                >
                  <img
                    className="rounded-md object-cover cursor-pointer  w-full h-full"
                    src={URL?.createObjectURL(img)}
                    ref={myImage}
                    draggable="false"
                  />

                  <div
                    className="active cursor-pointer h-full w-full bg-[#000] "
                    onClick={() => {
                      showFunc(index, "image");
                    }}
                  >
                    <EyeOutlined className="z-10" style={{ zIndex: 99 }} />
                  </div>
                </div>
              )}
              {img?.type.startsWith("video") && (
                <div
                  className="relative wrapper transition-all duration-1000 h-full"
                  style={{ aspectRatio: 16 / 9 }}
                >
                  <video
                    className="rounded-md object-cover cursor-pointer inline-block w-full h-full"
                    src={URL.createObjectURL(img)}
                    muted
                  />
                  <span
                    className="active cursor-pointer"
                    onClick={() => {
                      showFunc(index, "video");
                    }}
                  >
                    <EyeOutlined />
                  </span>
                </div>
              )}
            </div>
            {showImg && (
              <div className="w-screen h-screen fixed top-0 left-0 z-[1000] flex justify-center items-center bg-[#000000aa]">
                <div className=" w-[500px] h-full relative ">
                  <div className="cursor-pointer">
                    <div
                      className="absolute cursor-pointer  top-[135px] -right-2 w-5 h-5 text-white bg-[#33835C] rounded-full font-semibold flex justify-center items-center"
                      onClick={() => {
                        setShowImg(false);
                      }}
                    >
                      <span className="-mt-[2px]">
                        {" "}
                        <CloseCircleOutlined />
                      </span>
                    </div>
                  </div>
                  <img
                    draggable={false}
                    className="w-full h-full"
                    src={URL.createObjectURL(src)}
                    style={{ objectFit: "contain" }}
                  />
                </div>
              </div>
            )}
            {showVideo && (
              <div className="w-screen h-screen fixed top-0 left-0 z-[1000] flex justify-center items-center bg-[#000000aa]">
                <div className="w-1/2 relative">
                  <div className="cursor-pointer">
                    <div
                      className="absolute cursor-pointer  -top-2 -right-2 w-5 h-5 text-white bg-[#33835C] rounded-full font-semibold flex justify-center items-center"
                      onClick={() => {
                        setShowVideo(false);
                      }}
                    >
                      <span className="-mt-[2px]">
                        <CloseCircleOutlined />
                      </span>
                    </div>
                  </div>
                  <video
                    className="w-full h-full"
                    src={URL.createObjectURL(src)}
                    muted
                    controls
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default ReportImages;
