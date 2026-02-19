import { useRef, useState } from "react";
import {
  FaMoon,
  FaPause,
  FaPlay,
  FaPray,
  FaQuran,
  FaSpinner,
  FaSun,
} from "react-icons/fa";

const Dua = () => {
  const [activeTab, setActiveTab] = useState("rahmat");
  const [playing, setPlaying] = useState(null);
  const [loadingAudio, setLoadingAudio] = useState(false);

  // অডিও প্লেয়ার রেফ
  const audioRef = useRef(new Audio());

  // সূরা প্লে করার ফাংশন
  const handlePlayAudio = (url, id) => {
    if (playing === id) {
      audioRef.current.pause();
      setPlaying(null);
      return;
    }

    setLoadingAudio(true);
    audioRef.current.pause();
    audioRef.current.src = url;
    audioRef.current.load();

    audioRef.current
      .play()
      .then(() => {
        setPlaying(id);
        setLoadingAudio(false);
      })
      .catch((error) => {
        console.error("Audio play failed:", error);
        setLoadingAudio(false);
        alert("অডিও লোড করা যাচ্ছে না। ইন্টারনেট কানেকশন চেক করুন।");
      });

    audioRef.current.onended = () => {
      setPlaying(null);
      setLoadingAudio(false);
    };
  };

  // সাহরি ও ইফতার (সাউন্ড ছাড়া)
  const duas = {
    sehri: {
      id: "sehri",
      title: "সাহরির দোয়া",
      arabic:
        "নাওয়াইতু আন আসুমা গাদাম মিন শাহরি রমাদানাল মুবারাকি ফারদাল্লাকা ইয়া আল্লাহু ফাতাকাব্বাল মিন্নি ইন্নাকা আনতাস সামিউল আলিম।",
      bangla:
        "হে আল্লাহ! আগামীকাল পবিত্র রমজান মাসে তোমার সন্তুষ্টি লাভের উদ্দেশ্যে রোজা রাখার নিয়ত করলাম। অতএব তুমি আমার পক্ষ থেকে তা কবুল কর। নিশ্চয়ই তুমি সর্বশ্রোতা ও সর্বজ্ঞ।",
      icon: <FaMoon className="text-3xl text-yellow-300" />,
    },
    iftar: {
      id: "iftar",
      title: "ইফতারের দোয়া",
      arabic:
        "আল্লাহুম্মা লাকা ছুমতু ওয়া আলা রিযকিকা আফতারতু বিরাহমাতিকা ইয়া আরহামার রাহিমিন।",
      bangla:
        "হে আল্লাহ! আমি তোমারই সন্তুষ্টির জন্য রোজা রেখেছি এবং তোমারই দেওয়া রিযিক দ্বারা ইফতার করছি।",
      icon: <FaSun className="text-3xl text-orange-400" />,
    },
  };

  // ৩ দশকের দোয়া
  const ashraDuas = {
    rahmat: {
      name: "প্রথম ১০ দিন (রহমত)",
      arabic: "রাব্বিগ ফির ওয়ারহাম ওয়া আনতা খাইরুর রাহিমিন।",
      bangla:
        "হে পালনকর্তা! ক্ষমা করো ও রহম করো। আর তুমিই তো সর্বশ্রেষ্ঠ দয়ালু।",
      note: "এই দোয়াটি প্রথম ১০ দিন বেশি বেশি পাঠ করুন।",
    },
    maghfirat: {
      name: "দ্বিতীয় ১০ দিন (মাগফিরাত)",
      arabic: "আস্তাগফিরুল্লাহা রাব্বি মিন কুল্লি যামবিওঁ ওয়াতুবু ইলাইহি।",
      bangla: "আমি আল্লাহর কাছে ক্ষমা প্রার্থনা করছি আমার সকল পাপ থেকে।",
      note: "মাঝের ১০ দিন এই দোয়াটি পাঠ করুন।",
    },
    nazat: {
      name: "শেষ ১০ দিন (নাজাত)",
      arabic: "আল্লাহুম্মা আজিরনি মিনান নার।",
      bangla: "হে আল্লাহ! আমাকে জাহান্নামের আগুন থেকে মুক্তি দাও।",
      note: "শেষ ১০ দিন এই দোয়াটি বেশি পাঠ করুন।",
    },
  };

  // ১০টি ছোট সূরা (অডিও লিংকসহ)
  const surahs = [
    {
      id: 1,
      name: "সূরা ফাতিহা",
      arabicName: "الفاتحة",
      url: "https://server8.mp3quran.net/afs/001.mp3",
    },
    {
      id: 105,
      name: "সূরা ফিল",
      arabicName: "الفيل",
      url: "https://server8.mp3quran.net/afs/105.mp3",
    },
    {
      id: 106,
      name: "সূরা কুরাইশ",
      arabicName: "قريش",
      url: "https://server8.mp3quran.net/afs/106.mp3",
    },
    {
      id: 107,
      name: "সূরা মাউন",
      arabicName: "الماعون",
      url: "https://server8.mp3quran.net/afs/107.mp3",
    },
    {
      id: 108,
      name: "সূরা কাউসার",
      arabicName: "الكوثر",
      url: "https://server8.mp3quran.net/afs/108.mp3",
    },
    {
      id: 109,
      name: "সূরা কাফিরুন",
      arabicName: "الكافرون",
      url: "https://server8.mp3quran.net/afs/109.mp3",
    },
    {
      id: 110,
      name: "সূরা নাসর",
      arabicName: "النصر",
      url: "https://server8.mp3quran.net/afs/110.mp3",
    },
    {
      id: 112,
      name: "সূরা ইখলাস",
      arabicName: "الإخلاص",
      url: "https://server8.mp3quran.net/afs/112.mp3",
    },
    {
      id: 113,
      name: "সূরা ফালাক",
      arabicName: "الفلق",
      url: "https://server8.mp3quran.net/afs/113.mp3",
    },
    {
      id: 114,
      name: "সূরা নাস",
      arabicName: "الناس",
      url: "https://server8.mp3quran.net/afs/114.mp3",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-10 px-4 pb-20">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-islamicGold mb-10">
          দোয়া ও আমল
        </h2>

        {/* ১. সেহরি ও ইফতার সেকশন (সাউন্ড বাটন ছাড়া) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {Object.values(duas).map((item) => (
            <div
              key={item.id}
              className="bg-gray-900/60 p-8 rounded-2xl border border-islamicGold/30 relative overflow-hidden group hover:bg-gray-900 transition-colors shadow-lg"
            >
              <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity">
                {item.icon}
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-bold text-islamicGold flex items-center gap-2">
                  {item.title}
                </h3>
              </div>

              <p className="text-xl font-arabic font-semibold text-gray-200 mb-3 leading-relaxed">
                {item.arabic}
              </p>
              <p className="text-gray-400 text-sm border-t border-gray-700 pt-3">
                {item.bangla}
              </p>
            </div>
          ))}
        </div>

        {/* ২. ৩ দশকের বিশেষ আমল */}
        <div className="bg-gradient-to-b from-gray-900 to-black rounded-2xl border border-white/10 p-6 md:p-10 shadow-2xl mb-16">
          <h3 className="text-2xl font-bold text-center mb-8 flex items-center justify-center gap-2">
            <FaPray className="text-islamicGold" /> ৩ দশকের বিশেষ দোয়া
          </h3>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {Object.keys(ashraDuas).map((key) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`btn btn-sm md:btn-md rounded-full px-6 font-bold ${activeTab === key ? "bg-islamicGold text-black hover:bg-yellow-600 border-none" : "btn-outline text-gray-400 hover:text-white"}`}
              >
                {key === "rahmat"
                  ? "১ম (রহমত)"
                  : key === "maghfirat"
                    ? "২য় (মাগফিরাত)"
                    : "৩য় (নাজাত)"}
              </button>
            ))}
          </div>

          <div className="text-center animate-fade-in bg-white/5 p-8 rounded-xl border border-white/5">
            <h4 className="text-3xl font-bold text-white mb-6 underline decoration-islamicGold underline-offset-8">
              {ashraDuas[activeTab].name}
            </h4>
            <p className="text-2xl md:text-4xl font-arabic text-islamicGold mb-6 leading-relaxed">
              {ashraDuas[activeTab].arabic}
            </p>
            <p className="text-lg text-gray-300 mb-4">
              "{ashraDuas[activeTab].bangla}"
            </p>
          </div>
        </div>

        {/* ৩. ১০টি ছোট সূরা সেকশন (অডিও প্লেয়ার সহ) */}
        <div className="bg-gray-900/40 rounded-3xl p-6 md:p-10 border border-islamicGold/20">
          <h3 className="text-3xl font-bold text-center text-islamicGold mb-8 flex items-center justify-center gap-3">
            <FaQuran /> প্রয়োজনীয় ১০টি সূরা (অডিও)
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {surahs.map((surah) => (
              <div
                key={surah.id}
                className={`flex items-center justify-between p-4 rounded-xl border transition-all ${playing === surah.id ? "bg-islamicGold/20 border-islamicGold" : "bg-black/40 border-gray-800 hover:border-islamicGold/50"}`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-islamicGold/10 flex items-center justify-center text-islamicGold font-bold text-sm">
                    {surah.id}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white">
                      {surah.name}
                    </h4>
                    <p className="text-xs text-gray-400 font-arabic">
                      {surah.arabicName}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handlePlayAudio(surah.url, surah.id)}
                  className={`btn btn-circle btn-sm ${playing === surah.id ? "btn-error text-white" : "btn-ghost text-islamicGold hover:bg-islamicGold hover:text-black"}`}
                >
                  {loadingAudio && playing === null ? (
                    <FaSpinner className="animate-spin" />
                  ) : playing === surah.id ? (
                    <FaPause />
                  ) : (
                    <FaPlay className="ml-1" />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dua;
