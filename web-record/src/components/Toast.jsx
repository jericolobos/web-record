// src/components/Toast.jsx
import { useEffect } from "react";

function Toast({ message, type, onClose }) {
  useEffect(() => {
    // Automatically close the toast after 3 seconds
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className={`toast toast-${type}`}>
      {type === "success" ? "✅" : "🗑️"} {message}
    </div>
  );
}

export default Toast;
