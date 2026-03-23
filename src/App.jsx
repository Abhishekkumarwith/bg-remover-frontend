import axios from "axios";
import { useState } from "react";
import { FiDownload, FiUploadCloud } from "react-icons/fi";
import imageCompression from "browser-image-compression";

export default function App() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dark, setDark] = useState(true);

  const handleImage = async (file) => {
    if (!file) return;

    try {
      const compressed = await imageCompression(file, {
        maxSizeMB: 1,
        maxWidthOrHeight: 1024,
        useWebWorker: true,
      });

      const url = URL.createObjectURL(compressed);
      setImage(compressed);
      setPreview(url);
      setResult(null);
    } catch (err) {
      alert("Image processing failed");
    }
  };

  const handleUpload = async () => {
    if (!image) {
      alert("Please upload an image first");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await axios.post(
        "https://bg-remover-backend-pb8j.onrender.com/remove-bg",
        formData,
        {
          responseType: "blob",
          timeout: 60000,
        },
      );

      const url = URL.createObjectURL(res.data);
      setResult(url);
    } catch (err) {
      console.error(err);
      alert(
        err.response?.data?.message ||
          "Server busy or waking up. Try again in a few seconds.",
      );
    }

    setLoading(false);
  };

  const bg = dark ? "bg-gray-950 text-white" : "bg-gray-50 text-gray-900";
  const subText = dark ? "text-gray-400" : "text-gray-500";

  return (
    <div className={`${bg} min-h-screen transition-all`}>
      <nav
        className={`flex justify-between items-center px-6 py-4 border-b ${
          dark ? "border-gray-800" : "border-gray-200 bg-white/70 backdrop-blur"
        }`}
      >
        <h1 className="text-xl font-semibold">AutoBG Remover</h1>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setDark(!dark)}
            className={`px-3 py-1.5 rounded-lg text-sm border ${
              dark
                ? "border-gray-600 hover:bg-gray-800"
                : "border-gray-300 hover:bg-gray-100"
            }`}
          >
            {dark ? "Light" : "Dark"}
          </button>

          <button
            className={`px-4 py-1.5 rounded-lg text-sm font-medium ${
              dark ? "bg-white text-black" : "bg-black text-white"
            }`}
          >
            Login
          </button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-12 flex flex-col items-center">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-3 leading-tight">
            Remove Image <span className="text-indigo-500">Background</span>{" "}
            Instantly
          </h2>

          <p className={`text-sm ${subText}`}>
            Upload your image and get{" "}
            <span className="text-indigo-500 font-medium">clean output</span> in
            seconds
          </p>
        </div>

        <div
          className={`relative group w-full max-w-xl border rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 ${
            dark
              ? "bg-gray-900 border-gray-700 shadow-lg shadow-black/40 hover:shadow-xl hover:border-indigo-500"
              : "bg-white border-gray-200 shadow-md hover:shadow-xl hover:border-indigo-400"
          }`}
        >
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImage(e.target.files[0])}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />

          <div className="flex flex-col items-center justify-center gap-3">
            <FiUploadCloud
              size={42}
              className="text-indigo-500 transition-transform duration-300 group-hover:scale-110"
            />

            <p className="text-lg font-semibold">Click to upload image</p>

            <p className={`text-sm ${subText}`}>PNG, JPG up to 1MB</p>
          </div>
        </div>

        {/* Upload Button */}
        {preview && !result && (
          <button
            onClick={handleUpload}
            className={`mt-6 px-6 py-2.5 rounded-xl text-sm font-medium ${
              dark
                ? "bg-white text-black hover:bg-gray-200"
                : "bg-black text-white hover:bg-gray-800"
            }`}
          >
            Remove Background
          </button>
        )}

        {loading && !result && (
          <p className="mt-4 text-sm opacity-70 animate-pulse">
            Processing image... (server may take few seconds to start)
          </p>
        )}

        {(preview || result) && (
          <div className="grid md:grid-cols-2 gap-8 mt-14 items-start">
            {preview && (
              <div
                className={`rounded-2xl p-2 shadow-md hover:shadow-xl transition ${
                  dark ? "bg-gray-900" : "bg-white"
                }`}
              >
                <img src={preview} className="w-full rounded-xl" />
              </div>
            )}

            {result && (
              <div>
                <div
                  className={`rounded-2xl p-2 shadow-md hover:shadow-xl transition ${
                    dark ? "bg-gray-900" : "bg-white"
                  }`}
                >
                  <img src={result} className="w-full rounded-xl" />
                </div>

                <div className="flex justify-center mt-5">
                  <a
                    href={result}
                    download="final-image.png"
                    className={`flex items-center gap-2 px-6 py-2.5 text-sm rounded-xl font-medium ${
                      dark
                        ? "bg-white text-black hover:bg-gray-200"
                        : "bg-black text-white hover:bg-gray-800"
                    }`}
                  >
                    <FiDownload size={16} />
                    Download Image
                  </a>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
