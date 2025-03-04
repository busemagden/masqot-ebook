
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Mail, Lock, User, ArrowRight } from "lucide-react";
import { Label } from "@/components/ui/label";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt with:", { email, password });
    // Burada login işlemi yapılacak
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Register attempt with:", { name, email, password });
    // Burada kayıt işlemi yapılacak
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
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">E-posta</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-masqot-primary" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="ornek@mail.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Şifre</Label>
                        <Link to="/sifremi-unuttum" className="text-xs text-masqot-primary hover:underline">
                          Şifremi Unuttum
                        </Link>
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-masqot-primary" />
                        <Input
                          id="password"
                          type="password"
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    <Button type="submit" className="w-full bg-masqot-primary hover:bg-masqot-secondary">
                      Giriş Yap
                    </Button>
                  </form>
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
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Ad Soyad</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-masqot-primary" />
                        <Input
                          id="name"
                          placeholder="Ad Soyad"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-email">E-posta</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-masqot-primary" />
                        <Input
                          id="register-email"
                          type="email"
                          placeholder="ornek@mail.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-password">Şifre</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-masqot-primary" />
                        <Input
                          id="register-password"
                          type="password"
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    <Button type="submit" className="w-full bg-masqot-primary hover:bg-masqot-secondary">
                      Kayıt Ol
                    </Button>
                  </form>
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
