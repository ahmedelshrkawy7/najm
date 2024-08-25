const About = () => {
  return (
    <div className="w-[90%] mx-auto">
      <div className="max-w-full lg:py-20 py-8 flex flex-wrap lg:flex-row flex-col-reverse items-center justify-between">
        <div className="lg:w-[53%] lg:self-start w-full lg:pl-12">
          <h2 className="w-fit text-[#33835C] text-2xl font-bold mb-2 justify-between relative after:absolute after:content-[''] after:w-full after:h-1 after:left-0 after:from-green-700 after:to-green-100 after:bg-gradient-to-l after:top-full after:rounded-md after:mt-2">
            نظام الابلاغ عن المخالفات
          </h2>
          <div className="mt-8 md:mb-0 mb-8">
            <p className="mb-4 text-gray-800 text-justify">
              شركة نجم لخدمات التأمين هي شركة مساهمة مقفلة غير مدرجة، تأسست عام
              1428هـ (2007م)، نتيجة تعاون مشترك بين البنك المركزي السعودي (ساما)
              والإدارة العامة للمرور، بهدف تعزيز قطاع التأمين على المركبات في
              المملكة.
            </p>
            <p className="mb-4 text-gray-800 text-justify">
              بدأت بممارسة مهامها عبر مجموعة أعمال "معاينة وتقدير خسائر وتسوية
              مطالبات تأمينية". وفي عام2009 م أضيفت إليها "معاينة الحوادث
              المرورية البسيطة للسيارات المؤمّن عليها في المملكة العربية
              السعودية".{" "}
            </p>
            <p className="mb-4 text-gray-800 text-justify">
              تقدّم نجم منظومة متكاملة ‏من الحلول والخدمات ‏‎لكل المواطنين
              والمقيمين والزائرين، وتغطي 40‏‎ ‎مدينة حول المملكة، بطاقم عمل
              سعودي من ذوي الخبرة، يقومون بمباشرة الحوادث المرورية، وما يلحقها
              من تقدير خسائر وأضرار وتسوية مطالبات وخدمات تأمينية‎. ومع انبثاق
              رؤية المملكة 2030، واكبت نجم مسار التطور في المملكة وفق مستهدفات
              الرؤية الطموحة، وتحديداً عبر برنامجين رئيسين للرؤية: الأول تحقيق
              التحوّل الرقمي في كل الخدمات، والثاني تطوير وتحسين جودة الحياة في
              المملكة. وبادرت نجم إلى إعادة هيكلة شاملة لاستراتيجية عملها،
              متبنيه أفضل المعايير المهنية والتسويقية لتطوير نموذج أداء يواكب
              مستهدفات الرؤية.
            </p>
            <p className="mb-4 text-gray-800 text-justify">
              تمكنت في خلال السنوات القليلة الماضية، من تحقيق سلسلة إنجازات
              ونالت عدداً من الجوائز العالمية المرموقة، ما حوّل نجم إلى نموذج
              يحتذى به للخدمات التأمينية.
            </p>
          </div>
        </div>
        <div className="lg:self-center lg:w-[45%] md:self-start w-full h-fit sm:h-[40vh] md:h-[70vh] lg:h-[95vh] xl:h-fit lg:mb-0 mb-12">
          <img
            className="w-full h-full lg:object-cover rounded-lg"
            src="../../../src/assets/image 4.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default About;
