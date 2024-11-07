/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import TokenContext from "../../store/TokenContext";
import { Tooltip } from "antd";
import { subscribeToChannel } from "../../utils/pusherService";

const Navbar = () => {
  let { pathname, state = {} } = useLocation();
  console.log("🚀 ~ Navbar ~ state:", state, state?.userDetails?.user_image);
  let { logout } = useContext(TokenContext);
  let navigate = useNavigate();
  console.log(pathname);

  const [userDetails, setUserDetails] = useState(() => {
    const savedUserDetails = JSON.parse(localStorage.getItem("userDetails"));
    return state?.userDetails || savedUserDetails || null;
  });

  useEffect(() => {
    if (userDetails) {
      localStorage.setItem("userDetails", JSON.stringify(userDetails));
    }
  }, [userDetails, pathname]);

  // const [responsibleMessage, setResponsibleMessage] = useState("");
  // console.log("🚀 ~ Navbar ~ responsibleMessage:", responsibleMessage);
  // const [departmentMessage, setDepartmentMessage] = useState("");

  // useEffect(() => {
  //   console.log("Navbar component mounted");

  //   // Subscribe to responsible-notification channel
  //   const unsubscribeResponsible = subscribeToChannel(
  //     "responsible-notification",
  //     "ResponsibleNotificationEvent",
  //     (data) => {
  //       console.log("Received Responsible Notification:", data);
  //       setResponsibleMessage(data.message); // Update state with the message
  //     }
  //   );

  //   // Subscribe to department-notification channel
  //   const unsubscribeDepartment = subscribeToChannel(
  //     "department-notification",
  //     "DepartmentNotificationEvent",
  //     (data) => {
  //       console.log("Received Department Notification:", data);
  //       setDepartmentMessage(data.message); // Update state with the message
  //     }
  //   );

  //   // Cleanup function to unsubscribe from channels when the component unmounts
  //   return () => {
  //     unsubscribeResponsible();
  //     unsubscribeDepartment();
  //   };
  // }, []);

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
          <div className="flex absolute left-0 top-1/2 -translate-y-1/2 md:pr-6 px-0 gap-4 items-center">
            {/(dash)/gi.test(pathname) && (
              // <button disabled className="disabled:cursor-not-allowed">
              <button className="cursor-pointer">
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

            {/(dash|managers|depts)/gi.test(pathname) && (
              <button
                onClick={() => {
                  if (/(dash)/gi.test(pathname)) {
                    logout();
                    localStorage.setItem("pageNumber", 1);
                    localStorage.removeItem("userDetails");
                    return navigate("/admin/login");
                  }
                  // navigate("/allAdmins");
                  navigate("/admin/login");
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
            {/* <p className="rounded-md w-12 bg-[#9494940D] text-white text-lg text-center h-12 leading-[40px] cursor-pointer">
              <img
                src={state?.userDetails?.user_image}
                alt=""
                className="w-full h-full rounded-full"
              />
            </p> */}
            {userDetails && (
              <Tooltip
                title={
                  <div>
                    <p>الاسم: {userDetails?.name}</p>
                    <p>الادارة: {userDetails?.department?.name}</p>
                    {/* <p>
                      البريد الالكترونى: {state?.userDetails?.contact_information?.email}
                    </p>
                    <p>الصلاحية: {state?.userDetails.role?.name}</p> */}
                  </div>
                }
                overlayStyle={{
                  maxWidth: "none",
                  width: "auto",
                  color: "white",
                  borderRadius: "8px",
                  padding: "10px",
                }}
                placement="bottom"
              >
                <p className="w-12 bg-white/85 text-white text-lg text-center h-12 leading-[40px] cursor-pointer !rounded-full">
                  <img
                    src={userDetails?.user_image || ""}
                    alt="Profile"
                    className="w-full h-full rounded-full"
                  />
                </p>
              </Tooltip>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
