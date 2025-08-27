import TextToImageSection from "./components/TextToImageSection";
import PhotoToImageSection from "./components/PhotoToImageSection";
import './index.css';

function App() {
  const handleTextGenerate = (prompt) => {
    console.log("Generate from text:", prompt);
    // Call backend API here
  };

  const handlePhotoGenerate = (image, prompt) => {
    console.log("Generate from photo:", image, prompt);
    // Call backend API here
  };

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold text-center mb-4">Ghibli Art Generator</h1>
      <TextToImageSection onGenerate={handleTextGenerate} />
      <PhotoToImageSection onGenerate={handlePhotoGenerate} />
    </div>
  );
}

export default App;
