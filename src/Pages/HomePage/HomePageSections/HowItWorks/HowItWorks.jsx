import cash_on_delivery from "../../../../assets/HowItWorks/cash_on_delivery.png";
import fast_delivery from "../../../../assets/HowItWorks/fast_delivery.png";
import shepping_time from "../../../../assets/HowItWorks/shepping_time.png";
import shepping_charge from "../../../../assets/HowItWorks/shepping_charge.png";

const HowItWorks = () => {
  return (
    <div className="lg:w-[1200px] lg:mx-auto hidden md:block px-2.5 md:px-5 lg:px-0 py-10 md:py-14 lg:py-16 border-t border-b border-slate-200 dark:border-slate-700">
      <div className="nc-SectionHowItWork">
        <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-10">
          {/* Step 1 */}
          <div className="relative flex flex-col items-center max-w-xs mx-auto">
            {/* Step 1 Image */}
            <div className="sm:mb-10 lg:mb-4 max-w-[140px] mx-auto">
              <img src={cash_on_delivery} className="w-24 h-24 md:w-32 md:h-32 lg:w-36 lg:h-36" alt="" />
            </div>

            {/* Step 1 Content */}
            <div className="text-center mt-auto space-y-3">
              <h3 className="text-base font-semibold">Cash on Delivery</h3>
              <span className="block text-slate-600 dark:text-slate-50 text-sm leading-6">
                প্রোডাক্ট হতে পেয়ে চেক করে তারপরে মূল্য পরিশোধ করবেন।
              </span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative flex flex-col items-center max-w-xs mx-auto">
            {/* Step 2 Image */}
            <div className="sm:mb-10 lg:mb-4 max-w-[140px] mx-auto">
              <img src={fast_delivery} className="w-24 h-24 md:w-32 md:h-32 lg:w-36 lg:h-36" alt="" />
            </div>

            {/* Step 2 Content */}
            <div className="text-center mt-auto space-y-3">
              <h3 className="text-base font-semibold">Fast Delivery</h3>
              <span className="block text-slate-600 dark:text-slate-50 text-sm leading-6">
                আমরা সর্বচ্চ কম সময়ের মধ্যে আপনার প্রোডাক্ট পৌছে দিবার চেষ্টা করি।
              </span>
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative flex flex-col items-center max-w-xs mx-auto">
            {/* Step 3 Image */}
            <div className="sm:mb-10 lg:mb-4 max-w-[140px] mx-auto">
              <img src={shepping_time} className="w-24 h-24 md:w-32 md:h-32 lg:w-36 lg:h-36" alt="" />
            </div>

            {/* Step 3 Content */}
            <div className="text-center mt-auto space-y-3">
              <h3 className="text-base font-semibold">Shepping Time</h3>
              <span className="block text-slate-600 dark:text-slate-50 text-sm leading-6">
                অর্ডার করার দুই থেকে তিন দিনের মধ্যে পেয়ে যাবেন।
              </span>
            </div>
          </div>

          {/* Step 4 */}
          <div className="relative flex flex-col items-center max-w-xs mx-auto">
            {/* Step 4 Image */}
            <div className="sm:mb-10 lg:mb-4 max-w-[140px] mx-auto">
              <img src={shepping_charge} className="w-24 h-24 md:w-32 md:h-32 lg:w-36 lg:h-36" alt="" />
            </div>

            {/* Step 4 Content */}
            <div className="text-center mt-auto space-y-3">
              <h3 className="text-base font-semibold">Shipping Charge</h3>
              <span className="block text-slate-600 dark:text-slate-50 text-sm leading-6">
                ঢাকার মধ্যে ডেলিভারি চার্জ ৬০ ঢাকার বাইরে ১২০ টাকা
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
