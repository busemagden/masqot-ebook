
import React from "react";
import ReactDOM from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import App from "./App";
import "./index.css";

// Clerk API anahtarını tanımlayalım
const PUBLISHABLE_KEY = "pk_test_Y2F1c2FsLWhvZy02OS5jbGVyay5hY2NvdW50cy5kZXYk";

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key");
}

// Üretim ortamı için domain ayarlarını ekleyelim
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || PUBLISHABLE_KEY;
const domain = window.location.hostname === "ebook.masqot.co" ? "ebook.masqot.co" : undefined;

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ClerkProvider 
      publishableKey={clerkPubKey}
      afterSignOutUrl="/"
      {...(domain ? { domain } : {})}
    >
      <App />
    </ClerkProvider>
  </React.StrictMode>
);
