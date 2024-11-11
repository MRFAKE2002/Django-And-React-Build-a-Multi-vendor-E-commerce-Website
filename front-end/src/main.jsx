// libraries
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

// وارد کردن فایل CSS Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

// وارد کردن فایل JS Bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// وارد کردن فایل CSS FontAwesome
import '@fortawesome/fontawesome-free/css/all.min.css';

// وارد کردن فایل CSS Bootstrap Icons
import 'bootstrap-icons/font/bootstrap-icons.css';

// App
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
      <App />
  </BrowserRouter>
);
