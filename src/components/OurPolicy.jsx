import { assets } from "../assets/assets";

const OurPolicy = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700   ">
      <div className="">
        <img src={assets.exchange_icon} className="w-12 m-auto mb-5 " alt="" />
        <p className="font-semibold">سياسة التبادل السهلة </p>
        <p className="text-gray-400">نحن نقدم سياسة تبادل خالية من المتاعب </p>
      </div>
      <div className="">
        <img src={assets.quality_icon} className="w-12 m-auto mb-5 " alt="" />
        <p className="font-semibold">سياسة الإرجاع خلال 7 أيام </p>
        <p className="text-gray-400">نحن نقدم سياسة إرجاع مجانية لمدة 7 أيام</p>
      </div>
      <div className="">
        <img src={assets.support_img} className="w-12 m-auto mb-5 " alt="" />
        <p className="font-semibold">أفضل دعم للعملاء </p>
        <p className="text-gray-400">
          نحن نقدم دعم العملاء على مدار الساعة طوال أيام الأسبوع
        </p>
      </div>
    </div>
  );
};

export default OurPolicy;
