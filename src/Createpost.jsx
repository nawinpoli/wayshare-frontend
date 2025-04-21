import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LetterBox from "./components/LetterBox";
import { toast } from "react-hot-toast";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [selectedVehicles, setSelectedVehicles] = useState([]);
  const [budget, setBudget] = useState({ min: "", max: "" });
  const [timeEstimate, setTimeEstimate] = useState({ min: "", max: "" });
  const [satisfaction, setSatisfaction] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const CLOUD_NAME = "doftvqo4s";
  const UPLOAD_PRESET = "wayshare_upload";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/LoginPage");
    }
  }, [navigate]);

  const handleVehicleChange = (value) => {
    setSelectedVehicles((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);
  };

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    const res = await axios.post(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, formData);
    return res.data.secure_url;
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("กรุณาเข้าสู่ระบบก่อนโพสต์");
        navigate("/LoginPage");
        return;
      }

      if (!title || !origin || !destination || selectedVehicles.length === 0 || !budget.min || !budget.max || !timeEstimate.min || !timeEstimate.max || !satisfaction) {
        toast.error("กรุณากรอกข้อมูลให้ครบถ้วน");
        return;
      }

      setLoading(true);

      // ✅ Upload รูปทั้งหมดไป Cloudinary
      const uploadedUrls = await Promise.all(images.map(img => uploadToCloudinary(img)));

      const newPost = {
        title,
        origin,
        destination,
        mainImage: uploadedUrls[0] || "",
        galleryImages: uploadedUrls.slice(1),
        transportModes: selectedVehicles.map(vehicle => ({
          type: vehicle,
          durationMinutes: (Number(timeEstimate.min) + Number(timeEstimate.max)) / 2,
          cost: (Number(budget.min) + Number(budget.max)) / 2
        })),
        totalDuration: `${timeEstimate.min}-${timeEstimate.max} นาที`,
        totalCost: (Number(budget.min) + Number(budget.max)) / 2,
        rating: {
          score: satisfaction === "พอใจ" ? 4.5 : satisfaction === "เฉยๆ" ? 3.0 : 2.0,
          text: satisfaction,
          reviewsCount: Math.floor(Math.random() * 10) + 1
        },
        description,
      };

      // ✅ ส่งข้อมูลไป Backend
      await axios.post("https://wayshare-backend.onrender.com/api/posts", newPost, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      toast.success("โพสต์เสร็จเรียบร้อย!");
      navigate("/List");

    } catch (error) {
      console.error("สร้างโพสต์ล้มเหลว:", error.message);
      toast.error("เกิดข้อผิดพลาดในการสร้างโพสต์");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-sans bg-gray-50 min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="bg-cover bg-center h-[300px]" style={{ backgroundImage: `url('/banner.jpg')` }}>
        <div className="bg-black bg-opacity-30 w-full h-full flex items-center justify-center">
          <h1 className="text-white text-3xl font-bold">Make your travel wishlist, we'll do the rest</h1>
        </div>
      </section>

      {/* Form Section */}
      <section className="relative -top-20">
        <div className="max-w-[900px] mx-auto bg-white rounded-lg shadow-lg px-8 py-6 flex flex-col gap-6">

          {/* Title */}
          <input type="text" placeholder="ชื่อเรื่องที่คุณอยากตั้ง..." value={title} onChange={(e) => setTitle(e.target.value)}
            className="w-full border p-3 rounded-md focus:outline-none" />

          {/* Origin / Destination */}
          <div className="flex flex-col gap-4">
            <input type="text" placeholder="จุดเริ่มต้นของคุณ..." value={origin} onChange={(e) => setOrigin(e.target.value)}
              className="w-full border p-3 rounded-md focus:outline-none" />
            <input type="text" placeholder="จุดหมายปลายทางของคุณ..." value={destination} onChange={(e) => setDestination(e.target.value)}
              className="w-full border p-3 rounded-md focus:outline-none" />
          </div>

          {/* Vehicle Selection */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["BTS", "MRT", "Airport Rail Link", "รถเมล์", "รถไฟ", "แท็กซี่"].map((type) => (
              <label key={type} className="flex items-center gap-2">
                <input type="checkbox" value={type} checked={selectedVehicles.includes(type)}
                  onChange={() => handleVehicleChange(type)} />
                {type}
              </label>
            ))}
          </div>

          {/* Budget and Time */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="font-semibold mb-2">ค่าโดยสาร</p>
              <input type="number" placeholder="ต่ำสุด" value={budget.min}
                onChange={(e) => setBudget({ ...budget, min: e.target.value })} className="w-full border p-2 rounded" />
              <input type="number" placeholder="สูงสุด" value={budget.max}
                onChange={(e) => setBudget({ ...budget, max: e.target.value })} className="w-full border p-2 rounded mt-2" />
            </div>
            <div>
              <p className="font-semibold mb-2">เวลา</p>
              <input type="number" placeholder="ต่ำสุด" value={timeEstimate.min}
                onChange={(e) => setTimeEstimate({ ...timeEstimate, min: e.target.value })} className="w-full border p-2 rounded" />
              <input type="number" placeholder="สูงสุด" value={timeEstimate.max}
                onChange={(e) => setTimeEstimate({ ...timeEstimate, max: e.target.value })} className="w-full border p-2 rounded mt-2" />
            </div>
          </div>

          {/* Satisfaction */}
          <div className="flex gap-4">
            {["พอใจ", "เฉยๆ", "ไม่พอใจ"].map((status) => (
              <label key={status} className="flex items-center gap-2">
                <input type="radio" name="satisfaction" value={status}
                  checked={satisfaction === status}
                  onChange={(e) => setSatisfaction(e.target.value)} />
                {status}
              </label>
            ))}
          </div>

          {/* Description */}
          <textarea placeholder="รายละเอียดเพิ่มเติม..." value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border p-3 rounded-md h-40 focus:outline-none"></textarea>

          {/* Image Upload */}
          <div className="flex flex-col gap-2">
            <input type="file" multiple onChange={handleImageUpload}
              className="w-full border p-2 rounded" />
            <div className="flex gap-2 flex-wrap">
              {images.map((img, idx) => (
                <img key={idx} src={URL.createObjectURL(img)} alt="preview"
                  className="w-20 h-20 object-cover rounded" />
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4">
            <button className="text-gray-500" onClick={() => navigate("/")}>ยกเลิก</button>
            <button className="bg-green-200 px-6 py-2 rounded-md text-green-800 font-semibold"
              onClick={handleSubmit} disabled={loading}>
              {loading ? "กำลังโพสต์..." : "โพสต์"}
            </button>
          </div>

        </div>
      </section>

      <LetterBox />
      <Footer />
    </div>
  );
}

export default CreatePost;
