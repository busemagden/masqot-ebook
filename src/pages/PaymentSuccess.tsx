
import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { processSuccessfulPayment } from "@/services/payment";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { clearCart } = useCart();
  
  useEffect(() => {
    // URL'den query parametrelerini al
    const queryParams = new URLSearchParams(location.search);
    const merchantOid = queryParams.get('merchant_oid');
    
    if (merchantOid) {
      // Ödeme başarılı ise sepeti temizle
      clearCart();
      
      // Başarılı ödeme işlemlerini yap
      processSuccessfulPayment(merchantOid);
    } else {
      // Sipariş ID bulunamadıysa uyarı göster
      toast.warning("Ödeme bilgileri eksik", {
        description: "Sipariş detayları bulunamadı."
      });
    }
  }, [location, clearCart]);

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
};

export default PaymentSuccess;
