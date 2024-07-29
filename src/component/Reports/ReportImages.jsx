import React, { useState } from "react";
import VideoDisplay from "../../models/VideoDisplay";

const ReportImages = ({ imgs, setImgs, preview }) => {
  const handleDeleteImages = (id) => {
    const images = [...imgs];
    images.splice(id, 1);
    setImgs(images);
  };

  const [showVideo, setShowVideo] = useState(false);
  return (
    <>
      <div className="flex mt-4   gap-6">
        {imgs?.map((img, index) => (
          <div key={Math.random()}>
            <div className=" relative h-[120px] w-[150]">
              {preview && (
                <span
                  onClick={() => handleDeleteImages(index)}
                  className="absolute cursor-pointer -left-2 -top-1 w-4 h-4 bg-green-500 text-white rounded-full flex items-center justify-center"
                >
                  &times;
                </span>
              )}
              {img?.type?.startsWith("image") ||
                (img?.file_type?.startsWith("image") && (
                  <img
                    className="rounded-md w-full h-full"
                    src={URL?.createObjectURL(img) || img?.file_url}
                  />
                ))}
              {img.type.startsWith("video") && (
                <>
                  <video
                    className="w-full h-full "
                    src={URL.createObjectURL(img) || img?.file_url}
                    muted
                    onClick={() => {
                      setShowVideo(true);
                    }}
                  />

                  {/* <VideoDisplay src={URL.createObjectURL(img)} /> */}
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
                    src={URL.createObjectURL(img)}
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
