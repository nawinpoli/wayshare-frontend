import React  from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar(){
    const navigate = useNavigate();
    return(
        <header className="flex flex-wrap justify-between items-center px-6 py-4 bg-white shadow-md sticky top-0 z-50">
        <div className="text-xl font-bold flex items-center gap-2 mb-2 md:mb-0">
          <img src="/logo.png" alt="Salty Logo" className="h-6" />
          Salty
        </div>
        <nav className="w-full md:w-auto flex justify-center md:justify-start gap-4 text-sm mb-2 md:mb-0">
          <a href="#" onClick={()=>{navigate(`/`);}}>Home</a>
          <a href="#">About us</a>
          <a href="#" onClick={()=>{navigate(`/destination`);}}>Destinations</a>
          <a href="#">Tours</a>
          <a href="#">Blog</a>
        </nav>
        <div className="w-full md:w-auto flex justify-center md:justify-end">
          <button className="bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm border border-red-200 hover:bg-red-200 transition">
            Book Now ✈️
          </button>
        </div>
      </header>
    );
}