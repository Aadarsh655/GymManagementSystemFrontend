const ErrorAlert = ({ message, onClose }) => {
    return (
      <div className="flex items-center justify-between p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg border border-red-300">
        <span>{message}</span>
        <button
          onClick={onClose}
          className="ml-4 text-red-700 hover:text-red-900"
          aria-label="Close"
        >
          &times;
        </button>
      </div>
    );
  };
  
  export default ErrorAlert;
  