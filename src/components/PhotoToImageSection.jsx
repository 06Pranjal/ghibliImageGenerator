import { useState } from "react";
import UploadIcon from "./UploadIcon";

const PhotoToImageSection = ({ onGenerate }) => {
  const [image, setImage] = useState(null);
  const [prompt, setPrompt] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (image && prompt) {
      onGenerate(image, prompt);
    }
  };

  return (
    <div className="p-4 border rounded shadow-md">
      <h2 className="text-lg font-bold mb-2">Transform Photo into Ghibli Style</h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        <label className="flex flex-col items-center justify-center border-2 border-dashed rounded p-4 cursor-pointer">
          <UploadIcon />
          <span className="text-sm text-gray-600">Click to upload an image</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </label>
        <textarea
          className="w-full border rounded p-2"
          placeholder="Enter a prompt..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Generate
        </button>
      </form>
    </div>
  );
};

export default PhotoToImageSection;
