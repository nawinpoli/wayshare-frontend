import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Header from "./components/Header";
import Footer from "./components/Footer";
import LetterBox from "./components/LetterBox";
import SavePlaceCard from "./components/SavePlaceCard";

function SavedPlaces() {
  const navigate = useNavigate();
  const [savedPosts, setSavedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ฟังก์ชันดึงข้อมูล savedPosts
  const fetchSavedPosts = async () => {
    try {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));

      if (!token || !user || !user._id) {
        navigate("/LoginPage");
        return;
      }

      const response = await axios.get(`https://wayshare-backend.onrender.com/api/users/${user._id}/savedPosts`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSavedPosts(response.data);
    } catch (error) {
      console.error("Error fetching saved posts:", error.message);
      alert("เกิดข้อผิดพลาดในการโหลดข้อมูลที่บันทึกไว้");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSavedPosts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen font-sans bg-gray-50">

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 max-w-[1000px] w-full mx-auto px-4 py-24">
        <h1 className="text-2xl font-bold mb-8">รายการที่บันทึกไว้</h1>

        {/* ถ้าไม่มีโพสต์ */}
        {savedPosts.length === 0 ? (
          <div className="text-gray-500 text-center">
            ยังไม่มีโพสต์ที่บันทึกไว้
          </div>
        ) : (
          <div className="space-y-6">
  {savedPosts.map((post) => (
    <SavePlaceCard 
      key={post._id} 
      post={post}
      onUnsave={(unsavedPostId) => {
        setSavedPosts((prev) => prev.filter(p => p._id !== unsavedPostId));
      }}
    />
  ))}
</div>
        )}
      </main>

      {/* LetterBox */}
      <LetterBox />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default SavedPlaces;
