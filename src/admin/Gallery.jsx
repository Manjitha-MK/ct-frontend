import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import AdminLayout from "../components/AdminLayout";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [imageTitle, setImageTitle] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);

  const fileInputRef = useRef(null);
  const API = import.meta.env.VITE_API_URL;

  // ---------------- FETCH IMAGES ----------------
  const fetchImages = async () => {
    const res = await axios.get(
      `${API}/api/gallery`
    );
    setImages(res.data);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // ---------------- UPLOAD ----------------
  const handleUpload = async () => {
    if (!image) {
      alert("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("imageTitle", imageTitle);
    formData.append("image", image);

    await axios.post(
      `${API}/api/gallery`,
      formData
    );

    alert("Image Uploaded Successfully");

    // reset fields
    setImageTitle("");
    setImage(null);
    setPreview(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    fetchImages();
  };

  // ---------------- DELETE ----------------
  const deleteImage = async (id) => {
    await axios.delete(
      `import.meta.env.VITE_API_URL/api/gallery/${id}`
    );

    fetchImages();
  };

  // ---------------- OPEN MODAL ----------------
  const openImage = (item) => {
    const index = images.findIndex(
      (img) => img._id === item._id
    );

    setSelectedImage(item);
    setCurrentIndex(index);
  };

  // ---------------- NEXT IMAGE ----------------
  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(nextIndex);
    setSelectedImage(images[nextIndex]);
  };

  // ---------------- PREV IMAGE ----------------
  const handlePrev = () => {
    const prevIndex =
      (currentIndex - 1 + images.length) %
      images.length;

    setCurrentIndex(prevIndex);
    setSelectedImage(images[prevIndex]);
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">
        Team Gallery
      </h1>

      {/* ---------------- UPLOAD FORM ---------------- */}
      <div className="bg-white p-6 rounded shadow mb-6">

        <input
          type="text"
          placeholder="Image Title"
          value={imageTitle}
          onChange={(e) =>
            setImageTitle(e.target.value)
          }
          className="border p-2 mr-2 mb-2 rounded-2xl w-64"
        />

        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => {
            const file = e.target.files[0];

            if (!file) return;

            if (!file.type.startsWith("image/")) {
              alert("Only image files allowed");
              return;
            }

            setImage(file);

            if (preview) {
              URL.revokeObjectURL(preview);
            }

            setPreview(
              URL.createObjectURL(file)
            );
          }}
        />

        {/* Preview */}
        {preview && (
          <div className="mt-4">
            <p className="text-sm mb-2">
              Preview:
            </p>

            <img
              src={preview}
              alt="preview"
              className="w-48 h-32 object-cover rounded border"
            />
          </div>
        )}

        <button
          onClick={handleUpload}
          className="bg-green-500 text-white px-4 py-2 rounded ml-2 mt-2"
        >
          Upload
        </button>
      </div>

      {/* ---------------- GALLERY GRID ---------------- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {images.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded shadow p-4"
          >
            <img
              src={item.imageUrl}
              alt={item.imageTitle}
              className="w-full h-52 object-cover rounded cursor-pointer"
              onClick={() => openImage(item)}
            />

            <h3 className="font-bold mt-3">
              {item.imageTitle}
            </h3>

            <button
              onClick={() =>
                deleteImage(item._id)
              }
              className="mt-3 bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* ---------------- MODAL (SWIPE VIEWER) ---------------- */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >

          {/* CLOSE BUTTON (MOBILE SAFE) */}
          <button
            className="fixed top-4 right-4 z-[100] bg-black bg-opacity-70 text-white w-10 h-10 rounded-full flex items-center justify-center text-xl"
            onClick={() =>
              setSelectedImage(null)
            }
          >
            ✕
          </button>

          {/* PREV BUTTON */}
          <button
            className="absolute left-4 text-white text-3xl bg-black bg-opacity-50 px-3 py-1 rounded"
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
          >
            ‹
          </button>

          {/* IMAGE */}
          <div
            className="max-w-4xl w-full px-4"
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            <img
              src={selectedImage.imageUrl}
              alt={selectedImage.imageTitle}
              className="w-full max-h-[80vh] object-contain rounded"
            />

            <div className="text-center text-white mt-3">
              <h2 className="text-lg font-bold">
                {selectedImage.imageTitle}
              </h2>

              <p className="text-sm text-gray-300">
                Uploaded by{" "}
                {selectedImage.uploadedBy}
              </p>
            </div>
          </div>

          {/* NEXT BUTTON */}
          <button
            className="absolute right-4 text-white text-3xl bg-black bg-opacity-50 px-3 py-1 rounded"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
          >
            ›
          </button>

        </div>
      )}

    </AdminLayout>
  );
};

export default Gallery;