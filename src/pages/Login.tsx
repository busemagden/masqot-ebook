
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Mail, Lock, User, ArrowRight, Github, Mail as MailIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { toast } from "sonner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const navigate = useNavigate();

  useEffect(() => {
    // Kullanıcı zaten giriş yaptıysa, my-books sayfasına yönlendir
    if (localStorage.getItem('isLoggedIn') === 'true') {
      navigate("/my-books");
    }
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Email ve şifre kontrolü
      if (!email || !password) {
        toast.error("Lütfen e-posta ve şifre alanlarını doldurun");
        setIsLoading(false);
        return;
      }

      // Email formatı kontrolü
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        toast.error("Lütfen geçerli bir e-posta adresi girin");
        setIsLoading(false);
        return;
      }

      // Minimum şifre uzunluğu kontrolü
      if (password.length < 6) {
        toast.error("Şifre en az 6 karakter olmalıdır");
        setIsLoading(false);
        return;
      }

      // Demo için basit bir doğrulama
      // Gerçek uygulamada burada kimlik doğrulama yapılacak
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', email);
      
      toast.success("Başarıyla giriş yaptınız!", {
        duration: 2000,
      });
      
      setTimeout(() => {
        navigate("/my-books");
      }, 1000);
    } catch (error) {
      console.error("Giriş hatası:", error);
      toast.error("Giriş yapılırken bir hata oluştu");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Tüm alanların doldurulduğunu kontrol et
      if (!email || !password || !name) {
        toast.error("Lütfen tüm alanları doldurun");
        setIsLoading(false);
        return;
      }

      // Email formatı kontrolü
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        toast.error("Lütfen geçerli bir e-posta adresi girin");
        setIsLoading(false);
        return;
      }

      // Minimum şifre uzunluğu kontrolü
      if (password.length < 6) {
        toast.error("Şifre en az 6 karakter olmalıdır");
        setIsLoading(false);
        return;
      }

      // Demo için basit bir kayıt
      // Gerçek uygulamada burada kayıt işlemi yapılacak
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userName', name);
      
      toast.success("Hesabınız başarıyla oluşturuldu!", {
        duration: 2000,
      });
      
      setTimeout(() => {
        navigate("/my-books");
      }, 1000);
    } catch (error) {
      console.error("Kayıt hatası:", error);
      toast.error("Kayıt olurken bir hata oluştu");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    setIsLoading(true);
    
    try {
      // Demo amaçlı basit bir sosyal giriş simülasyonu
      setTimeout(() => {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', `user@${provider.toLowerCase()}.com`);
        
        toast.success(`${provider} ile başarıyla giriş yaptınız!`, {
          duration: 2000,
        });
        
        setTimeout(() => {
          navigate("/my-books");
        }, 1000);
      }, 1500);
    } catch (error) {
      console.error(`${provider} ile giriş hatası:`, error);
      toast.error(`${provider} ile giriş yapılırken bir hata oluştu`);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-masqot-soft">
      <Header />
      
      <main className="flex-grow flex items-center justify-center p-4 py-16">
        <div className="w-full max-w-md animate-fade-in">
          <Tabs defaultValue="login" className="w-full" onValueChange={setActiveTab}>
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
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="w-full flex items-center justify-center"
                      onClick={() => handleSocialLogin("Google")}
                      disabled={isLoading}
                    >
                      <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      </svg>
                      Google
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="w-full flex items-center justify-center"
                      onClick={() => handleSocialLogin("Github")}
                      disabled={isLoading}
                    >
                      <Github className="mr-2 h-4 w-4" />
                      Github
                    </Button>
                  </div>
                  
                  <div className="relative flex items-center justify-center">
                    <div className="border-t border-gray-200 w-full"></div>
                    <div className="bg-white px-2 text-sm text-gray-500 absolute">ya da</div>
                  </div>

                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">E-posta</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input 
                          id="email" 
                          type="email" 
                          placeholder="name@example.com" 
                          className="pl-10"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
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
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input 
                          id="password" 
                          type="password" 
                          className="pl-10"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-masqot-primary hover:bg-masqot-secondary"
                      disabled={isLoading}
                    >
                      {isLoading ? 
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Giriş Yapılıyor...
                        </span> : 
                        <span className="flex items-center">
                          Giriş Yap <ArrowRight className="ml-2 h-4 w-4" />
                        </span>
                      }
                    </Button>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <p className="text-sm text-center text-muted-foreground">
                    Henüz hesabınız yok mu?{" "}
                    <button 
                      type="button"
                      className="text-masqot-primary hover:underline"
                      onClick={() => setActiveTab("register")}
                    >
                      Kayıt olun
                    </button>
                  </p>
                </CardFooter>
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
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="w-full flex items-center justify-center"
                      onClick={() => handleSocialLogin("Google")}
                      disabled={isLoading}
                    >
                      <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      </svg>
                      Google
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="w-full flex items-center justify-center"
                      onClick={() => handleSocialLogin("Github")}
                      disabled={isLoading}
                    >
                      <Github className="mr-2 h-4 w-4" />
                      Github
                    </Button>
                  </div>
                  
                  <div className="relative flex items-center justify-center">
                    <div className="border-t border-gray-200 w-full"></div>
                    <div className="bg-white px-2 text-sm text-gray-500 absolute">ya da</div>
                  </div>

                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">İsim Soyisim</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input 
                          id="name" 
                          type="text" 
                          placeholder="Adınız Soyadınız" 
                          className="pl-10"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-email">E-posta</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input 
                          id="register-email" 
                          type="email" 
                          placeholder="name@example.com" 
                          className="pl-10"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-password">Şifre</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input 
                          id="register-password" 
                          type="password" 
                          className="pl-10"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-masqot-primary hover:bg-masqot-secondary"
                      disabled={isLoading}
                    >
                      {isLoading ? 
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Kayıt Yapılıyor...
                        </span> : 
                        <span className="flex items-center">
                          Kayıt Ol <ArrowRight className="ml-2 h-4 w-4" />
                        </span>
                      }
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
