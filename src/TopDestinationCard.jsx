import React from "react";

export default function TopDestinationCard({ place }) {
  return (
    <div className="relative rounded-xl overflow-hidden shadow hover:shadow-lg transition w-full h-48 sm:h-56 md:h-64">
      <img
        src={place.image}
        alt={place.name}
        className="w-full h-full object-cover"
      />
      <div className="absolute top-2 left-2 bg-white/80 text-xs px-2 py-1 rounded-full font-semibold">
        {place.rating}
      </div>
      <div className="absolute bottom-2 left-2 text-white">
        <h3 className="font-semibold text-sm md:text-base">{place.name}</h3>
        <p className="text-xs md:text-sm">{place.category}</p>
      </div>
    </div>
  );
}
