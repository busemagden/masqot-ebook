
// Payment service utilities for e-commerce
import { BookType } from '@/types/book';
import { createPaytrPaymentLink, paytrConfig, usePaytrLink } from './paytr';
import { toast } from 'sonner';

// Sepet öğelerini PayTR formatına dönüştür
const formatCartItemsForPaytr = (items: Array<{id: number, title: string, price: string}>) => {
  return items.map(item => ({
    name: item.title,
    category: 'Kitap',
    price: Math.round(parseFloat(item.price.replace(/[^\d.-]/g, '')) * 100), // TL -> Kuruş
  }));
};

// Unique sipariş ID'si oluştur
const generateOrderId = () => {
  return `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
};

// Ödeme işlemini başlat
export const initiateCheckout = async (items: Array<{id: number, title: string, price: string}>) => {
  try {
    // Toplam tutarı hesapla (kuruş cinsinden)
    const totalAmount = items.reduce((total, item) => {
      return total + Math.round(parseFloat(item.price.replace(/[^\d.-]/g, '')) * 100);
    }, 0);
    
    // Kullanıcı email bilgisi (gerçek uygulamada kullanıcıdan veya Clerk'tan alınmalı)
    const userEmail = "customer@example.com";
    
    // Sepeti hazırla
    const basketItems = formatCartItemsForPaytr(items);
    
    // Sipariş ID'si oluştur
    const orderId = generateOrderId();
    
    // Demo amacıyla consola yazdırma
    console.log('Ödeme başlatılıyor:', {
      totalAmount,
      basketItems,
      orderId
    });
    
    // Paytr link kullanma seçeneği
    const useDirectLink = true; // Bu değişkeni true yaparak direkt linki kullanabilirsiniz
    
    if (useDirectLink) {
      // Direkt olarak sabit PayTR linkini kullan (siz verdiniz)
      const paytrDirectLink = "https://www.paytr.com/link/L7JOl3u";
      usePaytrLink(paytrDirectLink);
      
      return {
        success: true,
        message: 'Ödeme sayfası açıldı'
      };
    }
    
    // PayTR API'si boş olduğunda uyarı
    if (!paytrConfig.merchantId || !paytrConfig.merchantKey || !paytrConfig.merchantSalt) {
      console.warn('PayTR konfigürasyonu eksik. Demo modu aktif.');
      
      // Demo sonucu dön
      return {
        success: true,
        message: 'Demo modu: Ödeme bağlantısı oluşturuldu (gerçek değil)'
      };
    }
    
    // PayTR ile ödeme bağlantısı oluştur
    const paytrResponse = await createPaytrPaymentLink({
      orderId,
      totalAmount,
      basketItems,
      userEmail
    });
    
    // Yanıt başarılı ise
    if (paytrResponse.status === 'success' && paytrResponse.paymentUrl) {
      // Yeni pencerede ödeme sayfasını aç
      window.open(paytrResponse.paymentUrl, '_blank');
      
      return {
        success: true,
        message: 'Ödeme sayfası açıldı'
      };
    } else {
      // Hata oluştuğunda
      return {
        success: false,
        message: paytrResponse.reason || 'Ödeme başlatılamadı'
      };
    }
  } catch (error) {
    console.error('Ödeme başlatma hatası:', error);
    return {
      success: false,
      message: 'Bir hata oluştu, lütfen daha sonra tekrar deneyin'
    };
  }
};

// Başarılı ödeme sonrası işlemler
export const processSuccessfulPayment = (orderId: string) => {
  // Burada sipariş tamamlandığında yapılacak işlemler yer alabilir
  toast.success("Ödeme başarıyla tamamlandı", {
    description: `Sipariş numaranız: ${orderId}`
  });
  
  return {
    success: true,
    orderId
  };
};

// Başarısız ödeme sonrası işlemler
export const processFailedPayment = (orderId: string, reason: string) => {
  toast.error("Ödeme işlemi başarısız", {
    description: reason || "Ödeme sırasında bir hata oluştu"
  });
  
  return {
    success: false,
    orderId,
    reason
  };
};
