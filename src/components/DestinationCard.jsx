import React from "react";

function DestinationCard({ image, city, country, posts }) {
  return (
    <div className="flex flex-col items-center text-center">
      {/* รูปภาพ */}
      <div className="w-24 h-24 rounded-lg overflow-hidden mb-3">
        <img
          src={image}
          alt={`${city}, ${country}`}
          className="object-cover w-full h-full"
        />
      </div>
      {/* ข้อความ */}
      <h3 className="font-semibold text-gray-900">{city}, {country}</h3>
      <p className="text-sm text-gray-500">{posts} post</p>
    </div>
  );
}

export default DestinationCard;
