import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Card from "./components/Card";
import TopDestinationCard from "./TopDestinationCard";
import DestinationCard from "./components/DestinationCard";
import LetterBox from "./components/LetterBox";
import Footer from "./components/Footer";

export default function HomePage() {
  const navigate = useNavigate();
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [topDestinations, setTopDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/LoginPage");
      return;
    }

    const fetchTopDestinations = async () => {
      try {
        const response = await axios.get("https://wayshare-backend.onrender.com/api/posts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const posts = response.data;

        // 📍 1. สร้าง object นับจำนวน origin-destination ที่ซ้ำกัน
        const counter = {};

        posts.forEach(post => {
          const key = `${post.origin} - ${post.destination}`;
          if (counter[key]) {
            counter[key].count += 1;
          } else {
            counter[key] = {
              origin: post.origin,
              destination: post.destination,
              mainImage: post.mainImage,
              count: 1,
            };
          }
        });

        // 📍 2. แปลงเป็น array และ sort ตาม count มาก -> น้อย
        const sorted = Object.values(counter)
          .sort((a, b) => b.count - a.count)
          .slice(0, 7); // เอาแค่ 7 อันดับ

        setTopDestinations(sorted);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch posts:", error.response?.data?.message || error.message);
        setLoading(false);
      }
    };

    fetchTopDestinations();
  }, [navigate]);

  const handleSearch = () => {
    if (origin && destination) {
      navigate(`/List?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}`);
    } else {
      alert("กรุณากรอกจุดเริ่มต้นและจุดหมายปลายทาง");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg font-semibold">Loading...</div>
      </div>
    );
  }
  return (
    <div className="w-full min-h-screen overflow-y-auto font-sans text-gray-800 bg-[#FFFDF7]">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="pt-24 bg-gray-200 h-[600px] relative">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/asia-3468649_1280.jpg')` }}
        ></div>
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative z-10 max-w-[1200px] mx-auto text-white px-6 pt-20">
          <h1 className="text-4xl font-bold leading-tight">
          ยินดีต้อนรับสู่
          WayShare!
          </h1>
          <p className="mt-4 text-lg">ค้นหาเส้นทางการเดินทางที่ดีที่สุด
แชร์ประสบการณ์
และช่วยกันเลือกทางเลือกที่เหมาะสมที่สุด
สำหรับทุกคน</p>
        </div>
      </section>

      {/* Search Bar */}
      <section className="relative -top-20">
        <div className="max-w-[900px] mx-auto bg-white rounded-lg shadow-lg px-8 py-6 flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="จุดเริ่มต้นของคุณ..."
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="w-full border p-3 rounded-md focus:outline-none"
            />
          </div>
          <div className="flex-1">
            <input
              type="text"
              placeholder="จุดหมายปลายทางของคุณ..."
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full border p-3 rounded-md focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-4">
            <button
              className="bg-green-200 px-4 py-2 rounded-md text-green-800 font-semibold"
              onClick={handleSearch}
            >
              ค้นหา
            </button>
          </div>
        </div>
      </section>

      {/* Top Destinations Grid */}
      <section className="max-w-[1200px] mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6">แนะนำเส้นทางยอดนิยม</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {topDestinations.map((post) => (
            <DestinationCard
              key={post._id}
              image={post.mainImage || "/default-image.jpg"} // ถ้าไม่มีรูป
              city={post.origin}
              country={post.destination}
              posts={post.rating?.reviewsCount || 0}
            />
          ))}
        </div>
      </section>

      {/* Best Route section */}
      <section className="max-w-[1200px] mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6">อยากรู้ว่าเส้นทางไหนคุ้มที่สุด?</h2>
        <p className="text-gray-600 mb-6">
          ลองดูประสบการณ์เดินทางจริงจากผู้ใช้งานอื่น ๆ ที่แบ่งปันเส้นทางและราคาที่ดีที่สุด
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 bg-green-100 rounded-lg p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold mb-4">
                ค้นพบวิธีเดินทางจริง จากประสบการณ์จริงของผู้ใช้
              </h3>
              <p className="text-gray-700 text-sm">
                แบ่งปันเรื่องราวการเดินทาง เส้นทาง ราคาจริง ที่จะช่วยคุณประหยัดและวางแผนได้ดียิ่งขึ้น
              </p>
            </div>
            <button
              className="mt-6 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
              onClick={() => {
                navigate(`/List`);
              }}
            >
              Book Flight
            </button>
          </div>

          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="w-full h-40 bg-gray-200 rounded-lg">
              <img src="/asia-1807558_1280.jpg" className="w-full h-full object-cover" />
            </div>
            <div className="w-full h-40 bg-gray-200 rounded-lg">
              <img src="/asia-2179107_1280.jpg" className="w-full h-full object-cover" />
            </div>
            <div className="w-full h-40 bg-gray-200 rounded-lg">
              <img src="/buddha-5082641_1280.jpg" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Letter box */}
      <LetterBox />

      {/* Footer */}
      <Footer />
    </div>
  );
}
