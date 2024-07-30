import { useEffect, useRef, useState } from "react";
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

const ReportClassification = ({ _card, handleSelected }) => {
  const { getData } = useApi();
  const { isLoading, error, data } = useQuery("users", () =>
    getData("/report-classification")
  );

  console.log(data, _card);

 

  return (
    <>
      <ReportsHeader
        subTitle={"يرجى تحديد احدى الخيارات الاتية"}
        title="تصنيف البلاغ"
      />
      <div className="px-8 pt-4">
        <div
          className="grid mt-4 gap-4 sm:gap-8 md:gap-12 grid-col-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          {data?.report_classification?.map((card) => (
            <CardUser
              onClick={() =>
                handleSelected({
                  name: card.name,
                  report_classification_id: card.id,
                })
              }
              key={card.title}
              active={_card.report_classification_id === card.id}
              title={card.name}
              src={card.image_url}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ReportClassification;
