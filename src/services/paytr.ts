
interface PaytrConfig {
  merchantId: string;
  merchantKey: string;
  merchantSalt: string;
  apiUrl: string;
}

interface PaytrPaymentRequest {
  orderId: string;
  totalAmount: number; // Kuruş cinsinden (100 = 1 TL)
  basketItems: Array<{
    name: string;
    category: string;
    price: number; // Kuruş cinsinden
  }>;
  userEmail: string;
  userIp: string;
  userName?: string;
  userPhone?: string;
  merchantOkUrl: string;
  merchantFailUrl: string;
  userBasket: string;
}

interface PaytrLinkResponse {
  status: string;
  reason?: string;
  token?: string;
  paymentUrl?: string;
}

// Paytr konfigürasyon ayarları
export const paytrConfig: PaytrConfig = {
  merchantId: "XXXXXX", // PayTR merchant ID
  merchantKey: "XXXXXX", // PayTR merchant key
  merchantSalt: "XXXXXX", // PayTR merchant salt
  apiUrl: "https://www.paytr.com/odeme/api/get-token"
};

// Base64 kodlama yardımcı fonksiyonu
const base64Encode = (str: string): string => {
  return btoa(unescape(encodeURIComponent(str)));
};

// Hash oluşturma fonksiyonu
const createHash = async (payload: string, merchantKey: string, merchantSalt: string): Promise<string> => {
  const toBeHashed = payload + merchantSalt;
  return generateSHA256Hash(toBeHashed);
};

// SHA256 hash fonksiyonu
const generateSHA256Hash = async (data: string): Promise<string> => {
  const msgUint8 = new TextEncoder().encode(data);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

// Paytr ile ödeme bağlantısı oluşturma
export const createPaytrPaymentLink = async (
  orderData: Omit<PaytrPaymentRequest, 'userIp' | 'merchantOkUrl' | 'merchantFailUrl' | 'userBasket'>
): Promise<PaytrLinkResponse> => {
  try {
    // Kullanıcı IP adresini al (gerçek uygulamada bu bir API'dan alınmalı)
    const userIp = "127.0.0.1"; // Demo için sabit IP

    // Sepet bilgilerini oluştur
    const userBasket = JSON.stringify(orderData.basketItems.map(item => [
      item.name,
      item.price,
      1 // miktar
    ]));

    // Dönüş URL'leri
    const merchantOkUrl = window.location.origin + "/payment-success";
    const merchantFailUrl = window.location.origin + "/payment-failed";

    // Ödeme isteği oluştur
    const paymentRequest: PaytrPaymentRequest = {
      ...orderData,
      userIp,
      merchantOkUrl,
      merchantFailUrl,
      userBasket
    };

    // Token oluşturmak için gerekli parametreleri ayarla
    const hashStr = `${paytrConfig.merchantId}${paymentRequest.userIp}${paymentRequest.orderId}${paymentRequest.totalAmount}${paymentRequest.userEmail}${userBasket}`;
    const paytrToken = await createHash(hashStr, paytrConfig.merchantKey, paytrConfig.merchantSalt);
    
    // API isteği için veri hazırla
    const requestData = {
      merchant_id: paytrConfig.merchantId,
      user_ip: paymentRequest.userIp,
      merchant_oid: paymentRequest.orderId,
      email: paymentRequest.userEmail,
      payment_amount: paymentRequest.totalAmount,
      paytr_token: paytrToken,
      user_basket: base64Encode(userBasket),
      debug_on: "1", // Geliştirme aşamasında debug modu açık
      no_installment: "0", // Taksit seçenekleri açık
      max_installment: "12", // En fazla 12 taksit
      user_name: paymentRequest.userName || "",
      user_phone: paymentRequest.userPhone || "",
      merchant_ok_url: paymentRequest.merchantOkUrl,
      merchant_fail_url: paymentRequest.merchantFailUrl,
      timeout_limit: "30", // 30 dakika ödeme süresi
      currency: "TL", // Para birimi
      test_mode: "1" // Geliştirme modunda test modu açık
    };

    // API'ya POST isteği gönder
    const response = await fetch(paytrConfig.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    });

    const result = await response.json();

    if (result.status === 'success') {
      return {
        status: 'success',
        token: result.token,
        paymentUrl: `https://www.paytr.com/odeme/guvenli/${result.token}`
      };
    } else {
      return {
        status: 'error',
        reason: result.reason || 'Ödeme başlatılamadı'
      };
    }
  } catch (error) {
    console.error('PayTR ödeme oluşturma hatası:', error);
    return {
      status: 'error',
      reason: 'İşlem sırasında bir hata oluştu'
    };
  }
};

// Ödeme durumunu kontrol etme (callback işlenmesi için)
export const verifyPaytrPayment = async (
  orderParams: {
    merchant_oid: string;
    status: string;
    total_amount: string;
    hash: string;
  }
): Promise<boolean> => {
  // Bu fonksiyon genellikle backend tarafında yapılır
  // Frontend tarafında sadece ödeme sonucu sayfalarına yönlendirme yapılır
  return true; // Demo için her zaman başarılı kabul ediyoruz
};

// Mevcut bir PayTR ödeme linkini kullanma
export const usePaytrLink = (paymentLink: string): void => {
  // Yeni pencerede ödeme linkini aç
  window.open(paymentLink, '_blank');
};
