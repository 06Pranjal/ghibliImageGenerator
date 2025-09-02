import { X } from "lucide-react";

const ErrorMessage = ({ message, onClose }) => {
  return (
    <div
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 flex items-center justify-between"
      role="alert"
    >
      <span className="block sm:inline">{message}</span>
      <button
        type="button"
        onClick={onClose}
        className="ml-4 text-red-700 hover:text-red-900 transition-colors"
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default ErrorMessage;
