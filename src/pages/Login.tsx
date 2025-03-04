
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignIn } from "@clerk/clerk-react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const Login = () => {
  const [activeTab, setActiveTab] = useState("login");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-masqot-soft">
      <Header />
      
      <main className="flex-grow flex items-center justify-center p-4 py-16">
        <div className="w-full max-w-md animate-fade-in">
          <div className="glass-card p-6 rounded-lg shadow-md bg-white/80 backdrop-blur-md">
            <h1 className="text-2xl font-serif text-center mb-6">
              {activeTab === "login" ? "Hoş Geldiniz" : "Hesap Oluştur"}
            </h1>
            
            <SignIn 
              routing="path" 
              path="/login"
              redirectUrl="/my-books"
              appearance={{
                elements: {
                  rootBox: "w-full mx-auto",
                  card: "shadow-none bg-transparent",
                  headerTitle: "hidden",
                  headerSubtitle: "hidden",
                  socialButtonsBlockButton: "bg-white hover:bg-gray-50",
                  formButtonPrimary: "bg-masqot-primary hover:bg-masqot-secondary",
                  footerAction: "text-masqot-primary hover:text-masqot-secondary"
                }
              }}
            />
            
            <div className="mt-6 text-center text-sm text-gray-500">
              {activeTab === "login" ? (
                <p>
                  Hesabınız yok mu?{" "}
                  <Link to="/sign-up" className="text-masqot-primary hover:underline">
                    Kayıt olun
                  </Link>
                </p>
              ) : (
                <p>
                  Kayıt olarak,{" "}
                  <Link to="/kullanim-kosullari" className="text-masqot-primary hover:underline">
                    Kullanım Koşullarını
                  </Link>{" "}
                  kabul etmiş olursunuz.
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;
