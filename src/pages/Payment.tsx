
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { CheckCircle, ArrowLeft, CreditCard } from "lucide-react";
import { useAuth } from "@clerk/clerk-react";

const Payment = () => {
  const { items, getTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const { isSignedIn } = useAuth();
  
  // Redirect to login if not signed in
  React.useEffect(() => {
    if (!isSignedIn) {
      toast.error("Ödeme sayfasına erişmek için giriş yapmalısınız");
      navigate("/login");
    }
    
    // Redirect to catalog if cart is empty
    if (items.length === 0 && !completed) {
      toast.error("Sepetinizde ürün bulunmuyor");
      navigate("/catalog");
    }
  }, [isSignedIn, items.length, navigate, completed]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!cardNumber || !expiryDate || !cvv || !cardHolder) {
      toast.error("Lütfen tüm alanları doldurunuz");
      return;
    }
    
    // Simple validation for card number format
    if (cardNumber.replace(/\s/g, '').length !== 16) {
      toast.error("Geçerli bir kart numarası giriniz");
      return;
    }
    
    // Process payment
    setProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      setCompleted(true);
      
      // Clear cart after successful payment
      clearCart();
      
      toast.success("Ödeme işlemi başarıyla tamamlandı", {
        description: "Kitaplarınız hesabınıza tanımlandı."
      });
    }, 2000);
  };
  
  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };
  
  // Format expiry date (MM/YY)
  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    
    if (v.length >= 2) {
      return v.slice(0, 2) + (v.length > 2 ? '/' + v.slice(2, 4) : '');
    }
    
    return v;
  };

  if (completed) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-masqot-soft">
        <Header />
        
        <main className="container mx-auto px-4 py-16 flex-grow flex flex-col items-center justify-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-md mx-auto"
          >
            <div className="flex justify-center mb-6">
              <div className="h-24 w-24 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-12 w-12 text-green-500" />
              </div>
            </div>
            
            <h2 className="text-3xl font-bold mb-4">Ödeme Başarılı!</h2>
            <p className="text-lg text-gray-600 mb-8">
              Satın aldığınız kitaplar hesabınıza tanımlanmıştır. Kitaplarım sayfasından erişebilirsiniz.
            </p>
            
            <div className="space-y-4">
              <Button 
                className="w-full bg-masqot-primary hover:bg-masqot-secondary"
                onClick={() => navigate("/my-books")}
              >
                Kitaplarımı Görüntüle
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate("/catalog")}
              >
                Kataloga Dön
              </Button>
            </div>
          </motion.div>
        </main>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-masqot-soft">
      <Header />
      
      <main className="container mx-auto px-4 py-12 flex-grow">
        <div className="mb-6 flex items-center">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="p-2"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Geri
          </Button>
          <h1 className="text-2xl font-bold ml-2">Ödeme</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="mr-2 h-5 w-5" />
                  Kart Bilgileri
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="cardHolder" className="text-sm font-medium">
                      Kart Sahibi
                    </label>
                    <Input
                      id="cardHolder"
                      placeholder="Ad Soyad"
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="cardNumber" className="text-sm font-medium">
                      Kart Numarası
                    </label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                      maxLength={19}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="expiryDate" className="text-sm font-medium">
                        Son Kullanma Tarihi
                      </label>
                      <Input
                        id="expiryDate"
                        placeholder="MM/YY"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                        maxLength={5}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="cvv" className="text-sm font-medium">
                        CVV
                      </label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                        maxLength={3}
                        required
                      />
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-masqot-primary hover:bg-masqot-secondary mt-6"
                    disabled={processing}
                  >
                    {processing ? (
                      <>
                        <span className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                        İşleniyor...
                      </>
                    ) : (
                      "Ödemeyi Tamamla"
                    )}
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="text-sm text-gray-500 flex justify-center">
                <p>Bu bir demo uygulamasıdır. Gerçek ödeme alınmamaktadır.</p>
              </CardFooter>
            </Card>
          </div>
          
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Sipariş Özeti</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {items.map(item => (
                    <div key={item.id} className="flex items-center space-x-4">
                      <div className="w-16 h-16 flex-shrink-0">
                        <img 
                          src={item.cover} 
                          alt={item.title} 
                          className="w-full h-full object-cover rounded-md"
                        />
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-medium line-clamp-1">{item.title}</h4>
                        <p className="text-masqot-primary font-bold">{item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center mb-2">
                    <span>Ara Toplam:</span>
                    <span>{getTotal()}</span>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span>KDV (18%):</span>
                    <span>₺0.00</span>
                  </div>
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Toplam:</span>
                    <span className="text-masqot-primary">{getTotal()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Payment;
