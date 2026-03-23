import { useState } from "react";

export default function Controls() {
  const [size, setSize] = useState("passport");

  return (
    <div className="bg-white rounded-xl shadow p-5">
      <h3 className="font-semibold text-gray-700 mb-4">
        Resize Options
      </h3>

      {/* Select */}
      <select
        className="w-full border rounded-lg p-2 mb-4"
        value={size}
        onChange={(e) => setSize(e.target.value)}
      >
        <option value="passport">Passport (35x45 mm)</option>
        <option value="youtube">YouTube Profile</option>
        <option value="instagram">Instagram DP</option>
        <option value="custom">Custom</option>
      </select>

      {/* Quick Options */}
      <div className="space-y-2 mb-4">
        <div className="border rounded-lg p-3 flex justify-between">
          <span>📺 YouTube Profile</span>
          <span className="text-xs text-green-600">Print Ready</span>
        </div>

        <div className="border rounded-lg p-3">
          📸 Instagram DP
        </div>

        <div className="border rounded-lg p-3">Custom</div>
      </div>

      {/* Background */}
      <p className="text-sm text-gray-500 mb-2">Background</p>
      <div className="flex gap-3 mb-5">
        <button className="border px-3 py-1 rounded-lg bg-blue-50">
          Transparent
        </button>
        <button className="border px-3 py-1 rounded-lg">
          White
        </button>
      </div>

      {/* Print Button */}
      <button
        onClick={() => window.print()}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg"
      >
        Print Now
      </button>
    </div>
  );
}