import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  FaBookOpen,
  FaCalendarAlt,
  FaHandHoldingHeart,
  FaHome,
  FaMoon,
  FaMosque,
  FaPrayingHands,
  FaTimes,
} from "react-icons/fa";
import { Link, NavLink, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // পেজ চেঞ্জ হলে মোবাইল মেনু বন্ধ হবে
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // স্টাইলিং ভেরিয়েবল
  const activeStyle =
    "text-islamicGold font-bold border-b-2 border-islamicGold pb-1 scale-105 transition-transform";
  const normalStyle =
    "text-gray-300 hover:text-islamicGold transition-all hover:scale-105";

  // ডেস্কটপ মেনুর জন্য লিংক
  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? activeStyle : normalStyle)}
        >
          হোম
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/calendar"
          className={({ isActive }) => (isActive ? activeStyle : normalStyle)}
        >
          ক্যালেন্ডার
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dua"
          className={({ isActive }) => (isActive ? activeStyle : normalStyle)}
        >
          দোয়া
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/tasbeeh"
          className={({ isActive }) => (isActive ? activeStyle : normalStyle)}
        >
          তসবিহ
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/names"
          className={({ isActive }) => (isActive ? activeStyle : normalStyle)}
        >
          ৯৯ নাম
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/zakat"
          className={({ isActive }) => (isActive ? activeStyle : normalStyle)}
        >
          যাকাত
        </NavLink>
      </li>
    </>
  );

  // মোবাইল মেনুর জন্য আইটেম ডাটা
  const mobileNavItems = [
    { name: "হোম", path: "/", icon: <FaHome /> },
    { name: "ক্যালেন্ডার", path: "/calendar", icon: <FaCalendarAlt /> },
    { name: "দোয়া", path: "/dua", icon: <FaPrayingHands /> },
    { name: "তসবিহ", path: "/tasbeeh", icon: <FaMosque /> },
    { name: "৯৯ নাম", path: "/names", icon: <FaBookOpen /> },
    { name: "যাকাত", path: "/zakat", icon: <FaHandHoldingHeart /> },
  ];

  return (
    <div className="navbar bg-black/60 backdrop-blur-md border-b border-white/10 sticky top-0 z-50 px-4 md:px-12 h-16">
      {/* বাম পাশ: মোবাইল মেনু বাটন এবং লোগো */}
      <div className="navbar-start flex items-center">
        {/* --- মোবাইল মেনু বাটন (DaisyUI এর বদলে কাস্টম বাটন) --- */}
        <button
          onClick={() => setIsOpen(true)}
          className="btn btn-ghost lg:hidden text-islamicGold pl-0 hover:bg-transparent"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h8m-8 6h16"
            />
          </svg>
        </button>

        {/* লোগো (Mosque Icon) */}
        <Link
          to="/"
          className="btn btn-ghost normal-case text-xl px-2 hover:bg-transparent relative z-50"
        >
          <FaMosque className="text-islamicGold text-4xl animate-pulse drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
        </Link>
      </div>

      {/* মাঝখান: ডেস্কটপ মেনু (DaisyUI Menu) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-lg font-medium gap-6 bg-transparent">
          {navLinks}
        </ul>
      </div>

      <div className="navbar-end"></div>

      {/* --- Animated Mobile Full-Screen Menu (Framer Motion) --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 w-full h-screen bg-black/95 backdrop-blur-xl z-[100] flex flex-col pt-20 px-8 lg:hidden"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-5 right-6 text-3xl text-islamicGold hover:text-white transition"
            >
              <FaTimes />
            </button>

            {/* Background Moon Decor */}
            <div className="absolute top-20 right-5 opacity-5 pointer-events-none">
              <FaMoon className="text-9xl text-islamicGold" />
            </div>

            <div className="flex flex-col gap-5 relative z-10 mt-10">
              {mobileNavItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={item.path}
                    className={`flex items-center gap-4 text-xl font-bold p-4 rounded-2xl transition-all duration-300 ${
                      location.pathname === item.path
                        ? "bg-gradient-to-r from-islamicGold/20 to-transparent text-islamicGold border-l-4 border-islamicGold"
                        : "text-gray-300 hover:text-islamicGold hover:bg-white/5"
                    }`}
                  >
                    <span className="text-2xl bg-black/50 p-3 rounded-full border border-islamicGold/30 text-islamicGold shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                      {item.icon}
                    </span>
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="mt-auto pb-10 w-full text-center text-gray-500 text-sm">
              পবিত্র মাহে রমজান
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
