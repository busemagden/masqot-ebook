
import React from "react";
import ReactDOM from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

// Clerk API anahtarını tanımlayalım
const PUBLISHABLE_KEY = "pk_test_Y2F1c2FsLWhvZy02OS5jbGVyay5hY2NvdW50cy5kZXYk";

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key");
}

// Üretim ortamı için domain ayarlarını ekleyelim
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || PUBLISHABLE_KEY;

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ClerkProviderWithRoutes />
    </BrowserRouter>
  </React.StrictMode>
);

// Create a wrapper component to access react-router's navigate function
function ClerkProviderWithRoutes() {
  const navigate = useNavigate();
  
  return (
    <ClerkProvider 
      publishableKey={clerkPubKey}
      afterSignOutUrl="/"
      navigationFn={(to) => navigate(to)}
      routing="path"
    >
      <App />
    </ClerkProvider>
  );
}
