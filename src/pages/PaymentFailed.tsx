
import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { processFailedPayment } from "@/services/payment";

const PaymentFailed = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    // URL'den query parametrelerini al
    const queryParams = new URLSearchParams(location.search);
    const merchantOid = queryParams.get('merchant_oid');
    const reason = queryParams.get('failed_reason_msg') || "Ödeme işlemi tamamlanamadı";
    
    if (merchantOid) {
      // Başarısız ödeme işlemlerini yap
      processFailedPayment(merchantOid, reason);
    }
  }, [location]);

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
            <div className="h-24 w-24 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="h-12 w-12 text-red-500" />
            </div>
          </div>
          
          <h2 className="text-3xl font-bold mb-4">Ödeme Başarısız</h2>
          <p className="text-lg text-gray-600 mb-8">
            Ödeme işlemi sırasında bir sorun oluştu. Lütfen tekrar deneyiniz veya farklı bir ödeme yöntemi kullanınız.
          </p>
          
          <div className="space-y-4">
            <Button 
              className="w-full bg-masqot-primary hover:bg-masqot-secondary"
              onClick={() => navigate("/payment")}
            >
              Tekrar Dene
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Geri Dön
            </Button>
          </div>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PaymentFailed;
