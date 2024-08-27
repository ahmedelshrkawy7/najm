import ManagerCard from "./ManagerCard";

const AdminManager = () => {
  const cardData = [
    {
      icon: "../src/assets/icons/manager_1.svg",
      title: "الصلاحيات",
      buttons: ["عرض الصلاحيات", "إضافة صلاحية"],
    },
    {
      icon: "../src/assets/icons/manager_2.svg",
      title: "الأقسام",
      buttons: ["عرض الأقسام", "إنشاء قسم"],
    },
    {
      icon: "../src/assets/icons/manager_3.svg",
      title: "أنواع الخطر",
      buttons: ["عرض أنواع الخطر", "إضافة نوع للخطر"],
    },
    {
      icon: "../src/assets/icons/manager_4.svg",
      title: "الإدارات",
      buttons: ["عرض الإدارات", "إنشاء إدارة"],
    },
    {
      icon: "../src/assets/icons/manager_1.svg",
      title: "المستخدمين",
      buttons: ["عرض المستخدمين", "إضافة مستخدم"],
    },
  ];

  return (
    <div className="w-[90%] mx-auto">
      <div className="min-h-screen bg-[#E6E6E6] flex items-center justify-center p-4 my-20 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6  ">
          {cardData.map((card, index) => (
            <ManagerCard
              key={index}
              icon={card.icon}
              title={card.title}
              buttons={card.buttons}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminManager;
