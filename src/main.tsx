import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { LangProvider } from "./i18n/LangContext";
import { App } from "./App";
import "./styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LangProvider>
      <App />
    </LangProvider>
  </StrictMode>
);
