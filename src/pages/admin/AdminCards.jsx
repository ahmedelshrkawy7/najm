/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const AdminCards = ({ adminName }) => {
  return (
    <Link
      // to={loggedIn ? "/adminRes" : "/adminLogin"}
      to="/admin/login"
      className="bg-white p-5 rounded-md self-stretch flex items-center justify-center"
    >
      <h2 className="text-green-600 text-xl text-center font-medium">
        {adminName}
      </h2>
    </Link>
  );
};

export default AdminCards;
