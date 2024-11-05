/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";
import TokenContext from "../../store/TokenContext";
import { useContext } from "react";

const AdminCards = ({ adminName, name }) => {
  let role = JSON.parse(localStorage.getItem("token"))?.role;
  const { logout } = useContext(TokenContext);
  const navigate = useNavigate();

  let checkPath = () => {
    if (role === name) {
      navigate("/dash");
    } else {
      logout();
      navigate("/admin/login");
    }
  };
  return (
    <div
      // to={loggedIn ? "/adminRes" : "/adminLogin"}
      // to="/admin/login"
      onClick={checkPath}
      className="bg-white p-5 rounded-md self-stretch flex items-center justify-center cursor-pointer"
    >
      <h2 className="text-green-600 text-xl text-center font-medium">
        {adminName}
      </h2>
    </div>
  );
};

export default AdminCards;
