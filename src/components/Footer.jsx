import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-10 text-gray-600 text-sm">
      <div className="max-w-[1200px] mx-auto px-4 grid grid-cols-1 md:grid-cols-5 gap-8">
        <div className="md:col-span-2">
          <h3 className="text-xl font-bold text-gray-800 mb-3">Globe</h3>
          <p>Discover destinations, activities, blogs and guides to inspire your next adventure.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2 text-gray-800">Our Destinations</h4>
          <ul className="space-y-1">
            <li>Canada</li>
            <li>Thailand</li>
            <li>Japan</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2 text-gray-800">Our Activities</h4>
          <ul className="space-y-1">
            <li>Hiking</li>
            <li>Snorkeling</li>
            <li>Kayaking</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2 text-gray-800">Contact Us</h4>
          <ul className="space-y-1">
            <li>support@globe.com</li>
            <li>+1 234 567 890</li>
          </ul>
        </div>
      </div>
      <div className="text-center text-gray-500 mt-10">
        © 2025 Globe. All rights reserved.
      </div>
    </footer>
    
  );
}
