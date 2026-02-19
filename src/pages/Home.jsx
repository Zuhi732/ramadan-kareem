import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [timeLeft, setTimeLeft] = useState({});
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const calculateTimeLeft = () => {
    const ramadanStart = new Date("February 19, 2026 00:00:00").getTime();
    const now = new Date().getTime();
    const difference = ramadanStart - now;

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        ),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      };
    } else {
      timeLeft = { message: "রমজান মোবারক" };
    }
    return timeLeft;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const TimeBox = ({ value, label }) => (
    <div className="flex flex-col items-center bg-black/40 backdrop-blur-md border border-islamicGold/30 p-2 md:p-4 rounded-xl shadow-[0_0_15px_rgba(212,175,55,0.2)] min-w-[60px] md:min-w-[100px]">
      <span className="text-2xl md:text-5xl font-bold text-islamicGold">
        {value || 0}
      </span>
      <span className="text-gray-300 text-[10px] md:text-sm uppercase tracking-wider">
        {label}
      </span>
    </div>
  );

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center pt-20 md:pt-0">
      {/* Background Image */}
      <div className="absolute inset-0 bg-black">
        <img
          src="https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?q=60&w=1200&auto=format&fit=crop"
          className={`w-full h-full object-cover transition-opacity duration-1000 ${isImageLoaded ? "opacity-50" : "opacity-0"}`}
          onLoad={() => setIsImageLoaded(true)}
          alt="Background"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black"></div>
      </div>

      <div className="relative z-10 w-full max-w-6xl px-4 flex flex-col-reverse md:flex-row items-center justify-between gap-6 md:gap-10">
        {/* Left Side: Text Content */}
        <div className="text-center md:text-left md:w-1/2 space-y-4 md:space-y-6 animate-float pb-10 md:pb-0">
          {timeLeft.message ? (
            // --- রমজান শুরু হয়ে গেলে এটি দেখাবে ---
            <>
              <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-islamicGold to-white drop-shadow-2xl mt-4 md:mt-0 animate-pulse">
                {timeLeft.message}
              </h1>
              <p className="text-lg md:text-xl text-gray-300">
                রহমত, মাগফিরাত ও নাজাতের মাস শুরু হয়ে গেছে। আল্লাহ আমাদের সকল
                ইবাদত কবুল করুন।
              </p>
            </>
          ) : (
            // --- রমজানের আগের কাউন্টডাউন ---
            <>
              <h1 className="text-4xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-islamicGold to-white drop-shadow-2xl mt-4 md:mt-0">
                রমজান আসছে
              </h1>
              <p className="text-lg md:text-xl text-gray-300">
                প্রস্তুত হোন রহমতের মাসের জন্য।
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-3 md:gap-4 mt-6">
                <TimeBox value={timeLeft.days} label="Days" />
                <TimeBox value={timeLeft.hours} label="Hours" />
                <TimeBox value={timeLeft.minutes} label="Min" />
                <TimeBox value={timeLeft.seconds} label="Sec" />
              </div>
            </>
          )}

          {/* Button Section */}
          <div className="pt-6 md:pt-8 flex justify-center md:justify-start">
            <Link
              to="/calendar"
              className="btn btn-glossy text-black font-bold px-8 py-2 md:py-3 rounded-full text-base md:text-lg shadow-lg hover:shadow-islamicGold/50 transition-all transform hover:-translate-y-1"
            >
              সময়সূচী দেখুন
            </Link>
          </div>
        </div>

        {/* Right Side: 3D Moon Image Section */}
        <div
          className="md:w-1/2 flex justify-center animate-float"
          style={{ animationDelay: "1s" }}
        >
          <div className="relative w-48 h-48 md:w-[500px] md:h-[500px]">
            <div className="absolute inset-0 bg-islamicGold/20 blur-[50px] md:blur-[80px] rounded-full"></div>
            <img
              src="/moon.png"
              alt="Ramadan Moon"
              className="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(212,175,55,0.6)]"
              loading="lazy"
              onError={(e) => {
                e.target.src = "https://pngimg.com/d/moon_PNG19.png";
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
