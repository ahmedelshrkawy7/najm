const Navbar = () => {
  return (
    <div className="bg-[#444]">
      <div className=" w-[90%] mx-auto">
        <div className="relative h-[5rem] flex justify-between items-center">
          <div className="w-[4.5rem] h-32 bg-green-400 flex absolute top-0 right-0 flex-col justify-end text-center py-2 rounded-br-lg rounded-bl-lg">
            <h2 className="text-4xl text-white">نجم</h2>
            <h2 className="text-2xl text-white ">najm</h2>
          </div>
          <div className="flex absolute left-0 top-1/2 -translate-y-1/2 md:px-6 px-0 gap-4">
            <a href="/">
              <i className="rounded-md fa-regular fa-bell w-14 bg-[#333] text-white text-xl text-center h-12 leading-[48px]"></i>
            </a>
            <p className="rounded-md w-14 bg-[#333] text-white text-xl text-center h-12 leading-[48px]">
              EN
            </p>
            <a href="/">
              <i className="rounded-md fa-regular fa-user w-14 bg-[#333] text-white text-xl text-center h-12 leading-[48px]"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
