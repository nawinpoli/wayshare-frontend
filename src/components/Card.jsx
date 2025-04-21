import React from "react";

export default function Card({ post }) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden w-80 min-w-[320px]">
      <img src={post.image} alt={post.title} className="w-full h-40 object-cover" />
      <div className="p-4">
        <div className="text-xs text-blue-500 font-semibold mb-1 flex items-center gap-2">
          {post.category.toUpperCase()}
          <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">
            {post.timeToRead}
          </span>
        </div>
        <h3 className="font-semibold text-lg leading-snug mb-2">{post.title}</h3>
        <p className="text-sm text-gray-600 mb-4">{post.description}</p>
        <div className="flex items-center gap-3">
          <img
            src={post.avatar}
            alt={post.author}
            className="w-8 h-8 rounded-full object-cover"
          />
          <div className="text-xs text-gray-500">
            <p className="font-medium text-gray-800">{post.author}</p>
            <p>{post.date}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
