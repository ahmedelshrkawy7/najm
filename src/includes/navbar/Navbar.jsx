import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-[#2E2E2E]">
      <div className=" w-[90%] mx-auto">
        <div className="z-40 relative h-[5rem] flex justify-between items-center">
          <div className="w-[4.5rem] h-32 bg-[#33835C] flex absolute top-0 right-0 flex-col justify-end text-center py-2 rounded-br-lg rounded-bl-lg">
            <h2 className="text-4xl text-white">نجم</h2>
            <h2 className="text-2xl text-white ">najm</h2>
          </div>
          <div className="flex absolute left-0 top-1/2 -translate-y-1/2 md:px-6 px-0 gap-4">
            <a
              href="/"
              className="relative rounded-md w-14 bg-[#9494940D] text-white flex justify-center items-center h-12 leading-[48px]"
            >
              <span className="top-[0.9rem] right-[1.2rem] rounded-full w-[6px] h-[6px] inline-block bg-red-600 absolute"></span>
              <img
                className="img w-[21px] h-[21px] text-center"
                src="../../../src/assets/icons/Union.svg"
                alt=""
              />
            </a>
            <p className="rounded-md w-14 bg-[#9494940D] text-white text-xl text-center h-12 leading-[48px]">
              EN
            </p>
            <Link
              to={"/allAdmins"}
              className="rounded-md w-14 bg-[#9494940D] text-white flex justify-center items-center h-12 leading-[48px] "
            >
              <img
                className="w-[23px] h-[23px] text-center"
                src="../../../src/assets/icons/logout.svg"
                alt=""
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
