import { useState } from "react";
import { FaCalculator, FaCoins, FaHandHoldingHeart } from "react-icons/fa";

const Zakat = () => {
  const [assets, setAssets] = useState({
    cash: "",
    gold: "", // টাকার অঙ্কে
    silver: "", // টাকার অঙ্কে
    business: "",
    other: "",
  });
  const [debt, setDebt] = useState("");
  const [totalZakat, setTotalZakat] = useState(0);

  const handleCalculate = () => {
    // সব ইনপুট নাম্বারে কনভার্ট করা হচ্ছে
    const totalAssets =
      Number(assets.cash) +
      Number(assets.gold) +
      Number(assets.silver) +
      Number(assets.business) +
      Number(assets.other);
    const totalDebt = Number(debt);

    const netWorth = totalAssets - totalDebt;

    // যাকাত ২.৫% (যদি সম্পদ নিসাব পরিমাণ হয়, এখানে সিম্পল ক্যালকুলেশন রাখা হয়েছে)
    if (netWorth > 0) {
      setTotalZakat(Math.ceil(netWorth * 0.025));
    } else {
      setTotalZakat(0);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pt-10 px-4 pb-20">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-islamicGold mb-2">
          যাকাত ক্যালকুলেটর
        </h2>
        <p className="text-center text-gray-400 mb-10">
          আপনার সম্পদের সঠিক যাকাত হিসাব করুন
        </p>

        <div className="bg-gray-900/60 p-8 rounded-2xl border border-islamicGold/30 shadow-2xl">
          {/* ইনপুট সেকশন */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="form-control">
              <label className="label text-gray-300">
                নগদ টাকা ও ব্যাংক ব্যালেন্স
              </label>
              <input
                type="number"
                placeholder="0"
                className="input input-bordered bg-black border-gray-700 focus:border-islamicGold text-white"
                onChange={(e) => setAssets({ ...assets, cash: e.target.value })}
              />
            </div>

            <div className="form-control">
              <label className="label text-gray-300">
                স্বর্ণ ও রূপার বর্তমান মূল্য
              </label>
              <input
                type="number"
                placeholder="0"
                className="input input-bordered bg-black border-gray-700 focus:border-islamicGold text-white"
                onChange={(e) => setAssets({ ...assets, gold: e.target.value })}
              />
            </div>

            <div className="form-control">
              <label className="label text-gray-300">ব্যবসায়িক সম্পদ</label>
              <input
                type="number"
                placeholder="0"
                className="input input-bordered bg-black border-gray-700 focus:border-islamicGold text-white"
                onChange={(e) =>
                  setAssets({ ...assets, business: e.target.value })
                }
              />
            </div>

            <div className="form-control">
              <label className="label text-red-400">
                ঋণ বা দেনা (বিয়োগ হবে)
              </label>
              <input
                type="number"
                placeholder="0"
                className="input input-bordered bg-black border-red-900/50 focus:border-red-500 text-white"
                onChange={(e) => setDebt(e.target.value)}
              />
            </div>
          </div>

          {/* বাটন */}
          <button
            onClick={handleCalculate}
            className="btn btn-glossy w-full text-black font-bold text-lg mb-8"
          >
            <FaCalculator /> হিসাব করুন
          </button>

          {/* রেজাল্ট কার্ড */}
          <div className="bg-gradient-to-r from-gray-900 to-black p-6 rounded-xl border border-islamicGold/50 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 text-islamicGold">
              <FaCoins className="text-9xl" />
            </div>
            <h3 className="text-xl text-gray-400 mb-2">আপনার প্রদেয় যাকাত</h3>
            <h2 className="text-5xl font-bold text-islamicGold font-mono">
              ৳ {totalZakat.toLocaleString()}
            </h2>
            <p className="text-sm text-gray-500 mt-4 flex justify-center items-center gap-2">
              <FaHandHoldingHeart /> যাকাত দিলে সম্পদ পবিত্র হয় ও বৃদ্ধি পায়।
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Zakat;
