import { useContext, useEffect, useState } from "react";
import ReportsHeader from "../../custom hooks/ReportsHeader";
import { CardUser } from "../../import";
import UserContext from "../../store/UserContext";
import { fetchData } from "../../utils/http";

const CARDS = [
  {
    icon: <img src="../src/assets/icons/money-3.svg" />,
    title: "احتيال او فساد او رشوة او اخنلاس او تزوير",
  },
  {
    icon: <img src="../src/assets/icons/coin.png" />,
    title: "غسل اموال او تمويل ارهاب ",
  },
  {
    icon: <img src="../src/assets/icons/receipt-item.png" />,
    title: "مخالفة للانظمة والتعليمات",
  },
  {
    icon: <img src="../src/assets/icons/receipt.png" />,
    title: "مخالفة لسياسة واجراءات الشركة",
  },
  {
    icon: <img src="../src/assets/icons/Vector.svg" />,
    title: "مخالفة لمدونة قواعد السلوك",
  },
];

const ReportClassification = ({ title, handleSelected }) => {
  // const {userData,addUserData} = useContext(UserContext);
  // onChangeData({...data,title:data.title})
  const [cards, setCards] = useState([]);
  const fetchCardsData = async () => {
    const cardsData = await fetchData(
      "https://najm.alexondev.net/api/report-classification"
    );
    setCards(cardsData.data["report_classification"]);
  };
  useEffect(() => {
    fetchCardsData();
  }, []);
  return (
    <>
      <ReportsHeader
        subTitle={"يرجى تحديد احدى الخيارات الاتية"}
        title="تصنيف البلاغ"
      />
      <div className="px-8 pt-4">
        <div className="grid mt-4 gap-4 sm:gap-8 md:gap-12 grid-col-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {cards.map((card) => (
            <CardUser
              onClick={() => handleSelected(card.name)}
              key={card.name}
              active={title === card.name}
              title={card.name}
              url={card["image_url"]}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ReportClassification;
