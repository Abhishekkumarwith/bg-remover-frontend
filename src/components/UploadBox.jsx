export default function UploadBox({ setImage }) {
  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) setImage(URL.createObjectURL(file));
  };

  return (
    <div className="text-center mt-20">
      <h1 className="text-4xl font-bold text-gray-800">
        Remove Image Background
      </h1>
      <p className="text-gray-500 mt-3">
        Get a transparent background in seconds
      </p>

      <div className="mt-10 bg-white p-10 rounded-xl shadow-md border border-dashed max-w-xl mx-auto">
        <input type="file" onChange={handleUpload} />
        <p className="text-gray-400 mt-3">or drag & drop a file</p>
      </div>
    </div>
  );
}