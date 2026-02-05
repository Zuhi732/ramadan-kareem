import { FaMosque } from "react-icons/fa"; // আইকন আবার ইমপোর্ট করা হলো
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const activeStyle =
    "text-islamicGold font-bold border-b-2 border-islamicGold pb-1 scale-105 transition-transform";
  const normalStyle =
    "text-gray-300 hover:text-islamicGold transition-all hover:scale-105";

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

  return (
    <div className="navbar bg-black/30 backdrop-blur-md border-b border-white/10 sticky top-0 z-50 px-4 md:px-12 h-16">
      {/* বাম পাশ: মোবাইল মেনু এবং লোগো */}
      <div className="navbar-start flex items-center">
        {/* মোবাইল ড্রপডাউন মেনু */}
        <div className="dropdown">
          <label
            tabIndex={0}
            className="btn btn-ghost lg:hidden text-islamicGold pl-0"
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
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-black border border-islamicGold/30 rounded-box w-52"
          >
            {navLinks}
          </ul>
        </div>

        {/* লোগো: শুধু মসজিদের আইকন রাখা হয়েছে */}
        <Link
          to="/"
          className="btn btn-ghost normal-case text-xl px-2 hover:bg-transparent"
        >
          <FaMosque className="text-islamicGold text-4xl animate-pulse drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
        </Link>
      </div>

      {/* মাঝখান: ডেস্কটপ মেনু */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-lg font-medium gap-6">
          {navLinks}
        </ul>
      </div>

      {/* ডান পাশ: খালি রাখা হয়েছে (বাটন সরানো হয়েছে) */}
      <div className="navbar-end">
        {/* Empty to maintain layout balance if needed, or you can remove this div */}
      </div>
    </div>
  );
};

export default Navbar;
