import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import TokenContext from "../../store/TokenContext";

const Navbar = () => {
  let { pathname } = useLocation();
  let { logout } = useContext(TokenContext);
  let navigate = useNavigate();
  console.log(pathname);
  return (
    <div className="bg-[#2E2E2E]">
      <div className=" w-[90%] mx-auto">
        <div className="z-40 relative h-[5rem] flex justify-between items-center">
          <div className="w-[4.5rem] h-32 bg-[#33835C] flex absolute top-0 right-0 flex-col justify-end text-center py-2 rounded-br-lg rounded-bl-lg">
            {/* <h2 className="text-4xl text-white">نجم</h2>
            <h2 className="text-2xl text-white ">najm</h2> */}
            <img src="../src/assets/najm.png" alt="" draggable="false" />
          </div>
          <div className="flex absolute left-0 top-1/2 -translate-y-1/2 md:px-6 px-0 gap-4">
            <a
              href="/"
              className="relative rounded-md w-12 bg-[#9494940D] text-white flex justify-center items-center h-10 leading-[48px]"
            >
              <span className="top-[0.6rem] right-[1rem] rounded-full w-[6px] h-[6px] inline-block bg-red-600 absolute"></span>
              <img
                className="img w-[18px] h-[18px] text-center"
                src="../../../src/assets/icons/Union.svg"
                alt=""
              />
            </a>
            <p className="rounded-md w-12 bg-[#9494940D] text-white text-lg text-center h-10 leading-[40px]">
              EN
            </p>
            <button
              onClick={() => {
                if (pathname === "/dash") {
                  logout();
                  return navigate("/login");
                }
                navigate("/allAdmins");
              }}
              // to="/allAdmins"
              className="rounded-md w-12 bg-[#9494940D] text-white flex justify-center items-center h-10 leading-[48px] "
            >
              <img
                className="w-[20px] h-[20px] text-center"
                src="../../../src/assets/icons/logout.svg"
                alt=""
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
