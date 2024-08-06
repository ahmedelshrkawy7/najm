import { useLocation } from "react-router-dom";
import CardAdmin from "./component/admin/cardAdmin/CardAdmin";

const Dashboard = () => {
  let {pathname}= useLocation();
  // console.log(pathname)
  return (
    <div>
      <CardAdmin />
    </div>
  );
};

export default Dashboard;
