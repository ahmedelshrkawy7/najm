import { useEffect, useState } from "react";
import ReportsHeader from "../../custom hooks/ReportsHeader";
import { CardUser } from "../../import";
import { fetchData } from "../../utils/http";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import useApi from "../../utils/useApi";

// const CARDS = [
//   {
//     icon: <img src="../src/assets/icons/money-3.svg" />,
//     title: "احتيال او فساد او رشوة او اخنلاس او تزوير",
//   },
//   {
//     icon: <img src="../src/assets/icons/coin.png" />,
//     title: "غسل اموال او تمويل ارهاب ",
//   },
//   {
//     icon: <img src="../src/assets/icons/receipt-item.png" />,
//     title: "مخالفة للانظمة والتعليمات",
//   },
//   {
//     icon: <img src="../src/assets/icons/receipt.png" />,
//     title: "مخالفة لسياسة واجراءات الشركة",
//   },
//   {
//     icon: <img src="../src/assets/icons/Vector.svg" />,
//     title: "مخالفة لمدونة قواعد السلوك",
//   },
// ];

const ReportClassification = ({ title, handleSelected }) => {
  const [classifications, setlassifications] = useState([]);
  const { getData } = useApi();

  const { isLoading, error, data } = useQuery("users", () =>
    getData("/report-classification")
  );
  console.log("🚀 ~ ReportClassification ~ data:", data?.report_classification);

  return (
    <>
      <ReportsHeader
        subTitle={"يرجى تحديد احدى الخيارات الاتية"}
        title="تصنيف البلاغ"
      />
      <div className="p-8">
        <div className="grid mt-4 gap-4 sm:gap-8 md:gap-12 grid-col-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {data?.report_classification?.map((card) => (
            <CardUser
              onClick={() => handleSelected(card.name)}
              key={card.title}
              active={title === card.name}
              name={card.name}
              src={card.image_url}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ReportClassification;
