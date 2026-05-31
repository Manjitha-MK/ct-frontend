import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

import {
  FiSearch,
  FiX,
  FiMaximize2,
  FiImage,
  FiHeart,
  FiMessageCircle,
  FiSend,
  FiLock,
} from "react-icons/fi";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

const GalleryPage = () => {
  const navigate = useNavigate();

  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  // ================= FETCH IMAGES =================
  const fetchImages = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/gallery`);
      setImages(res.data);
    } catch (error) {
      console.error("Error fetching gallery:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // ================= FILTER =================
  const filteredImages = images.filter((img) =>
    img.imageTitle?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ================= LIKE =================
  const handleLike = async (e, id) => {
    e.stopPropagation();

    if (!token) {
      localStorage.setItem("redirectAfterLogin", "/gallery");
      navigate("/login");
      return;
    }

    try {
      const res = await axios.put(
        `${API_BASE}/api/gallery/${id}/like`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const { likesCount, likedUsers } = res.data;

      setImages((prev) =>
        prev.map((img) =>
          img._id === id ? { ...img, likesCount, likedUsers } : img
        )
      );

      if (selectedImage?._id === id) {
        setSelectedImage((prev) => ({
          ...prev,
          likesCount,
          likedUsers,
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ================= COMMENT =================
  const handleComment = async (id) => {
    if (!commentText.trim()) return;

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const res = await axios.post(
        `${API_BASE}/api/gallery/${id}/comment`,
        { text: commentText },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const updatedComments = res.data.comments;
      setCommentText("");

      setImages((prev) =>
        prev.map((img) =>
          img._id === id ? { ...img, comments: updatedComments } : img
        )
      );

      if (selectedImage?._id === id) {
        setSelectedImage((prev) => ({
          ...prev,
          comments: updatedComments,
        }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#050b18] text-white pt-24 px-4 sm:px-6 lg:px-10 relative overflow-hidden">

        {/* BACKGROUND GLOW */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-[#071427]/60 to-amber-900/10 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto">

          {/* HEADER */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 border-b border-white/10 pb-6">

            <div>
              <p className="text-amber-500 text-xs tracking-widest uppercase font-bold">
                Thambilideniya Aura
              </p>
              <h1 className="text-3xl sm:text-4xl font-black uppercase">
                Team <span className="text-gray-400">Gallery</span>
              </h1>
            </div>

            {/* SEARCH */}
            <div className="relative w-full md:w-80">
              <FiSearch className="absolute left-3 top-3 text-gray-500" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search moments..."
                className="w-full bg-[#071427] border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:border-amber-500 outline-none"
              />
            </div>
          </div>

          {/* LOADING */}
          {loading ? (
            <div className="text-center py-32 text-amber-500 animate-pulse">
              <FiImage className="mx-auto w-10 h-10 mb-3" />
              Loading Gallery...
            </div>
          ) : filteredImages.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              No images found
            </div>
          ) : (
            /* GRID */
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

              {filteredImages.map((img) => (
                <div
                  key={img._id}
                  onClick={() => setSelectedImage(img)}
                  className="group bg-[#071427]/40 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/5 cursor-pointer
                  hover:border-amber-500/30 hover:-translate-y-2 transition-all duration-500"
                >

                  {/* IMAGE */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={img.imageUrl || "/default-image.png"}
                      loading="lazy"
                      alt={img.imageTitle || "gallery image"}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 opacity-0 group-hover:opacity-100 transition" />

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <FiMaximize2 className="text-amber-400 w-6 h-6" />
                    </div>
                  </div>

                  {/* INFO */}
                  <div className="p-4">

                    <h3 className="text-sm font-bold truncate group-hover:text-amber-400">
                      {img.imageTitle || "Match Moment"}
                    </h3>

                    <div className="flex justify-between mt-3 text-xs">

                      {/* LIKE */}
                      <button
                        onClick={(e) => handleLike(e, img._id)}
                        className={`flex items-center gap-1 transition ${
                          img.likedUsers?.some(
                            (id) => String(id) === String(user?._id)
                          )
                            ? "text-red-500"
                            : "text-gray-400 hover:text-red-500"
                        }`}
                      >
                        <FiHeart />
                        {img.likesCount || 0}
                      </button>

                      {/* COMMENTS */}
                      <div className="flex items-center gap-1 text-gray-400">
                        <FiMessageCircle />
                        {img.comments?.length || 0}
                      </div>

                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ================= MODAL ================= */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div
              className="w-full max-w-6xl bg-[#071427]/90 backdrop-blur-2xl rounded-2xl border border-white/10 flex flex-col lg:flex-row overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >

              {/* CLOSE */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 text-white bg-black/40 p-2 rounded-lg"
              >
                <FiX />
              </button>

              {/* IMAGE */}
              <div className="flex-1 flex items-center justify-center p-6">
                <img
                  src={selectedImage.imageUrl || "/default-image.png"}
                  loading="lazy"
                  alt="selected"
                  className="max-h-[70vh] rounded-xl"
                />
              </div>

              {/* COMMENTS */}
              <div className="w-full lg:w-[380px] border-l border-white/10 p-4 flex flex-col">

                <div className="flex justify-between mb-3 text-sm">
                  <span className="text-red-400 flex items-center gap-1">
                    <FiHeart /> {selectedImage.likesCount || 0}
                  </span>

                  <span className="text-gray-400 flex items-center gap-1">
                    <FiMessageCircle />
                    {selectedImage.comments?.length || 0}
                  </span>
                </div>

                {/* COMMENTS LIST */}
                <div className="flex-1 overflow-y-auto space-y-2 mb-3">

                  {selectedImage.comments?.length ? (
                    selectedImage.comments.map((c, i) => (
                      <div key={i} className="bg-white/5 p-2 rounded-lg">
                        <p className="text-xs text-amber-400">
                          @{c.userName || "user"}
                        </p>
                        <p className="text-sm text-gray-300">{c.text}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">No comments yet</p>
                  )}

                </div>

                {/* COMMENT BOX */}
                {token ? (
                  <div className="flex gap-2">
                    <input
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          handleComment(selectedImage._id);
                        }
                      }}
                      placeholder="Write comment..."
                      className="flex-1 bg-white/5 p-2 rounded-lg text-sm outline-none"
                    />
                    <button
                      onClick={() => handleComment(selectedImage._id)}
                      className="bg-amber-500 p-2 rounded-lg text-black"
                    >
                      <FiSend />
                    </button>
                  </div>
                ) : (
                  <div className="text-center text-amber-400 text-sm">
                    <FiLock className="mx-auto mb-1" />
                    Login required to comment
                  </div>
                )}

              </div>
            </div>
          </div>
        )}

      </div>
    </>
  );
};

export default GalleryPage;