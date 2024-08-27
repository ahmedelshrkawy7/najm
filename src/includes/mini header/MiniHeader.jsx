import { Link, useMatches } from "react-router-dom";
import { Breadcrumb } from "../../import";

//rgb(47 57 52 / 80%)
const MiniHeader = () => {
  const matches = useMatches();
  console.log("🚀 ~ MiniHeader ~ matches:", matches);
  const breadcrumbs = matches
    .filter((match) => match.handle && match.handle.crumb)
    .map((match) => ({
      id: match.id,
      title: (
        <Link className="hover:!bg-transparent " to={match.pathname}>
          <span className="text-white">{match.handle.crumb}</span>
        </Link>
      ),
      path: match.pathname,
    }));

  return (
    <div className="bg-[linear-gradient(to_right,rgba(51,131,92,0),rgba(47,57,52,0.8)),url('../src/assets/banner.jpg')] bg-cover  text-black w-screen h-72 bg-center">
      <div className=" miniHeader flex main_container mx-auto flex-col justify-center h-full">
        <h2 className="text-white text-3xl font-bold">الابلاغ عن المخالفات</h2>
        <div className="flex gap-2 items-center mt-4">
          <img src="../src/assets/icons/home-2.svg" />
          <Breadcrumb separator=">" items={breadcrumbs} />
        </div>
      </div>
    </div>
  );
};

export default MiniHeader;
