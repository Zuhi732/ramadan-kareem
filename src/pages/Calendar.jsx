import { useEffect, useState } from "react";
import { FaClock, FaMapMarkerAlt, FaMoon } from "react-icons/fa";

const Calendar = () => {
  // ডিফল্ট লোকেশন ঢাকা
  const [city, setCity] = useState("Dhaka");
  const [country, setCountry] = useState("Bangladesh");

  const [todayTimes, setTodayTimes] = useState(null);
  const [ramadanData, setRamadanData] = useState([]);
  const [loading, setLoading] = useState(true);

  // লোকেশন লিস্ট
  const locations = [
    { name: "Dhaka", value: "Dhaka", country: "Bangladesh" },
    { name: "Chittagong", value: "Chittagong", country: "Bangladesh" },
    { name: "Sylhet", value: "Sylhet", country: "Bangladesh" },
    { name: "Rajshahi", value: "Rajshahi", country: "Bangladesh" },
    { name: "Khulna", value: "Khulna", country: "Bangladesh" },
    { name: "Barisal", value: "Barisal", country: "Bangladesh" },
    { name: "Rangpur", value: "Rangpur", country: "Bangladesh" },
    { name: "Mymensingh", value: "Mymensingh", country: "Bangladesh" },
    { name: "Michigan, USA", value: "Detroit", country: "US" },
    { name: "New York, USA", value: "New York", country: "US" },
    { name: "London, UK", value: "London", country: "GB" },
  ];

  // সময় ফরম্যাট (AM/PM)
  const formatTime = (time) => {
    if (!time) return "Loading...";
    const cleanTime = time.split(" ")[0];
    let [hours, minutes] = cleanTime.split(":");
    hours = parseInt(hours);
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${hours}:${minutes} ${ampm}`;
  };

  // ডাটা ফেচিং ইফেক্ট
  useEffect(() => {
    setLoading(true);

    // ১. আজকের সময়ের জন্য API কল
    fetch(
      `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=2&school=1`,
    )
      .then((res) => res.json())
      .then((data) => {
        setTodayTimes(data.data.timings);
      })
      .catch((err) => console.error("Today time error:", err));

    // ২. রমজানের ক্যালেন্ডার (ফেব্রুয়ারি ও মার্চ ২০২৬)
    const fetchFeb = fetch(
      `https://api.aladhan.com/v1/calendarByCity?city=${city}&country=${country}&method=2&school=1&month=2&year=2026`,
    );
    const fetchMar = fetch(
      `https://api.aladhan.com/v1/calendarByCity?city=${city}&country=${country}&method=2&school=1&month=3&year=2026`,
    );

    Promise.all([fetchFeb, fetchMar])
      .then(async ([res1, res2]) => {
        const data1 = await res1.json();
        const data2 = await res2.json();
        const allDays = [...data1.data, ...data2.data];

        // ১৮ ফেব্রুয়ারি ২০২৬ থেকে শুরু
        const startDate = new Date(2026, 1, 18);

        const filteredDays = allDays.filter((day) => {
          const [d, m, y] = day.date.gregorian.date.split("-");
          const currentDay = new Date(y, m - 1, d);
          return currentDay >= startDate;
        });

        setRamadanData(filteredDays.slice(0, 30));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Calendar error:", err);
        setLoading(false);
      });
  }, [city, country]);

  // লোকেশন হ্যান্ডলার
  const handleLocationChange = (e) => {
    const selectedValue = e.target.value;
    const selectedLoc = locations.find((loc) => loc.value === selectedValue);

    if (selectedLoc) {
      setCity(selectedLoc.value);
      setCountry(selectedLoc.country);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pt-10 px-4 pb-20">
      <div className="max-w-4xl mx-auto text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-islamicGold mb-6">
          রমজান ক্যালেন্ডার ২০২৬
        </h2>

        {/* লোকেশন সিলেক্টর - ফিক্সড ভার্সন */}
        <div className="flex justify-center items-center gap-3 bg-gray-900 p-3 rounded-lg border border-gray-700 w-fit mx-auto shadow-lg">
          <FaMapMarkerAlt className="text-red-500 text-xl" />
          <span className="text-gray-300 font-semibold hidden md:block">
            লোকেশন:
          </span>

          <select
            className="bg-black text-white border border-islamicGold rounded px-3 py-2 focus:outline-none cursor-pointer"
            onChange={handleLocationChange}
            value={city}
          >
            {locations.map((loc) => (
              <option key={loc.value} value={loc.value}>
                {loc.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* আজকের সময় - লোডিং হ্যান্ডলিং সহ */}
      <div className="max-w-4xl mx-auto mb-12">
        {todayTimes ? (
          <div className="bg-gradient-to-r from-gray-900 to-black p-6 rounded-2xl border border-gray-800 text-center shadow-lg">
            <h3 className="text-xl text-gray-400 mb-4 flex items-center justify-center gap-2">
              <FaClock /> আজকের নামাজের সময় ({city})
            </h3>
            <div className="flex flex-wrap justify-center gap-3 md:gap-6 text-sm md:text-base font-mono">
              <span className="bg-gray-800 px-4 py-2 rounded text-blue-300">
                ফজর: {formatTime(todayTimes.Fajr)}
              </span>
              <span className="bg-gray-800 px-4 py-2 rounded text-yellow-200">
                জোহর: {formatTime(todayTimes.Dhuhr)}
              </span>
              <span className="bg-gray-800 px-4 py-2 rounded text-orange-300">
                আছর: {formatTime(todayTimes.Asr)}
              </span>
              <span className="bg-islamicGold text-black font-bold px-5 py-2 rounded shadow-lg">
                মাগরিব: {formatTime(todayTimes.Maghrib)}
              </span>
              <span className="bg-gray-800 px-4 py-2 rounded text-indigo-300">
                এশা: {formatTime(todayTimes.Isha)}
              </span>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500">লোকেশন লোড হচ্ছে...</div>
        )}
      </div>

      {/* ক্যালেন্ডার টেবিল */}
      <div className="max-w-5xl mx-auto overflow-x-auto rounded-xl border border-white/10 shadow-2xl bg-gray-900/30">
        <div className="bg-islamicGold p-4 text-black text-center font-bold text-xl flex items-center justify-center gap-2">
          <FaMoon /> পবিত্র মাহে রমজানের সময়সূচি
        </div>

        {loading ? (
          <div className="text-center p-10 text-islamicGold animate-pulse">
            ডাটা লোড হচ্ছে...
          </div>
        ) : (
          <table className="table w-full text-center">
            <thead className="text-islamicGold text-sm md:text-base bg-black/80">
              <tr>
                <th className="py-4">রোজা</th>
                <th>তারিখ</th>
                <th>সেহরি শেষ</th>
                <th>ইফতার</th>
              </tr>
            </thead>
            <tbody className="text-gray-300 text-sm md:text-base">
              {ramadanData.map((day, index) => (
                <tr
                  key={index}
                  className="hover:bg-islamicGold/10 border-b border-gray-800 transition-colors"
                >
                  <td className="font-bold text-islamicGold text-lg">
                    {index + 1}
                  </td>
                  <td>
                    <span className="font-semibold text-white block">
                      {day.date.gregorian.day} {day.date.gregorian.month.en}
                    </span>
                    <span className="text-xs text-gray-500">
                      {day.date.gregorian.weekday.en}
                    </span>
                  </td>
                  <td className="font-bold text-green-400 bg-green-900/10 rounded-lg">
                    {formatTime(day.timings.Imsak)}
                  </td>
                  <td className="font-bold text-islamicGold bg-yellow-900/10 rounded-lg">
                    {formatTime(day.timings.Maghrib)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Calendar;
