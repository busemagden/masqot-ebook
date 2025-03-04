
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Mail, Lock, User, ArrowRight } from "lucide-react";
import { Label } from "@/components/ui/label";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useUser, useClerk, SignIn } from "@clerk/clerk-react";
import { toast } from "sonner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { isSignedIn, user } = useUser();
  const { signOut } = useClerk();
  const navigate = useNavigate();

  // Redirect if already logged in
  if (isSignedIn) {
    navigate("/my-books");
    return null;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // This functionality will be handled by Clerk
      toast.info("Giriş sayfasına yönlendiriliyorsunuz", {
        duration: 2000,
      });
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Giriş yapılırken bir hata oluştu");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // This functionality will be handled by Clerk
      toast.info("Kayıt sayfasına yönlendiriliyorsunuz", {
        duration: 2000,
      });
    } catch (error) {
      console.error("Register error:", error);
      toast.error("Kayıt olurken bir hata oluştu");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-masqot-soft">
      <Header />
      
      <main className="flex-grow flex items-center justify-center p-4 py-16">
        <div className="w-full max-w-md animate-fade-in">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="login">Giriş Yap</TabsTrigger>
              <TabsTrigger value="register">Kayıt Ol</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <Card className="glass-card">
                <CardHeader className="space-y-1">
                  <CardTitle className="text-2xl font-serif text-center">Hoş Geldiniz</CardTitle>
                  <CardDescription className="text-center">
                    E-kitaplarınıza erişmek için giriş yapın
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <SignIn />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="register">
              <Card className="glass-card">
                <CardHeader className="space-y-1">
                  <CardTitle className="text-2xl font-serif text-center">Hesap Oluştur</CardTitle>
                  <CardDescription className="text-center">
                    Yeni bir hesap oluşturarak e-kitaplara erişmeye başlayın
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <SignIn />
                </CardContent>
                <CardFooter className="flex justify-center">
                  <p className="text-sm text-center text-muted-foreground">
                    Kayıt olarak, 
                    <Link to="/kullanim-kosullari" className="text-masqot-primary hover:underline mx-1">
                      Kullanım Koşullarını
                    </Link>
                    kabul etmiş olursunuz.
                  </p>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;
