import React, { useState } from "react";
import VideoDisplay from "../../models/VideoDisplay";
import { EyeOutlined } from "@ant-design/icons";
const ReportImages = ({ imgs, setImgs, preview }) => {
  const handleDeleteImages = (id) => {
    const images = [...imgs];
    images.splice(id, 1);
    setImgs(images);
  };

  console.log(imgs);

  const [showVideo, setShowVideo] = useState(false);
  const [showImg, setShowImg] = useState(false);
  const [src, setSrc] = useState("false");

  function showFunc(e, type) {
    setSrc(e?.target?.src);
    console.log(e?.target?.src);
    if (type == "image") {
      setShowImg(true);
    }
    if (type == "video") {
      setShowVideo(true);
    }
  }
  return (
    <>
      <div className="flex flex-wrap mt-4 h-[120px] gap-6">
        {imgs.map((img, index) => (
          <div key={Math.random()}>
            <div className=" relative h-full w-[220px] ">
              {preview && (
                <span
                  onClick={() => handleDeleteImages(index)}
                  className="absolute cursor-pointer -left-2 -top-1 w-4 h-4 bg-green-500 text-white rounded-full flex items-center justify-center z-50"
                >
                  &times;
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
              {img?.type.startsWith("video") && (
                <div className="relative wrapper transition-all duration-1000 h-full ">
                  <video
                    className="rounded-md object-cover cursor-pointer inline-block w-full h-full"
                    src={URL.createObjectURL(img)}
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
                <div className=" w-1/2 ">
                  <video className="w-full h-full" src={src} muted controls />
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
