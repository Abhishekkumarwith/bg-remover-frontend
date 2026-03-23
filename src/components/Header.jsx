export default function Header() {
  return (
    <div className="flex justify-between items-center px-8 py-4 bg-white shadow-sm">
      <h1 className="text-xl font-bold text-gray-800">BgRemover</h1>

      <div className="flex gap-6 text-sm text-gray-600">
        <span>How It Works</span>
        <span>Examples</span>
        <span>Features</span>
      </div>

      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
        Upload Image
      </button>
    </div>
  );
}