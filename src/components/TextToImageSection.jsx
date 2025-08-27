import { useState } from "react";
import ErrorMessage from "./ErrorMessage.jsx";
import Spinner from "./Spinner.jsx";
import { Download, FileText, PlusCircle } from "lucide-react";
import GhibliStyleDropdown from "./GhibliStyleDropdown.jsx";

const TextToImageSection = () => {
  const [generatedImage, setGeneratedImage] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("general");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
  <div className="relative">
    {error && <ErrorMessage message={error} onClose={() => setError(null)} />}
    
    <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg flex flex-col max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Text to Ghibli Art</h2>
      
      <div className="w-full h-80 flex justify-center items-center border-2 border-gray-200 rounded-xl bg-gray-50 mb-6">
        {isLoading ? (
          <Spinner />
        ) : (
          generatedImage && (
            <img
              src={generatedImage}
              alt="Generated Ghibli art"
              className="h-full w-full object-contain"
            />
          )
        )}
      </div>
      
      <div className="text-center text-gray-500">
        <FileText size={48} className="mx-auto text-gray-400 mb-4" />
        <p>Generate Ghibli art from your text description</p>
      </div>
    </div>
  </div>
);

};

export default TextToImageSection;