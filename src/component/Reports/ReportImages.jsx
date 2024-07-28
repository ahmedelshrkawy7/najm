import React from "react";

const ReportImages = ({ imgs, setImgs, preview }) => {
  const handleDeleteImages = (id) => {
    const images = [...imgs];
    images.splice(id, 1);
    setImgs(images);
  };
  return (
    <>
      <div className="flex mt-4 gap-6">
        {imgs?.map((img, index) => (
          <div className="relative h-[120px] w-[137px]">
            {preview && (
              <span
                onClick={() => handleDeleteImages(index)}
                className="absolute cursor-pointer -left-2 -top-1 w-4 h-4 bg-white text-red-500 rounded-full flex items-center justify-center"
              >
                X
              </span>
            )}
            <img className="rounded-md" src={URL.createObjectURL(img)} />
          </div>
        ))}
      </div>
    </>
  );
};

export default ReportImages;
