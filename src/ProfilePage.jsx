import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaGlobe, FaBell, FaLock, FaGavel, FaUserCog, FaInfoCircle, FaUser } from "react-icons/fa";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LetterBox from "./components/LetterBox";
import axios from "axios";

export default function ProfilePage() {
  const [tab, setTab] = useState("account");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const userData = JSON.parse(localStorage.getItem("user"));
        if (!token || !userData || !userData._id) {
          navigate("/LoginPage");
          return;
        }

        const res = await axios.get(`https://wayshare-backend.onrender.com/api/users/${userData._id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        setUser(res.data);
      } catch (error) {
        console.error("Error fetching user info:", error.message);
        alert("เกิดข้อผิดพลาดในการโหลดข้อมูลผู้ใช้");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p>ไม่พบข้อมูลผู้ใช้</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
      {/* Navbar */}
      <Header/>

      {/* Main Content */}
      <main className="flex-grow">
        {/* Cover Image + Avatar */}
        <div className="relative bg-gray-200 h-40 md:h-60 rounded-b-xl overflow-hidden">
          <img src="/buddha-5082641_1280.jpg" alt="Cover" className="w-full h-full object-cover" />
          <button className="absolute top-4 right-4 bg-green-200 text-green-800 px-4 py-2 rounded text-sm">
            Upload new cover
          </button>
          <div className="absolute left-1/2 transform -translate-x-1/2 top-full -translate-y-1/2">
            <div className="relative">
              <img src="/profile.jpg" alt="Avatar" className="w-24 h-24 rounded-full border-4 border-white object-cover" />
              <button className="absolute bottom-0 right-0 bg-pink-400 w-6 h-6 rounded-full flex items-center justify-center text-white">
                ✎
              </button>
            </div>
            <div className="text-center mt-2">
              <h2 className="font-bold">{user.username}</h2>
              <p className="text-gray-500 text-sm">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="max-w-[800px] mx-auto mt-20">
          <div className="flex justify-center border-b">
            {["account", "journey", "setting"].map((item) => (
              <button
                key={item}
                className={`px-6 py-2 font-semibold ${
                  tab === item ? "border-b-2 border-green-400 text-green-700" : "text-gray-500"
                }`}
                onClick={() => setTab(item)}
              >
                {item === "account" && "บัญชีของฉัน"}
                {item === "journey" && "เส้นทางของฉัน"}
                {item === "setting" && "การตั้งค่า"}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="mt-8">
            {tab === "account" && (
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-bold mb-4">บัญชีของฉัน</h3>
                <div className="space-y-4 text-sm">
                  {[
                    { label: "ชื่อผู้ใช้", value: user.username },
                    { label: "อีเมล", value: user.email },
                    { label: "เบอร์โทรศัพท์", value: user.phoneNumber || "ยังไม่ได้ระบุ" },
                    { label: "ที่อยู่", value: user.address || "ยังไม่ได้ระบุ" },
                    { label: "วันเกิด", value: user.dateOfBirth || "ยังไม่ได้ระบุ" },
                  ].map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center">
                      <span>{item.label}</span>
                      <div className="flex items-center gap-2">
                        <span>{item.value}</span>
                        <button className="text-green-600 border px-2 py-1 rounded text-xs">แก้ไข</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === "setting" && (
              <div className="bg-white p-6 rounded-lg shadow space-y-4">
                <h3 className="text-lg font-bold mb-4">การตั้งค่า</h3>
                {[ 
                  { icon: <FaGlobe />, label: "ภาษา" },
                  { icon: <FaBell />, label: "การแจ้งเตือน" },
                  { icon: <FaLock />, label: "ความเป็นส่วนตัว" },
                  { icon: <FaGavel />, label: "รูปแบบการแสดงผล" },
                  { icon: <FaUserCog />, label: "การจัดการบัญชี" },
                  { icon: <FaInfoCircle />, label: "เกี่ยวกับ" },
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                    <div className="flex items-center gap-4">
                      <div className="text-green-600">{item.icon}</div>
                      <span>{item.label}</span>
                    </div>
                    <span className="text-green-500">{">"}</span>
                  </div>
                ))}
              </div>
            )}

            {tab === "journey" && (
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-bold mb-4">เส้นทางของฉัน</h3>
                <p className="text-gray-500">ฟีเจอร์นี้กำลังพัฒนาเร็วๆ นี้ 🚀</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <LetterBox/>
      <Footer/>
    </div>
  );
}
