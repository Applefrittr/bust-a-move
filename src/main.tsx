import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import RouteSwitch from "./components/RouteSwitch.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouteSwitch />
  </StrictMode>
);
