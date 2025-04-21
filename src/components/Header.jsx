import React, { useState, useEffect } from "react";
import { FaPlane, FaCar, FaHeart, FaUser, FaCreditCard, FaCog, FaLifeRing, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleMouseEnter = () => setIsDropdownOpen(true);
  const handleMouseLeave = () => setIsDropdownOpen(false);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/LoginPage");
  };

  return (
    <header className="bg-white shadow-sm fixed w-full z-50">
      <div className="max-w-[1200px] mx-auto flex justify-between items-center px-6 py-3 relative">

        {/* Left menu */}
        <div className="flex items-center gap-6">
          <button onClick={() => navigate("/List")} className="flex items-center gap-2 text-green-900 font-semibold">
            <FaPlane />
            <span>ค้นหาเส้นทาง</span>
          </button>
          <button onClick={() => navigate("/CreatePost")} className="flex items-center gap-2 text-gray-800 font-semibold">
            <FaCar />
            <span>แบ่งปันเส้นทาง</span>
          </button>
        </div>

        {/* Center logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2" onClick={()=>{navigate(`/`);}}>
          <div className="flex items-center gap-2">
            <img src="/logo-icon.png" alt="WayShare" className="h-6" />
            <span className="text-xl font-bold text-gray-800">WayShare</span>
          </div>
        </div>

        {/* Right Section */}
        <div className="relative flex items-center gap-6">
          {/* Saved places */}
          <div
            className="flex items-center gap-2 text-green-900 font-semibold cursor-pointer"
            onClick={() => navigate("/SavePlaces")}
          >
            <FaHeart />
            <span>บันทึก</span>
          </div>

          {/* Profile + Dropdown */}
          <div
            className="relative flex flex-col items-center cursor-pointer"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Profile Button */}
            <div className="flex items-center gap-2">
              <img
                src={user?.profilePicture || "/profile.jpg"} // ถ้าไม่มีรูปในฐานข้อมูลให้ใช้รูป default
                alt="User"
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="font-semibold text-gray-800">
                {user ? `${user?.username}` : "Guest"}
              </span>
            </div>

            {/* Dropdown */}
            {isDropdownOpen && (
              <div className="absolute top-full right-0 w-64 bg-white rounded-xl shadow-xl p-4 z-50">
                {/* Profile Info */}
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={user?.profilePicture || "/profile.jpg"}
                    alt="User"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-bold text-gray-800">{user ? `${user?.username}` : "Guest"}</div>
                    <div className="text-green-500 text-sm">Online</div>
                  </div>
                </div>

                <div className="border-t border-gray-200 my-2"></div>

                {/* Menu List */}
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-gray-700 hover:text-black cursor-pointer" onClick={() => navigate("/ProfilePage")}><FaUser /> My Account</li>
                  <li className="flex items-center gap-3 text-gray-700 hover:text-black cursor-pointer"><FaCreditCard /> Payments</li>
                  <li className="flex items-center gap-3 text-gray-700 hover:text-black cursor-pointer"><FaCog /> Settings</li>
                  <li className="flex items-center gap-3 text-gray-700 hover:text-black cursor-pointer"><FaLifeRing /> Support</li>
                  <li className="flex items-center gap-3 text-gray-700 hover:text-black cursor-pointer" onClick={logout}><FaSignOutAlt /> Logout</li>
                </ul>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}

export default Header;
