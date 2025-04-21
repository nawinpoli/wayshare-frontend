import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";


function SignupPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",     // เปลี่ยนจาก firstName + lastName เป็น username (ตาม API คุณนะ)
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [agree, setAgree] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!agree) {
      alert("You must agree to the Terms and Privacy Policies");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      // 🔥 เรียก API จริง
      const response = await axios.post("https://wayshare-backend.onrender.com/api/auth/signup", {
        username: form.firstName + " " + form.lastName,
        email: form.email,
        password: form.password,
      });

      const { token, user } = response.data;

      // ✅ เก็บ Token กับ User ลง LocalStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      console.log("Signup successful!");

      navigate("/"); // ไปหน้า List หลังสมัครเสร็จ

    } catch (error) {
      console.error("Signup failed:", error.response?.data?.message || error.message);
      alert("Signup failed, please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-5xl w-full bg-white rounded-xl shadow-lg flex flex-col md:flex-row overflow-hidden">

        {/* Left - Image */}
        <div className="hidden md:block md:w-1/2 bg-gray-200 relative">
          <img
            src="/images/hotel.jpg"
            alt="Hotel"
            className="w-full h-full object-cover rounded-l-xl"
          />
        </div>

        {/* Right - Form */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <img src="/logo-icon.png" alt="Logo" className="h-8 mb-6" />

          <h2 className="text-2xl font-bold mb-2">Sign up</h2>
          <p className="text-gray-500 mb-6">Let’s get you all set up so you can access your personal account.</p>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* First and Last Name */}
            <div className="flex gap-4">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={form.firstName}
                onChange={handleChange}
                required
                className="w-full border p-3 rounded focus:outline-none"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={form.lastName}
                onChange={handleChange}
                required
                className="w-full border p-3 rounded focus:outline-none"
              />
            </div>

            {/* Email and Phone */}
            <div className="flex gap-4">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full border p-3 rounded focus:outline-none"
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
                required
                className="w-full border p-3 rounded focus:outline-none"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full border p-3 rounded focus:outline-none"
              />
              <div
                className="absolute right-4 top-4 cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
                required
                className="w-full border p-3 rounded focus:outline-none"
              />
            </div>

            {/* Terms & Policy */}
            <div className="text-sm flex items-center gap-2">
              <input
                type="checkbox"
                className="accent-green-500"
                checked={agree}
                onChange={() => setAgree(!agree)}
              />
              <span>I agree to all the <span className="text-red-500 underline">Terms and Privacy Policies</span></span>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-green-300 hover:bg-green-400 text-green-900 font-semibold py-3 rounded"
            >
              Create account
            </button>
          </form>

          {/* Already have account */}
          <p className="text-center text-gray-500 text-sm mt-6">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/LoginPage")}
              className="text-red-500 font-semibold cursor-pointer hover:underline"
              
            >
              Login
            </span>
          </p>

          
          

          

        </div>
      </div>
    </div>
  );
}

export default SignupPage;
