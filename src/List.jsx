import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"; 
import { FaSearch } from "react-icons/fa";
import axios from "axios";

import Header from "./components/Header";
import PostCard from "./components/PostCard";
import LetterBox from "./components/LetterBox";
import Footer from "./components/Footer";

function List() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialOrigin = queryParams.get("origin") || "";
  const initialDestination = queryParams.get("destination") || "";

  // ฟิลเตอร์
  const [price, setPrice] = useState(1000);
  const [time, setTime] = useState(120);
  const [rating, setRating] = useState(0);
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [searchQuery, setSearchQuery] = useState({ origin: "", destination: "" });

  // Post จริง
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [visiblePosts, setVisiblePosts] = useState(10);

  const [originInput, setOriginInput] = useState(initialOrigin);
  const [destinationInput, setDestinationInput] = useState(initialDestination);

  // ตรวจสอบ Token ก่อนเข้า
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/LoginPage");
    }
  }, [navigate]);

  // โหลด Post จาก API
useEffect(() => {
  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token, cannot fetch posts");
        return;
      }
      const response = await axios.get("https://wayshare-backend.onrender.com/api/posts", {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log("Posts fetched:", response.data);
      setPosts(response.data);
      setFilteredPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error.message);
    }
  };

  fetchPosts();
}, [location]); // ✅ location เปลี่ยนค่อย fetch ใหม่

  // เวลากด "ค้นหา"
  const handleSearch = () => {
    setSearchQuery({
      origin: originInput,
      destination: destinationInput
    });
  };

  // กรองโพสต์
  useEffect(() => {
    let result = posts;

    // กรองจาก origin/destination
    if (searchQuery.origin) {
      result = result.filter((post) =>
        post.origin.toLowerCase().includes(searchQuery.origin.toLowerCase())
      );
    }
    if (searchQuery.destination) {
      result = result.filter((post) =>
        post.destination.toLowerCase().includes(searchQuery.destination.toLowerCase())
      );
    }

    // กรองจากราคา
    result = result.filter((post) => post.totalCost <= price);

    // กรองจากเวลา
    result = result.filter((post) => {
      const avgDuration = averageDurationMinutes(post.totalDuration);
      return avgDuration <= time;
    });

    // กรองจาก Rating
    result = result.filter((post) => post.rating.score >= rating);

    // กรองจากประเภทยานพาหนะ
    if (vehicleTypes.length > 0) {
      result = result.filter((post) =>
        post.transportModes.some((mode) =>
          vehicleTypes.includes(mode.type)
        )
      );
    }

    setFilteredPosts(result);
    setVisiblePosts(10);
  }, [searchQuery, price, time, rating, vehicleTypes, posts]);

  // ฟังก์ชันแปลงช่วงเวลา เช่น "35-45 นาที" ให้ได้ค่าเฉลี่ย
  const averageDurationMinutes = (durationStr) => {
    if (!durationStr) return 0;
    const numbers = durationStr.match(/\d+/g);
    if (numbers && numbers.length >= 2) {
      const avg = (parseInt(numbers[0]) + parseInt(numbers[1])) / 2;
      return avg;
    }
    return parseInt(numbers[0]) || 0;
  };

  const handleVehicleChange = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setVehicleTypes([...vehicleTypes, value]);
    } else {
      setVehicleTypes(vehicleTypes.filter((v) => v !== value));
    }
  };

  const handleLoadMore = () => {
    setVisiblePosts((prev) => Math.min(prev + 10, filteredPosts.length));
  };

  return (
    <div className="font-sans text-gray-800">
      {/* Header */}
      <Header />

      {/* Main */}
      <main className="pt-24 bg-gray-50 min-h-screen">
        <div className="max-w-[1200px] mx-auto px-4">
          
          {/* Search bar */}
          <div className="bg-white p-6 rounded-lg shadow mt-6">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <input
                type="text"
                placeholder="จาก"
                value={originInput}
                onChange={(e) => setOriginInput(e.target.value)}
                className="border p-3 rounded w-full md:flex-1"
              />
              <input
                type="text"
                placeholder="ไป"
                value={destinationInput}
                onChange={(e) => setDestinationInput(e.target.value)}
                className="border p-3 rounded w-full md:flex-1"
              />
              <button
                onClick={handleSearch}
                className="bg-green-500 hover:bg-green-600 text-white p-3 rounded flex items-center justify-center w-full md:w-auto"
              >
                <FaSearch />
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex flex-col md:flex-row gap-8 mt-8">
            
            {/* Sidebar */}
            <div className="w-full md:w-1/4">
              <div className="bg-white rounded-lg p-6 shadow">
                <h3 className="text-lg font-bold mb-4">ตัวเลือกเพิ่มเติม</h3>

                {/* ราคา */}
                <div className="mb-6">
                  <label className="block font-semibold mb-2">ค่าเดินทาง (บาท): {price}</label>
                  <input
                    type="range"
                    min="0"
                    max="2000"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full"
                  />
                </div>

                {/* เวลา */}
                <div className="mb-6">
                  <label className="block font-semibold mb-2">เวลา (นาที): {time}</label>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    value={time}
                    onChange={(e) => setTime(Number(e.target.value))}
                    className="w-full"
                  />
                </div>

                {/* Rating */}
                <div className="mb-6">
                  <label className="block font-semibold mb-2">ความพึงพอใจ: {rating}+</label>
                  <div className="flex gap-2 flex-wrap">
                    {[0, 1, 2, 3, 4].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className={`border px-3 py-1 rounded text-sm ${
                          rating === star ? "bg-green-200 text-green-800" : ""
                        }`}
                      >
                        {star}+
                      </button>
                    ))}
                  </div>
                </div>

                {/* ประเภทยานพาหนะ */}
                <div className="mb-6">
                  <label className="block font-semibold mb-2">ประเภทยานพาหนะ</label>
                  <div className="flex flex-col gap-2 text-sm">
                    {["BTS", "MRT", "Airport Rail Link", "รถเมล์","รถไฟ"].map((type) => (
                      <label key={type} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          value={type}
                          checked={vehicleTypes.includes(type)}
                          onChange={handleVehicleChange}
                        />
                        {type}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Result list */}
            <div className="w-full md:w-3/4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600 text-sm">
                  แสดง {Math.min(visiblePosts, filteredPosts.length)} จาก {filteredPosts.length} โพสต์
                </span>
              </div>

              {/* แสดง Post */}
              {filteredPosts.slice(0, visiblePosts).map((post) => (
                <PostCard key={post._id} post={post} />
              ))}

              {/* Load More */}
              {visiblePosts < filteredPosts.length && (
                <button
                  onClick={handleLoadMore}
                  className="mt-8 w-full bg-black text-white py-3 rounded font-semibold"
                >
                  แสดงเส้นทางเพิ่มเติม
                </button>
              )}
            </div>

          </div>

        </div>
      </main>

      {/* Newsletter */}
      <LetterBox />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default List;
