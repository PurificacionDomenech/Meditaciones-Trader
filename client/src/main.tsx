import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const theme = localStorage.getItem("theme");
if (theme === "dark" || (!theme && true)) {
  document.documentElement.classList.add("dark");
}

createRoot(document.getElementById("root")!).render(<App />);
