
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SignIn, SignUp, SignedIn, SignedOut } from "@clerk/clerk-react";
import { CartProvider } from "@/contexts/CartContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Catalog from "./pages/Catalog";
import MyBooks from "./pages/MyBooks";
import Payment from "./pages/Payment";
import Profile from "./pages/Profile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            
            {/* Clerk ile entegre edilmiş kimlik doğrulama rotaları */}
            <Route 
              path="/login" 
              element={
                <SignedOut>
                  <Login />
                </SignedOut>
              } 
            />
            
            <Route 
              path="/sign-up" 
              element={
                <SignedOut>
                  <Login />
                </SignedOut>
              } 
            />
            
            <Route path="/catalog" element={<Catalog />} />
            
            {/* Payment page - only for signed in users */}
            <Route 
              path="/payment" 
              element={
                <>
                  <SignedIn>
                    <Payment />
                  </SignedIn>
                  <SignedOut>
                    <Navigate to="/login" replace />
                  </SignedOut>
                </>
              } 
            />
            
            {/* Sadece giriş yapmış kullanıcılar erişebilir */}
            <Route 
              path="/my-books" 
              element={
                <>
                  <SignedIn>
                    <MyBooks />
                  </SignedIn>
                  <SignedOut>
                    <Navigate to="/login" replace />
                  </SignedOut>
                </>
              } 
            />
            
            {/* Profil sayfası - sadece giriş yapmış kullanıcılar */}
            <Route 
              path="/profile" 
              element={
                <>
                  <SignedIn>
                    <Profile />
                  </SignedIn>
                  <SignedOut>
                    <Navigate to="/login" replace />
                  </SignedOut>
                </>
              } 
            />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
