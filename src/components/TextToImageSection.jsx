import { useState } from "react";
import ErrorMessage from "./ErrorMessage.jsx";
import Spinner from "./Spinner.jsx";
import { Aperture, Download, FileText, PlusCircle } from "lucide-react";
import GhibliStyleDropdown from "./GhibliStyleDropdown.jsx";

const TextToImageSection = () => {
  const [generatedImage, setGeneratedImage] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("general");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const isCreateDisabled = isLoading || !prompt.trim();

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError("Please enter a description for your artwork..");
      return;
    }

    setIsLoading(true);
    setError(null);

    // Updated payload to match backend expectations
    const payload = {
      prompt: prompt.trim(),
      style: style,
      aspectRatio: "1:1", // Default aspect ratio
      outputFormat: "png" // Default output format
    };

    console.log("Sending payload:", payload); // Debug log

    try {
      const API_URL = 'http://localhost:8080/api/v1/generate-from-text';
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      console.log("Response status:", response.status); // Debug log

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", errorText); // Debug log
        throw new Error(`Network response was not ok. Status: ${response.status}. Message: ${errorText}`);
      }

      // Check if response is actually an image
      const contentType = response.headers.get('content-type');
      console.log("Response content-type:", contentType); // Debug log

      if (!contentType || !contentType.startsWith('image/')) {
        throw new Error('Response is not an image');
      }

      const resultBlob = await response.blob();
      console.log("Received blob size:", resultBlob.size); // Debug log
      
      if (resultBlob.size === 0) {
        throw new Error('Received empty image data');
      }

      setGeneratedImage(URL.createObjectURL(resultBlob));

    } catch (error) {
      console.error('Error generating image from text:', error);
      setError(`Failed to generate image: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  }

  const handleDownload = () => {
    if (!generatedImage) return;
    
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = `ghibli-art-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const handleCreateAnother = () => {
    // Clean up the previous image URL to prevent memory leaks
    if (generatedImage) {
      URL.revokeObjectURL(generatedImage);
    }
    
    setGeneratedImage(null);
    setPrompt('');
    setStyle('general');
    setError(null);
  }

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
              onClick={handleGenerate}
              disabled={isCreateDisabled}
              className={`mt-6 font-bold py-3 px-6 rounded-lg transition-colors ${
                isCreateDisabled 
                  ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                  : 'bg-orange-900 text-white hover:bg-orange-800'
              }`}
            >
              {isLoading ? "Generating..." : "Generate Ghibli Art"}
            </button>
          </>
        )}

        {/* Download button */}
        {generatedImage && (
          <div className="mt-6 flex gap-4">
            <button 
              onClick={handleDownload} 
              className="flex-1 bg-gray-200 text-gray-800 font-bold py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors items-center justify-center flex"
            >
              <Download size={20} className="mr-2" /> Download
            </button>
            <button 
              onClick={handleCreateAnother} 
              className="flex-1 bg-orange-900 text-white font-bold py-3 px-6 rounded-lg hover:bg-orange-800 transition-colors items-center justify-center flex"
            >
              <PlusCircle size={20} className="mr-2" /> Create Another
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TextToImageSection;