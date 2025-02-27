import React from "react";
import ToastProvider, { useToast } from "./components/ToastProvider";

const Demo = () => {
  const { addToast } = useToast();

  return (
    <div>
      <h1>Toast Notification Demo</h1>
      <button onClick={() => addToast("Success Message", "success")}>Success</button>
      <button onClick={() => addToast("Info Message", "info")}>Info</button>
      <button onClick={() => addToast("Warning Message", "warning")}>Warning</button>
      <button onClick={() => addToast("Error Message", "error")}>Error</button>
    </div>
  );
};

const App = () => (
  <ToastProvider>
    <Demo />
  </ToastProvider>
);

export default App;