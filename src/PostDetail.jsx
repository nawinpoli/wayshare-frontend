import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

import Header from "./components/Header";
import Footer from "./components/Footer";
import LetterBox from "./components/LetterBox";

import { FaHeart, FaShareAlt, FaMapMarkerAlt, FaBus, FaTrain, FaClock } from "react-icons/fa";

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [visibleComments, setVisibleComments] = useState(3);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  // โหลดโพสต์
  const fetchPost = async () => {
    if (!id) return;
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`https://wayshare-backend.onrender.com/api/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPost(response.data);
    } catch (error) {
      console.error("Error fetching post:", error.message);
    }
  };

  // โหลดคอมเมนต์
  const fetchComments = async () => {
    if (!id) return;
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`https://wayshare-backend.onrender.com/api/comments?postId=${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const commentsWithUsernames = await Promise.all(
        response.data.map(async (comment) => {
          if (!comment.userId) {
            return { ...comment, username: "ไม่ระบุชื่อ" };
          }
          try {
            const userRes = await axios.get(`https://wayshare-backend.onrender.com/api/users/${comment.userId}`, {
              headers: { Authorization: `Bearer ${token}` }
            });
            return { ...comment, username: userRes.data.username };
          } catch (error) {
            console.error("Error fetching user info:", error.message);
            return { ...comment, username: "ไม่ระบุชื่อ" };
          }
        })
      );

      setComments(commentsWithUsernames);
    } catch (error) {
      console.error("Error fetching comments:", error.message);
    }
  };

  useEffect(() => {
    fetchPost();
    fetchComments();
    checkIfPostIsSaved();
    setLoading(false);
  }, [id]);

  // เช็กว่าโพสต์นี้ถูก save ไว้แล้วไหม
  const checkIfPostIsSaved = async () => {
    try {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user._id) return;
      const response = await axios.get(`https://wayshare-backend.onrender.com/api/users/${user._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.savedPosts.includes(id)) {
        setIsSaved(true);
      }
    } catch (error) {
      console.error("Error checking saved posts:", error.message);
    }
  };

  const handleLoadMoreComments = () => {
    setVisibleComments((prev) => prev + 3);
  };

  // เซฟโพสต์
  const handleSavePost = async () => {
    try {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));
      if (!token || !user || !user._id) {
        toast.error("กรุณาเข้าสู่ระบบก่อน");
        return;
      }

      if (isSaved) {
        toast("โพสต์นี้บันทึกไว้แล้ว", { icon: "❤️" });
        return;
      }

      await axios.post(`https://wayshare-backend.onrender.com/api/users/${user._id}/savePost`, {
        postId: post._id,
      }, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
      });

      setIsSaved(true);
      toast.success("บันทึกโพสต์สำเร็จแล้ว!");
    } catch (error) {
      console.error("Error saving post:", error.message);
      toast.error("เกิดข้อผิดพลาดในการบันทึกโพสต์");
    }
  };

  // ส่งคอมเมนต์ใหม่
  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) {
      toast.error("กรุณากรอกข้อความคอมเมนต์");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user._id) {
        toast.error("กรุณาเข้าสู่ระบบใหม่");
        return;
      }

      await axios.post(`https://wayshare-backend.onrender.com/api/comments`, {
        postId: id,
        content: newComment,
        userId: user._id,
      }, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
      });

      setNewComment("");
      fetchComments();
    } catch (error) {
      console.error("Error submitting comment:", error.message);
      toast.error("ส่งคอมเมนต์ไม่สำเร็จ กรุณาลองใหม่");
    }
  };

  // ลบคอมเมนต์
  const handleDeleteComment = async (commentId) => {
    const confirmDelete = window.confirm("คุณต้องการลบความคิดเห็นนี้หรือไม่?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`https://wayshare-backend.onrender.com/api/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchComments();
    } catch (error) {
      console.error("Error deleting comment:", error.message);
      toast.error("เกิดข้อผิดพลาดในการลบคอมเมนต์");
    }
  };

  if (loading || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="font-sans bg-gray-50 min-h-screen">
      <Header />
      <main className="max-w-[1000px] mx-auto px-4 py-24">

        {/* Title */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold leading-tight">{post.title}</h1>
            <div className="flex items-center text-gray-600 text-sm gap-2">
              <FaMapMarkerAlt />
              {post.origin} - {post.destination}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-600 font-bold">{post.rating.score}</span> {post.rating.text} ({comments.length} reviews)
            </div>
          </div>

          {/* Save/Share */}
          <div className="flex gap-3 mt-4 md:mt-0">
            <button onClick={handleSavePost} className="border p-2 rounded-full hover:bg-green-100">
              {isSaved ? (
                <FaHeart className="text-red-500" />
              ) : (
                <FaHeart className="text-gray-400" />
              )}
            </button>
            <button className="border p-2 rounded-full"><FaShareAlt /></button>
          </div>
        </div>

        {/* Images */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          {post.mainImage ? (
            <img src={post.mainImage} alt="Main" className="col-span-2 rounded-lg object-cover h-[400px] w-full" />
          ) : (
            <div className="col-span-2 bg-gray-200 h-[400px] flex items-center justify-center rounded-lg">
              No Image
            </div>
          )}
          <div className="flex flex-col gap-2">
            {post.galleryImages.map((img, idx) => (
              <img key={idx} src={img} alt={`gallery-${idx}`} className="rounded-lg object-cover h-[100px]" />
            ))}
          </div>
        </div>

        {/* Trip Info */}
        <div className="flex gap-6 mb-8">
          {post.transportModes.map((mode, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <FaTrain />
              {mode.type}
            </div>
          ))}
          <div className="flex items-center gap-2">
            <FaClock />
            {post.totalDuration}
          </div>
        </div>

        {/* Description */}
        <section className="bg-white rounded-lg p-6 shadow mb-8">
          <h2 className="text-xl font-bold mb-4">รายละเอียดเพิ่มเติม</h2>
          <p className="text-gray-700 text-sm">{post.description || "ไม่มีข้อมูลเพิ่มเติม"}</p>
        </section>

        {/* Review Section */}
        <section className="bg-white rounded-lg p-6 shadow mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="text-4xl font-bold text-green-600">{post.rating.score}</div>
            <div className="text-sm text-gray-600">
              {post.rating.text} (จาก {comments.length} รีวิว)
            </div>
          </div>

          {/* Add Comment */}
          <form onSubmit={handleSubmitComment} className="flex gap-4 mb-6">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="เขียนความคิดเห็น..."
              className="flex-1 border p-3 rounded focus:outline-none"
            />
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded"
            >
              ส่ง
            </button>
          </form>

          {/* Comment List */}
          <div className="space-y-4">
            {comments.slice(0, visibleComments).map((comment) => (
              <div key={comment._id} className="border p-4 rounded-lg bg-gray-50 relative">
                <div className="font-semibold">{comment.username || "ไม่ระบุชื่อ"}</div>
                <div className="text-gray-700 text-sm">{comment.content}</div>
                {comment.userId === JSON.parse(localStorage.getItem("user"))?._id && (
                  <button
                    onClick={() => handleDeleteComment(comment._id)}
                    className="absolute top-2 right-2 text-red-500 text-xs hover:underline"
                  >
                    ลบ
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Load More */}
          {visibleComments < comments.length && (
            <div className="mt-6 flex justify-center">
              <button onClick={handleLoadMoreComments} className="text-green-700 font-semibold">
                ดูความคิดเห็นเพิ่มเติม
              </button>
            </div>
          )}
        </section>

      </main>
      <LetterBox />
      <Footer />
    </div>
  );
}

export default PostDetail;
