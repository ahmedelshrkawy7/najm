/* eslint-disable no-unused-vars */
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
        <div className="z-40 relative h-[4.5rem] flex justify-between items-center">
          <div className=" w-[100px] h-[130px]  z-[999] bg-[#33835C] flex absolute top-0 right-0 flex-col md:py-2 rounded-br-lg rounded-bl-lg">
            {/* <h2 className="text-4xl text-white">نجم</h2>
            <h2 className="text-2xl text-white ">najm</h2> */}
            <img
              src="	https://najm.sa/sites/ar/_catalogs/masterpage/Najm/images/najmlogo.svg"
              className="w-full h-full"
              alt=""
              draggable="false"
            />
          </div>
          <div className="flex absolute left-0 top-1/2 -translate-y-1/2 md:pr-6 px-0 gap-4">
            {/(dash)/gi.test(pathname) && (
              <button disabled className="disabled:cursor-not-allowed">
                <p className="relative rounded-md w-12 bg-[#9494940D] text-white flex justify-center items-center h-10 leading-[48px]">
                  <span className="top-[0.6rem] right-[1rem] rounded-full w-[6px] h-[6px] inline-block bg-red-600 absolute"></span>

                  <img
                    className="img w-[18px] h-[18px] text-center"
                    src="../../../src/assets/icons/Union.svg"
                    alt=""
                  />
                </p>
              </button>
            )}

            {/(dash)/gi.test(pathname) && (
              <button
                onClick={() => {
                  if (/(dash)/gi.test(pathname)) {
                    logout();
                    return navigate("/admin/login");
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
            )}
            <p className="rounded-md w-12 bg-[#9494940D] text-white text-lg text-center h-10 leading-[40px]">
              EN
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
