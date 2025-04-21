import React from "react";

export default function LetterBox() {
  return (
    <section className="bg-green-100 py-12">
      <div className="max-w-[1200px] mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-2">Subscribe Newsletter</h2>
          <p className="text-gray-700 text-sm">
            The Travel - Get inspired! Receive travel discounts, tips and behind-the-scenes stories.
          </p>
        </div>
        <div className="flex-1 flex flex-col sm:flex-row items-center gap-4">
          <input
            type="email"
            placeholder="Enter your email address"
            className="p-3 rounded w-full sm:w-auto flex-1"
          />
          <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded">
            Subscribe
          </button>
        </div>
      </div>
    </section>
    
  );
}
