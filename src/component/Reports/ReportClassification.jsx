import { useEffect, useRef, useState } from "react";
import ReportsHeader from "../../custom hooks/ReportsHeader";
import { CardUser } from "../../import";
import { fetchData } from "../../utils/http";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import useApi from "../../utils/useApi";

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
      <div className="px-8 pt-4 py-8">
        <div className="grid mt-4 gap-4 sm:gap-8 md:gap-12 grid-col-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
