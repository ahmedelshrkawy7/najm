import BreadCrumb from "../../component/breadCrumb/BreadCrumb";

//rgb(47 57 52 / 80%)
const MiniHeader = () => {
  return (
    <div className="bg-[linear-gradient(to_right,rgba(51,131,92,0),rgba(47,57,52,0.8)),url('../src/assets/banner.jpg')] bg-cover  text-black w-screen h-72 bg-center">
      <div className=" miniHeader flex main_container mx-auto flex-col justify-center h-full">
        <h2 className="text-white text-3xl font-bold">الابلاغ عن المخالفات</h2>
        <div className="flex gap-2 items-center mt-4">
          <img src="../src/assets/icons/home-2.svg" />
          <BreadCrumb />
        </div>
      </div>
    </div>
  );
};

export default MiniHeader;
