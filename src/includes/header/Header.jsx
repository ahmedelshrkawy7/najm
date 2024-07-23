const Header = () => {
  return (
    <div className="bg-no-repeat bg-[url('../src/assets/omar-ram-QD9LY8Obumg-unsplash.png')] bg-cover h-[75vh]">
      <div className="w-[90%] mx-auto relative top-1/2 -translate-y-1/2">
        <h2 className="md:text-5xl text-4xl max-w-lg leading-[6rem] text-white font-semibold mb-12">
          مرحبا بك فى{" "}
          <span className="bg-[#33835C] md:inline-flex md:px-2 md:pb-4 p-2 rounded-md">
            نجم
          </span>{" "}
          للبلاغات والمخالفات
        </h2>
        <button className="border-0 bg-[#33835C] px-6 rounded-lg text-lg py-3 text-white">
          تقديم بلاغ جديد
        </button>
      </div>
    </div>
  );
};

export default Header;