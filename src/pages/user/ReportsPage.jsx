import { useLoaderData } from "react-router-dom";
import { MiniHeader, Navbar, Reports } from "../../import";
const ReportsPage = () => {
  return (
    <div className="w-full overflow-x-hidden pb-4">
      <MiniHeader />
      <Reports />
    </div>
  );
};
export default ReportsPage;
