import React from "react";
import Navbar from "./components/Navbar";
import { useParams } from "react-router-dom";

const Postmap = () => {
    const { id } = useParams();
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Navbar/>

      {/* Main Content */}
      <main className="flex-1 bg-cream flex flex-col items-center py-10">
        <div className="bg-white w-11/12 md:w-3/4 rounded-2xl shadow-md flex flex-col md:flex-row p-10 min-h-[400px]">
          <div className="flex-1"></div>
          <div className="w-full md:w-1/3 flex justify-center items-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/OpenStreetMap_Mapnik_sample.png/320px-OpenStreetMap_Mapnik_sample.png"
              alt="map"
              className="rounded-xl"
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-cream py-10 text-gray-700">
        <div className="w-11/12 md:w-3/4 mx-auto grid grid-cols-1 md:grid-cols-5 gap-6">
          <div className="flex flex-col gap-2">
            <div className="font-bold text-lg">Salty</div>
            <p>Enjoy the touring with Salty</p>
            <div className="flex gap-2 text-gray-500">
              <span>📘</span>
              <span>📸</span>
              <span>🐦</span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="font-bold">Resources</div>
            <a href="#">Download</a>
            <a href="#">Help Center</a>
            <a href="#">Guide Book</a>
            <a href="#">App Directory</a>
          </div>

          <div className="flex flex-col gap-2">
            <div className="font-bold">Travellers</div>
            <a href="#">Why Travellers</a>
            <a href="#">Enterprise</a>
            <a href="#">Customer Stories</a>
            <a href="#">Instagram post</a>
          </div>

          <div className="flex flex-col gap-2">
            <div className="font-bold">Company</div>
            <a href="#">Travelling</a>
            <a href="#">About Locato</a>
            <a href="#">Success</a>
            <a href="#">Information</a>
          </div>

          <div className="flex flex-col gap-2">
            <div className="font-bold">Get App</div>
            <a href="#">App Store</a>
            <a href="#">Google Play Store</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Postmap;
