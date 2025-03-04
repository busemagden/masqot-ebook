
import { useState } from "react";
import { Link } from "react-router-dom";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader } from "@/components/ui/card";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import SocialLogin from "@/components/auth/SocialLogin";

const Login = () => {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-masqot-soft">
      <Header />
      
      <main className="flex-grow flex items-center justify-center p-4 py-16">
        <div className="w-full max-w-md animate-fade-in">
          <Card className="glass-card p-6 rounded-lg shadow-md bg-white/80 backdrop-blur-md">
            <CardHeader className="p-0 pb-6">
              <h1 className="text-2xl font-serif text-center">
                {activeTab === "login" ? "Hoş Geldiniz" : "Hesap Oluştur"}
              </h1>
            </CardHeader>
            
            <SignedOut>
              <Tabs 
                defaultValue="login" 
                value={activeTab} 
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="login">Giriş</TabsTrigger>
                  <TabsTrigger value="register">Kayıt</TabsTrigger>
                </TabsList>
                
                <TabsContent value="login">
                  <LoginForm />
                </TabsContent>
                
                <TabsContent value="register">
                  <RegisterForm />
                </TabsContent>
              </Tabs>
            </SignedOut>
            
            <SignedIn>
              <div className="py-8 text-center">
                <h2 className="text-xl font-medium text-gray-800 mb-2">Zaten giriş yapmışsınız</h2>
                <p className="text-gray-600 mb-4">
                  Kitap koleksiyonunuza göz atmak ister misiniz?
                </p>
                <Link 
                  to="/my-books"
                  className="inline-block bg-masqot-primary hover:bg-masqot-secondary text-white px-4 py-2 rounded-md transition-colors"
                >
                  Kitaplarım
                </Link>
              </div>
            </SignedIn>
            
            <div className="mt-6 text-center text-sm text-gray-500">
              {activeTab === "login" ? (
                <p>
                  Hesabınız yok mu?{" "}
                  <Link 
                    to="#" 
                    onClick={() => setActiveTab("register")} 
                    className="text-masqot-primary hover:underline"
                  >
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
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;
