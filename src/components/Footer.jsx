import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <img src={assets.logo} className="mb-5 w-32 " alt="" />
        </div>
        <div>
          <p className="text-xl font-medium mb-5 ">شركة</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li className=" text-gray-600">Home</li>
            <li className=" text-gray-600">About us</li>
            <li className=" text-gray-600">Delivery</li>
            <li className=" text-gray-600">Privacy policy</li>
          </ul>
        </div>
        <div>
          <p className="text-xl font-medium mb-5 ">تواصل معنا</p>
          <p className=" text-gray-600">0558978781</p>

          <a
            href="https://www.facebook.com/share/19Aw646mnv/"
            className=" text-gray-600 underline"
          >
            Facebook
          </a>
        </div>
      </div>
      <div className="text-center">
        <hr className="border-gray-200" />
        <p className="py-2 text-sm text-center">Created by</p>
        <a
          className="text-center text-blue-500 underline"
          href="https://hichemcherki-portfolio.netlify.app/"
        >
          {" "}
          hichem cherki ↗
        </a>
        <p className="py-2 text-sm text-center">
          Copyright 2024@ greatstack.dev - All Right Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
