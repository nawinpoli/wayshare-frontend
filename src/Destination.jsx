import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Card from "./components/Card";
import Navbar from "./components/Navbar";
import { useNavigate } from "react-router-dom";

const mockTopics = ["ALL", "BTS", "MRT", "ARL", "รถเมล์", "รถแท็กซี่", "ของหวานใกล้เคียง", "ของคาว", "อาหารเช้า"];

const mockPosts = Array(30).fill(0).map((_, i) => ({
  id: i + 1,
  category: "DESIGN TO CODE",
  timeToRead: "3 min read",
  title: i % 3 === 0 ? "Locofy.ai – Turn Figma to Code!" : i % 3 === 1 ? "Figma for Developers" : "Best UI Library to use in Figma",
  description: i % 3 === 0
    ? "Go from Figma to code in minimum amount of time using Locofy."
    : i % 3 === 1
    ? "Developers often believe they will be off to a flying start if they skip the designing process."
    : "Find out which library works best for scalable interface systems.",
  author: i % 2 === 0 ? "Anna Rosé" : "Justin Chen",
  date: "just now",
  avatar: i % 2 === 0 ? "/avatar-anna.png" : "/avatar-justin.png",
  image: i % 3 === 2 ? "/card-ui-lib.png" : i % 3 === 1 ? "/card-figma-dev.png" : "/card-figma-code.png",
}));

export default function DestinationPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 18;
  const navigate = useNavigate();

  const handleCardClick = (id) => {
    navigate(`/post/${id}`);
  };

  // คำนวณช่วงที่จะ slice
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = mockPosts.slice(indexOfFirstPost, indexOfLastPost);

  // คำนวณจำนวนหน้าทั้งหมด
  const totalPages = Math.ceil(mockPosts.length / postsPerPage);

  return (
    <div className="w-full min-h-screen font-sans bg-[#FFFDF7] text-gray-800">
      {/* Header */}
        <Navbar/>

      {/* Hero Banner */}
      <div className="relative w-full h-64 sm:h-80 md:h-96">
        <img src="/traffic-banner.jpg" alt="Bangkok Traffic" className="w-full h-full object-cover" />
        <div className="absolute bottom-4 left-6 text-white">
          <h1 className="text-xl font-bold">เยาวราช</h1>
          <p className="text-sm">Street Food</p>
        </div>
      </div>

      {/* Filter Section */}
      <section className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Where"
            className="px-4 py-2 rounded-full shadow border w-full sm:w-1/3"
          />
          <input
            type="date"
            className="px-4 py-2 rounded-full shadow border w-full sm:w-1/3"
          />
          <button className="bg-red-500 text-white px-6 py-2 rounded-full flex items-center justify-center gap-2 w-full sm:w-auto">
            <FaSearch />
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {mockTopics.map((topic, index) => (
            <button
              key={index}
              className="px-4 py-1 rounded-full border text-sm bg-white hover:bg-blue-50 transition"
            >
              {topic}
            </button>
          ))}
        </div>
      </section>

      {/* Posts Grid */}
      <section className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {currentPosts.map((post) => (
            <div key={post.id} onClick={() => handleCardClick(post.id)} className="cursor-pointer">
                        <Card post={post} />
                      </div>
          ))}
        </div>
      </section>

      {/* Pagination */}
      <div className="flex justify-center my-10 gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`w-8 h-8 rounded-full border flex items-center justify-center
            ${page === currentPage ? "bg-blue-500 text-white" : "hover:bg-blue-100"}`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Footer */}
      <footer className="bg-[#fef9e6] py-12 px-6 mt-12">
        <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-sm text-gray-700">
          {/* Footer Content */}
        </div>
        <div className="text-center text-xs text-gray-500 mt-8">
          Get App: App Store | Google Play Store
        </div>
      </footer>
    </div>
  );
}
