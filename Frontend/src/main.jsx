import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { LanguageProvider } from "./i18n/LanguageContext";
import { OrgDataProvider } from "./context/OrgDataContext";
import "./styles/global.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <OrgDataProvider>
          <App />
        </OrgDataProvider>
      </LanguageProvider>
    </BrowserRouter>
  </StrictMode>
);
