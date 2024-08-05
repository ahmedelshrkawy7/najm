import { Link } from "react-router-dom";
import AdminCards from "./AdminCards";

const AllAdmins = () => {
  let allAdmin = [
    {
      adminName: "مسئول البلاغات",
    },
    {
      adminName: "معتمد البلاغات",
    },
    {
      adminName: "مراجع البلاغات",
    },
    {
      adminName: "البلاغات المسندة للادارات المعنية",
    },
  ];
  return (
    <div className="bg-[url('../src/assets/admins_image.png')] bg-cover bg-no-repeat h-screen">
      <div className="w-[90%] mx-auto">
        <div className="relative flex flex-col justify-between h-screen">
          <div className="header py-10 flex items-center">
            <Link to="/">
              <div className="w-16 h-12 bg-[#FFFFFF33] flex flex-col justify-center items-center mb-1 rounded-md">
                <img
                  src="../src/assets/icons/adminHomeIcon.svg"
                  alt=""
                  className="w-fit"
                />
              </div>
              <h2 className="text-xl text-white font-bold">الرئيسية</h2>
            </Link>
            <div className="w-[4.5rem] h-32 bg-[#33835C] flex absolute top-0 left-0 flex-col justify-end text-center py-2 rounded-br-lg rounded-bl-lg">
              <img src="../src/assets/najm.png" draggable="false" alt="" />
            </div>
          </div>
          <div className="all self-center grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center md:gap-16 gap-10  mb-10">
            {allAdmin?.map((admin) => (
              <AdminCards key={admin.adminName} adminName={admin.adminName} />
            ))}
          </div>
          <Link
            href="/"
            className="bg-green-700 w-fit rounded p-2 px-8 flex items-center gap-4 self-end md:mb-10 mb-20"
          >
            <div>
              <img src="../src/assets/icons/Admin_Group.svg" alt="" />
            </div>
            <h2 className="text-2xl text-white mb-2">مدير النظام</h2>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AllAdmins;
