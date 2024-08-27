import { Link } from "react-router-dom";
import { Breadcrumb } from "../../import";

const breadCrumbItems = [
  {
    title: (
      <Link className="hover:!bg-transparent " to="/">
        <div className="flex gap-2">
          <img src="../src/assets/icons/home-2.svg" />
          <span className="text-white">الرئيسية</span>
        </div>
      </Link>
    ),
    path: "/",
  },
  {
    title: "تقديم بلاغ",
    path: "/reportsPage",
  },
];

//rgb(47 57 52 / 80%)
const MiniHeader = () => {
  return (
    <div className="bg-[linear-gradient(to_right,rgba(51,131,92,0),rgba(47,57,52,0.8)),url('../src/assets/banner.jpg')] bg-cover  text-black w-screen h-72 bg-center">
      <div className=" miniHeader flex main_container mx-auto flex-col justify-center h-full">
        <h2 className="text-white text-3xl font-bold">الابلاغ عن المخالفات</h2>
        <Breadcrumb className="mt-4" separator=">" items={breadCrumbItems} />
      </div>
    </div>
  );
};

export default MiniHeader;
