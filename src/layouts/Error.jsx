const ErrorAlert = ({ message, onClose, className = "" }) => {
  return (
    <div
      className={`flex items-center justify-between p-4 mb-4 text-sm rounded-lg border ${className} ${
        className.includes("bg-") ? "" : "bg-red-100 text-red-700 border-red-300"
      }`}
    >
      <span>{message}</span>
      <button
        onClick={onClose}
        className="ml-4 hover:text-red-900"
        aria-label="Close"
      >
        &times;
      </button>
    </div>
  );
};

export default ErrorAlert;
