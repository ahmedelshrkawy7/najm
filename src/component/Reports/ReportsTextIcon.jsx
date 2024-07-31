
const ReportsTextIcon = ({ icon, title, subTitle }) => {
  return (
    <div className="flex items-center my-6 gap-2">
      <div className="w-12 rounded-full h-12 bg-[#33835C1A] flex items-center justify-center">
        <img src={icon} />
      </div>
      <span className="font-medium">{title}</span>
      <span>{subTitle}</span>
    </div>
  );
};

export default ReportsTextIcon;
