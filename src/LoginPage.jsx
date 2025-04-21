import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // ใช้ axios สำหรับเรียก API


function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // 🔥 เรียก API Login จริง
      const response = await axios.post("https://wayshare-backend.onrender.com/api/auth/login", {
        email,
        password,
      });

      const { token, user } = response.data;

      // ✅ เก็บ Token และ User ลง localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      console.log("Login success!");

      // ไปหน้า List (หรือหน้า Home อะไรก็ได้ที่คุณตั้งใจ)
      navigate("/");

    } catch (error) {
      console.error("Login failed:", error.response?.data?.message || error.message);
      alert("Login failed, please try again.");
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-5xl w-full bg-white rounded-xl shadow-lg flex flex-col md:flex-row overflow-hidden">

        {/* Form Section */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <img src="/logo-icon.png" alt="Logo" className="h-8 mb-6" />

          <h2 className="text-2xl font-bold mb-2">Login</h2>
          <p className="text-gray-500 mb-6">Login to access your Golobe account</p>

          <form onSubmit={handleLogin} className="space-y-4">

            {/* Email */}
            <div>
              <label className="text-sm font-semibold">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border p-3 rounded mt-1 focus:outline-none"
                placeholder="john.doe@gmail.com"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label className="text-sm font-semibold">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border p-3 rounded mt-1 focus:outline-none"
                placeholder="••••••••••"
              />
              <div
                className="absolute right-4 top-10 cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </div>
            </div>

            {/* Remember me */}
            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-green-500" />
                Remember me
              </label>
              <button type="button" className="text-green-600 hover:underline">
                Forgot Password
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-green-300 hover:bg-green-400 text-green-900 font-semibold py-3 rounded"
              
            >
              Login
            </button>
          </form>

          {/* Sign up */}
          <p className="text-center text-gray-500 text-sm mt-6">
            Don’t have an account?{" "}
            <span className="text-red-500 font-semibold cursor-pointer hover:underline" onClick={() => navigate("/Signup")}>
              Sign up
            </span>
          </p>
        </div>

        {/* Image Section */}
        <div className="hidden md:block md:w-1/2 bg-gray-200 relative">
          <img
            src="/thailand-3708666_1280.jpg"
            alt="Hotel"
            className="w-full h-full object-cover rounded-l-none rounded-r-xl"
          />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
