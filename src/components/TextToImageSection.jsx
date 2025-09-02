import { useState } from "react";
import ErrorMessage from "./ErrorMessage.jsx";
import Spinner from "./Spinner.jsx";
import { Download, FileText } from "lucide-react";
import GhibliStyleDropdown from "./GhibliStyleDropdown.jsx";

const TextToImageSection = () => {
  const [generatedImage, setGeneratedImage] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("general");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const isCreateDisabled = isLoading || !prompt.trim();

  return (
    <div className="relative">
      {error && <ErrorMessage message={error} onClose={() => setError(null)} />}

      <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg flex flex-col max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Text to Ghibli Art</h2>

        {/* Preview area */}
        <div className="w-full h-80 flex justify-center items-center border-2 border-gray-200 rounded-xl bg-gray-50 mb-6">
          {isLoading ? (
            <Spinner />
          ) : generatedImage ? (
            <img
              src={generatedImage}
              alt="Generated Ghibli art"
              className="h-full w-full object-contain"
            />
          ) : (
            <div className="text-center text-gray-500">
              <FileText size={48} className="mx-auto text-gray-400 mb-4" />
              <p>Generate Ghibli Art from your text description</p>
            </div>
          )}
        </div>

        {/* Input area - only show if no image yet */}
        {!generatedImage && (
          <>
            <div className="space-y-4">
              <GhibliStyleDropdown
                value={style}
                onChange={(e) => setStyle(e.target.value)}
              />
              <div>
                <label
                  htmlFor="prompt-text"
                  className="text-md font-semibold mb-2 block"
                >
                  Your Description
                </label>
                <textarea
                  id="prompt-text"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  rows="3"
                  placeholder="Describe what you want to see in Ghibli art..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
              </div>
            </div>

            {/* Generate button */}
            <button
              disabled={isCreateDisabled}
              className="mt-6 bg-orange-900 text-white font-bold py-3 px-6 rounded-lg hover:bg-orange-800 transition-colors"
            >
              {isLoading ? "Generating..." : "Generate Ghibli Art"}
            </button>
          </>
        )}

        {/* Download button */}
        {generatedImage && (
          <div className="mt-6 flex gap-4">
            <button className="flex-1 bg-gray-200 text-gray-800 font-bold py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors">
              <Download size={20} className="inline mr-2" /> Download
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TextToImageSection;
