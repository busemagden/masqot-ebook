import React, { useEffect } from 'react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { X, ShoppingCart, Trash2 } from 'lucide-react';
import { 
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { toast } from "sonner";
import { initiateCheckout } from '@/services/payment';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';

const CartDrawer = () => {
  const { items, removeItem, clearCart, getTotal, itemCount } = useCart();
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();
  
  // Debug log on mount
  useEffect(() => {
    console.log('CartDrawer mounted, items:', items);
  }, [items]);
  
  const handleCheckout = async () => {
    if (!isSignedIn) {
      toast.error("Ödeme yapabilmek için giriş yapmalısınız", {
        action: {
          label: "Giriş Yap",
          onClick: () => navigate("/login")
        }
      });
      return;
    }
    
    if (items.length === 0) {
      toast.error("Sepetinizde ürün bulunmuyor");
      return;
    }
    
    toast.loading("Ödeme başlatılıyor...", { id: "payment-loading" });
    
    try {
      const result = await initiateCheckout(items);
      
      toast.dismiss("payment-loading");
      
      if (result.success) {
        toast.success("Ödeme işlemi başlatıldı", {
          description: result.message || "Ödeme sayfasına yönlendiriliyorsunuz."
        });
      } else {
        toast.error("Ödeme işlemi başlatılamadı", {
          description: result.message || "Bir hata oluştu."
        });
      }
    } catch (error) {
      toast.dismiss("payment-loading");
      toast.error("Bir hata oluştu", {
        description: "Lütfen daha sonra tekrar deneyiniz."
      });
    }
  };
  
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-masqot-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Sepetim</DrawerTitle>
            <DrawerDescription>
              {items.length > 0 
                ? `Sepetinizde ${items.length} ürün bulunuyor.` 
                : 'Sepetiniz boş.'}
            </DrawerDescription>
          </DrawerHeader>
          
          {items.length > 0 ? (
            <div className="p-4 space-y-4">
              {items.map(item => (
                <div key={item.id} className="flex items-center space-x-4 border-b pb-2">
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
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => removeItem(item.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              
              <div className="flex justify-between items-center pt-2">
                <span className="font-bold">Toplam:</span>
                <span className="text-lg font-bold text-masqot-primary">{getTotal()}</span>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center">
              <div className="flex justify-center mb-4">
                <ShoppingCart className="h-12 w-12 text-gray-300" />
              </div>
              <p className="text-gray-500">Sepetinizde henüz ürün bulunmuyor.</p>
              <DrawerClose asChild>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => navigate('/catalog')}
                >
                  Alışverişe Başla
                </Button>
              </DrawerClose>
            </div>
          )}
          
          <DrawerFooter>
            {items.length > 0 && (
              <>
                <Button 
                  className="bg-masqot-primary hover:bg-masqot-secondary text-white w-full"
                  onClick={handleCheckout}
                >
                  Ödeme Yap
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full flex items-center justify-center"
                  onClick={clearCart}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Sepeti Temizle
                </Button>
              </>
            )}
            <DrawerClose asChild>
              <Button variant="outline">Kapat</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CartDrawer;
