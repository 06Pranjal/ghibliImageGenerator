import { useState } from "react";
import UploadIcon from "./UploadIcon";

const PhotoToImageSection = ({ onGenerate }) => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [prompt, setPrompt] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (image && prompt.trim()) {
      onGenerate(image, prompt);
    }
  };

  return (
    <div className="p-6 border rounded-2xl shadow-md bg-white/80 backdrop-blur-sm">
      <h2 className="text-lg font-bold mb-4">Transform Photo into Ghibli Style</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-6 cursor-pointer hover:border-green-400 transition">
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-48 object-contain rounded"
            />
          ) : (
            <>
              <UploadIcon />
              <span className="text-sm text-gray-600 mt-2">
                Click to upload an image
              </span>
            </>
          )}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>

        <textarea
          className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-500"
          placeholder="Enter a prompt..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        <button
          type="submit"
          disabled={!image || !prompt.trim()}
          className={`px-4 py-2 rounded-lg text-white transition ${
            !image || !prompt.trim()
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          Generate
        </button>
      </form>
    </div>
  );
};

export default PhotoToImageSection;
