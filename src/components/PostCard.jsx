import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaTrain, FaClock } from "react-icons/fa";
import axios from "axios";

export default function PostCard({ post }) {
  const [commentsCount, setCommentsCount] = useState(0);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`https://wayshare-backend.onrender.com/api/comments?postId=${post._id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCommentsCount(response.data.length); // ดึงจำนวนคอมเมนต์
      } catch (error) {
        console.error("Error fetching comments:", error.message);
      }
    };

    if (post._id) {
      fetchComments();
    }
  }, [post._id]);

  return (
    <Link to={`/PostDetail/${post._id}`}>
      <div key={post._id} className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">

          {/* Image */}
          <div className="w-full md:w-1/3 h-40 bg-gray-200 rounded-lg overflow-hidden">
            {post.mainImage && (
              <img src={post.mainImage} alt={post.title} className="w-full h-full object-cover" />
            )}
          </div>

          {/* Detail */}
          <div className="w-full md:w-2/3 flex flex-col justify-between">
            <div>
              <h3 className="font-bold mb-2">{post.title}</h3>

              {/* ตำแหน่ง */}
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                <FaMapMarkerAlt /> {post.origin} ➔ {post.destination}
              </div>

              {/* ยานพาหนะ และเวลา */}
              <div className="flex items-center gap-4 text-sm text-gray-500 flex-wrap">
                {post.transportModes?.map((mode, idx) => (
                  <span key={idx} className="flex items-center gap-1">
                    <FaTrain /> {mode.type}
                  </span>
                ))}
                {post.totalDuration && (
                  <span className="flex items-center gap-1">
                    <FaClock /> {post.totalDuration}
                  </span>
                )}
              </div>
            </div>

            {/* Rating + ราคา */}
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-1 text-sm">
                <span className="font-bold">{post.rating?.score ?? "-"}</span>
                <span className="text-gray-400">
                  ({commentsCount} รีวิว)
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-red-400 font-bold">{post.totalCost} บาท</span>
                <button className="bg-green-200 text-green-800 px-4 py-2 rounded font-semibold">
                  ดูเส้นทาง
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </Link>
  );
}
