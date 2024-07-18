const Header = () => {
  return (
    <div className="bg-no-repeat bg-[linear-gradient(to_right_bottom,rgba(49,84,44,0.8),rgba(16,71,52,0.8)),url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXM_qgC5FGjWclEGd5Pk0g_ncZ6ZC4_70Q1Q&s')] bg-cover h-[75vh]">
      <div className="w-[90%] mx-auto relative top-1/2 -translate-y-1/2">
        <h2 className="md:text-6xl text-4xl max-w-lg leading-[5rem] text-white font-semibold mb-12">
          مرحبا بك فى نجم للبلاغات والمخالفات
        </h2>
        <button className="border-0 bg-green-400 px-6 rounded-lg text-lg py-3 text-white">
          تقديم بلاغ جديد
        </button>
      </div>
    </div>
  );
};

export default Header;
