import { Breadcrumb } from "antd";
import { Link, useMatches } from "react-router-dom";

const BreadCrumb = ({ black }) => {
  const matches = useMatches();
  console.log("🚀 ~ MiniHeader ~ matches:", matches);
  const breadcrumbs = matches
    .filter((match) => match.handle && match.handle.crumb)
    .map((match) => ({
      id: match.id,
      title: (
        <Link className="hover:!bg-transparent " to={match.pathname}>
          <span
            className={` font-semibold ${black ? "text-black" : "text-white"}`}
          >
            {match.handle.crumb}
          </span>
        </Link>
      ),
      path: match.pathname,
    }));

  return <Breadcrumb separator=">" items={breadcrumbs} />;
};

export default BreadCrumb;
