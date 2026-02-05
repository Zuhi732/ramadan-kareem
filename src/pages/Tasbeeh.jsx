import { useRef, useState } from "react";
import { FaCheckCircle, FaHandPointer, FaUndo } from "react-icons/fa";

const Tasbeeh = () => {
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(33); // ডিফল্ট টার্গেট ৩৩
  const [dua, setDua] = useState("সুবহানাল্লাহ");
  const [completed, setCompleted] = useState(false);

  // ১. মাশাআল্লাহ সাউন্ড (টার্গেট পূর্ণ হলে)
  // যদি আপনি ফাইল ডাউনলোড না করে থাকেন, তবে এই অনলাইন লিংকটি ব্যবহার করুন:
  const successAudio = useRef(
    new Audio("https://www.myinstants.com/media/sounds/mashallah.mp3"),
  );

  // ২. ওয়াটার ড্রপ সাউন্ড (প্রতি ট্যাপে) - নতুন লিংক দেওয়া হয়েছে
  const clickAudio = useRef(
    new Audio("https://www.myinstants.com/media/sounds/water-droplet-2.mp3"),
  );

  const handleTargetChange = (newTarget) => {
    setTarget(newTarget);
    setCount(0);
    setCompleted(false);
    successAudio.current.pause();
    successAudio.current.currentTime = 0;
  };

  const handleTap = () => {
    if (count < target) {
      const newCount = count + 1;
      setCount(newCount);

      // ✅ ওয়াটার ড্রপ সাউন্ড প্লে (এরর হ্যান্ডলিং সহ)
      clickAudio.current.volume = 0.6; // ভলিউম একটু বাড়ানো হলো
      clickAudio.current.currentTime = 0;
      const playPromise = clickAudio.current.play();

      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log("Sound play failed (Browser blocked):", error);
        });
      }

      // টার্গেট পূর্ণ হলে
      if (newCount === target) {
        setCompleted(true);

        // মাশাআল্লাহ সাউন্ড প্লে
        successAudio.current.currentTime = 0;
        successAudio.current
          .play()
          .catch((err) => console.log("Audio permission needed", err));

        // ভাইব্রেশন
        if (navigator.vibrate) {
          navigator.vibrate([100, 50, 100]);
        }
      }
    }
  };

  const handleReset = () => {
    setCount(0);
    setCompleted(false);
    successAudio.current.pause();
    successAudio.current.currentTime = 0;
  };

  const percentage = (count / target) * 100;
  const strokeDashoffset = 440 - (440 * percentage) / 100;

  return (
    <div className="min-h-screen bg-black text-white pt-10 px-4 pb-20 flex flex-col items-center">
      <h2 className="text-4xl font-bold text-islamicGold mb-8 border-b-2 border-islamicGold pb-2">
        ডিজিটাল তসবিহ
      </h2>

      {/* সেটিংস বাটন */}
      <div className="flex gap-4 mb-10 bg-gray-900 p-2 rounded-xl border border-gray-700 shadow-lg">
        <select
          className="bg-black text-white border border-gray-600 rounded px-3 py-2 text-sm focus:outline-none cursor-pointer"
          onChange={(e) => setDua(e.target.value)}
          value={dua}
        >
          <option value="সুবহানাল্লাহ">সুবহানাল্লাহ</option>
          <option value="আলহামদুলিল্লাহ">আলহামদুলিল্লাহ</option>
          <option value="আল্লাহু আকবার">আল্লাহু আকবার</option>
          <option value="আস্তাগফিরুল্লাহ">আস্তাগফিরুল্লাহ</option>
          <option value="লা ইলাহা ইল্লাল্লাহ">লা ইলাহা ইল্লাল্লাহ</option>
          <option value="সাল্লাল্লাহু আলাইহি ওয়া সাল্লাম">দরুদ শরীফ</option>
        </select>

        <select
          className="bg-black text-islamicGold font-bold border border-gray-600 rounded px-3 py-2 text-sm focus:outline-none cursor-pointer"
          onChange={(e) => handleTargetChange(Number(e.target.value))}
          value={target}
        >
          <option value={33}>৩৩ বার</option>
          <option value={34}>৩৪ বার</option>
          <option value={100}>১০০ বার</option>
          <option value={1000}>১০০০ বার</option>
        </select>
      </div>

      {/* মেইন তসবিহ সার্কেল */}
      <div
        className="relative group cursor-pointer my-6"
        onClick={handleTap}
        style={{ webkitTapHighlightColor: "transparent" }}
      >
        <div
          className={`w-72 h-72 md:w-80 md:h-80 rounded-full shadow-[0_0_50px_rgba(212,175,55,0.1)] bg-gray-900/80 backdrop-blur-sm flex items-center justify-center relative overflow-hidden transition-all transform active:scale-95 duration-100 border-4 ${completed ? "border-green-500/30 shadow-[0_0_50px_rgba(16,185,129,0.3)]" : "border-islamicGold/10"}`}
        >
          {/* SVG Ring */}
          <svg
            className="absolute top-0 left-0 w-full h-full transform -rotate-90 p-2"
            viewBox="0 0 160 160"
          >
            <circle
              cx="80"
              cy="80"
              r="70"
              fill="none"
              stroke="#1f2937"
              strokeWidth="8"
            />
            <circle
              cx="80"
              cy="80"
              r="70"
              fill="none"
              stroke={completed ? "#10B981" : "#D4AF37"}
              strokeWidth="8"
              strokeDasharray="440"
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-300 ease-out"
            />
          </svg>

          {/* ভিতরের লেখা */}
          <div className="z-10 text-center select-none">
            <h1
              className={`text-8xl font-bold font-mono transition-all ${completed ? "text-green-400 scale-110" : "text-white"}`}
            >
              {count}
            </h1>
            <p className="text-gray-500 text-sm mt-2 uppercase tracking-widest opacity-80 font-semibold">
              {completed ? (
                <span className="text-green-400 flex items-center justify-center gap-2 animate-pulse">
                  <FaCheckCircle /> মাশাআল্লাহ!
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <FaHandPointer className="animate-bounce" /> ট্যাপ করুন
                </span>
              )}
            </p>
          </div>

          {/* ক্লিক ইফেক্ট */}
          <div className="absolute inset-0 bg-islamicGold opacity-0 active:opacity-20 rounded-full transition-opacity duration-100 pointer-events-none"></div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <h3 className="text-2xl md:text-3xl font-bold text-islamicGold mb-3">
          {dua}
        </h3>
        <div className="badge badge-outline text-gray-400 p-3">
          টার্গেট: {target} বার
        </div>
      </div>

      <button
        onClick={handleReset}
        className="mt-10 btn btn-outline border-gray-700 text-gray-400 hover:text-white hover:border-islamicGold hover:bg-islamicGold/10 gap-2 rounded-full px-8"
      >
        <FaUndo /> রিসেট করুন
      </button>
    </div>
  );
};

export default Tasbeeh;
