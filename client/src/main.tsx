import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { initWebVitals } from "./lib/webvitals";
import { initAnalytics } from "./lib/analytics";

initWebVitals();
initAnalytics();
createRoot(document.getElementById("root")!).render(<App />);
