import monkCommerLogo from "../assets/logo/monk-commerce-logo.png";

const Header = () => {
  return (
    <div className=" w-full flex justify-start items-center gap-5 pl-5 py-3 border-b border-[#D1D1D1] ">
      <img src={monkCommerLogo} alt="Monk Commerce Logo" />
      <h1 className="text-[#7E8185] font-semibold ">
        Monk Upsell & Cross-sell
      </h1>
    </div>
  );
};

export default Header;
