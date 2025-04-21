import React from "react";
import Navbar from "./components/Navbar";
import { useParams } from "react-router-dom";

export default function PostPage() {
  const { id } = useParams();
  return (
    <div className="w-full min-h-screen bg-[#FFFDF7] font-sans text-gray-800">
      {/* Header */}
      
      <Navbar/>
      <div>{id}</div>

      {/* Main Post Section */}
      <main className="max-w-3xl mx-auto px-6 py-12">
        <div className="text-xs text-blue-500 font-semibold mb-2 flex items-center gap-2">
          DESIGN TO CODE
          <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">
            3 min read
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">
          Locofy.ai – Turn Figma to Code!
        </h1>
        <p className="text-gray-600 mb-4">
          Go from Figma to code in minimum amount of time using Locofy. Take your design to real world with Locofy's AI powered plugin.
        </p>
        <div className="flex items-center gap-3 mb-8">
          <img src="/avatar-anna.png" alt="Anna" className="w-10 h-10 rounded-full object-cover" />
          <div className="text-sm text-gray-500">
            <p className="font-medium text-gray-800">Anna Rosé</p>
            <p>Posted just now</p>
          </div>
        </div>

        <img
          src="/card-figma-code.png"
          alt="Locofy Demo"
          className="w-full rounded-xl shadow mb-8"
        />

        {/* Article Body */}
        <section className="prose prose-lg max-w-none">
          <h2>Introduction</h2>
          <p>
            Figma has become a household name in the UI/UX community. Being a truly browser-first product (not just storage in the cloud – no installation, no patching, no updates) and with highly collaborative features that no other player could think of or execute, Figma emerged as the clear market leader.
          </p>
          <p>
            You can design anything on Figma – from a cool logo to native apps and much more. But design is just the beginning of building a world-class product. You need to bring your product to life by actually building it – Writing the damn code!
          </p>
          <p>
            That's where Locofy.ai comes in. While Figma is enough to get the ball rolling, Locofy.ai even takes it further by enabling anyone with a Figma design to get high-quality, pixel-perfect code. Hence, accelerating the building process – with minimal time and a shallow learning curve, builders can now quickly and easily go from Figma to code.
          </p>
          <p>
            Validating an idea? Revamping your UI? The Locofy plugin puts Figma on steroids by taking your idea from design to websites and app.
          </p>
          <img
            src="/figma-to-code-flow.png"
            alt="Figma Code Flow"
            className="rounded-xl shadow my-8"
          />
          <p>
            Locofy takes your design through various stages and eventually deploys it on a provider of your choice (Netlify, Vercel).
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#fef9e6] py-12 px-6 mt-20">
        <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-sm text-gray-700">
          <div>
            <h4 className="font-semibold mb-2">Salty</h4>
            <p className="text-xs">Enjoy the touring with Salty</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Resources</h4>
            <ul className="space-y-1">
              <li>Download</li>
              <li>Help Center</li>
              <li>Guide Book</li>
              <li>App Directory</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Travellers</h4>
            <ul className="space-y-1">
              <li>Why Travellers</li>
              <li>Enterprise</li>
              <li>Customer Stories</li>
              <li>Instagram post</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Company</h4>
            <ul className="space-y-1">
              <li>Travelling</li>
              <li>About Locofy</li>
              <li>Success</li>
              <li>Information</li>
            </ul>
          </div>
        </div>
        <div className="text-center text-xs text-gray-500 mt-8">
          Get App: App Store | Google Play Store
        </div>
      </footer>
    </div>
  );
}