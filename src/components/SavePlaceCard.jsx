import { FaMapMarkerAlt, FaBus, FaTrain, FaClock, FaHeart, FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function SavePlaceCard({ post, onUnsave }) {
  const navigate = useNavigate();
  const [unsaving, setUnsaving] = useState(false);

  const handleUnsave = async () => {
    const confirmUnsave = window.confirm("ต้องการยกเลิกบันทึกโพสต์นี้หรือไม่?");
    if (!confirmUnsave) return;

    try {
      setUnsaving(true);
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user._id) {
        alert("กรุณาเข้าสู่ระบบใหม่");
        return;
      }

      await axios.post(`https://wayshare-backend.onrender.com/api/users/${user._id}/unsavePost`, 
        { postId: post._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // เรียก callback ให้หน้า SavedPlaces ลบโพสต์นี้ออก
      onUnsave(post._id);

    } catch (error) {
      console.error("Error unsaving post:", error.message);
      alert("เกิดข้อผิดพลาดในการยกเลิกบันทึกโพสต์");
    } finally {
      setUnsaving(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow flex flex-col md:flex-row overflow-hidden relative">
      
      {/* Image */} 
      <div className="relative w-full md:w-1/3 h-48 md:h-auto bg-gray-300">
        <div className="absolute top-2 right-2 bg-white text-xs px-2 py-1 rounded-full shadow">
          {post.images ? `${post.images} images` : 'No Image'}
        </div>
      </div>

      {/* Details */}
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div>
          <h2 className="font-bold text-lg mb-2">{post.title}</h2>
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <FaMapMarkerAlt /> {post.origin} ➔ {post.destination}
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
            {post.transportModes?.map((t, idx) => (
              <span key={idx} className="flex items-center gap-1">
                {t.type === "BTS" ? <FaTrain /> : <FaBus />}
                {t.type}
              </span>
            ))}
            <span className="flex items-center gap-1">
              <FaClock /> {post.totalDuration}
            </span>
          </div>
        </div>

        {/* Rating + Button */}
        <div className="flex justify-between items-center">
          <button onClick={handleUnsave} disabled={unsaving}>
            <FaHeart className="text-red-400" />
          </button>
          <button 
            className="bg-green-200 text-green-800 px-6 py-2 rounded font-semibold" 
            onClick={() => navigate(`/PostDetail/${post._id}`)}
          >
            View Place
          </button>
        </div>
      </div>

      {/* Price */}
      <div className="absolute top-4 right-4 text-red-500 font-bold text-sm">
        ค่ารถ {post.totalCost ?? '-'} .-
      </div>
    </div>
  );
}
