import React from "react";

const ReportsTextIcon = ({ icon, title, subTitle, description }) => {
  return (
    <div
      className={`flex ${
        description === true && "flex-col !items-start"
      }   items-center mt-4 gap-2`}
    >
      {!description && (
        <div className="w-12 rounded-full h-12 bg-[#33835C1A] flex items-center justify-center">
          <img src={icon} />
        </div>
      )}
      <span className="font-medium">{title}</span>
      {subTitle && <span className="max-h-96 overflow-auto">{subTitle}</span>}
    </div>
  );
};

export default ReportsTextIcon;
