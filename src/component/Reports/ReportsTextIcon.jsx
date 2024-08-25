
const ReportsTextIcon = ({ icon, title, subTitle, description, bottom }) => {
  return (
    <div
      className={`flex mb-4 flex-col  ${
        description === true && "flex-col !items-start"
      }   mt-4 gap-2`}
    >
      <div className="flex items-center gap-2">
        {!description && (
          <div className="w-12 rounded-full  !min-w-[50px] h-12 bg-[#33835C1A] flex items-center justify-center">
            <img src={icon} />
          </div>
        )}
        <span className="font-medium !min-w-[100px]">{title}</span>
      </div>

      {subTitle && (
        <span
          className={`mr-14 ${description && "!mr-2 sm:!mr-12 text-justify"}`}
        >
          {subTitle}
        </span>
      )}
    </div>
  );
};

export default ReportsTextIcon;
