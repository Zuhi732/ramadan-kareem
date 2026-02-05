import { useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  // আজানের অডিও প্লেয়ার (public ফোল্ডারে azan.mp3 থাকলে ভালো, না হলে অনলাইন লিংক)
  const azanAudio = useRef(
    new Audio("https://www.islamcan.com/audio/adhan/azan2.mp3"),
  );

  // সময় চেক করার ফাংশন
  useEffect(() => {
    const checkPrayerTime = () => {
      const now = new Date();
      const currentTime = `${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}`;

      // আজকের নামাজের সময় API থেকে আনা হচ্ছে (ডিফল্ট ঢাকা)
      fetch(
        `https://api.aladhan.com/v1/timingsByCity?city=Dhaka&country=Bangladesh&method=2&school=1`,
      )
        .then((res) => res.json())
        .then((data) => {
          const timings = data.data.timings;

          // API টাইম ফরম্যাট (HH:MM) এর সাথে বর্তমান সময়ের মিল খোঁজা
          const prayerTimes = {
            Fajr: timings.Fajr,
            Dhuhr: timings.Dhuhr,
            Asr: timings.Asr,
            Maghrib: timings.Maghrib,
            Isha: timings.Isha,
          };

          Object.keys(prayerTimes).forEach((key) => {
            if (prayerTimes[key] === currentTime) {
              // সময় মিললে নোটিফিকেশন ও সাউন্ড
              toast.success(`এখন ${key} ওয়াক্তের আজান হচ্ছে 🕌`, {
                position: "top-right",
                autoClose: 10000,
                theme: "dark",
              });

              // সাউন্ড প্লে (ব্রাউজার পারমিশন দিলে বাজবে)
              azanAudio.current
                .play()
                .catch((err) =>
                  console.log("User interaction needed for audio"),
                );
            }
          });
        });
    };

    // প্রতি ১ মিনিট পর পর চেক করবে
    const interval = setInterval(checkPrayerTime, 60000);

    // অ্যাপ লোড হওয়ার সাথে সাথে একবার চেক করবে
    checkPrayerTime();

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="font-sans bg-black min-h-screen">
      <Navbar />
      <div className="min-h-screen">
        <Outlet />
      </div>
      <Footer />
      {/* নোটিফিকেশন কন্টেইনার */}
      <ToastContainer />
    </div>
  );
};

export default MainLayout;
