import * as React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EditorPage from "./pages/EditorPage/EditorPage";
import { Header } from "./components/Header/Header";
import App from "./App";

import "./setupEnv";
import "./index.css";
import "./app/globals.css";

const showErrorOverlay = (err: Event) => {
  const ErrorOverlay = customElements.get("vite-error-overlay");
  if (!ErrorOverlay) {
    return;
  }
  const overlay = new ErrorOverlay(err);
  const body = document.body;
  if (body !== null) {
    body.appendChild(overlay);
  }
};

window.addEventListener("error", showErrorOverlay);
window.addEventListener("unhandledrejection", ({ reason }) =>
  showErrorOverlay(reason)
);

createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <>
        <Header />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/editor" element={<EditorPage />} />
        </Routes>
      </>
    </BrowserRouter>
  </React.StrictMode>
);
