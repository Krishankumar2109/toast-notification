import React, { createContext, useContext, useState } from "react";


import { motion, AnimatePresence } from "framer-motion";
import "../styles/Toast.css"; 

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = "info", duration = 3000, action = null) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type, duration, action }]);

    if (duration > 0) {
      setTimeout(() => removeToast(id), duration);
    }
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="toast-container">
        <AnimatePresence>
          {toasts.map(({ id, message, type, action }) => (
            <motion.div
              key={id}
              className={`toast toast-${type}`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <span>{message}</span>
              {action && (
                <button className="toast-action" onClick={() => action()}>Action</button>
              )}
              <button className="toast-close" onClick={() => removeToast(id)}>
                ✖
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export default ToastProvider;