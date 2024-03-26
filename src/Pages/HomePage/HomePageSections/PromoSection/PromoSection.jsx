import promo_section_image from "../../../../assets/PromoSection/promo.png";

const PromoSection = () => {
  return (
    <div className="lg:w-[1200px] lg:mx-auto px-2.5 md:px-5 lg:px-0 my-10 md:my-14 lg:my-16">
      <img src={promo_section_image} className="w-full h-full" alt="" />
    </div>
  );
};

export default PromoSection;
