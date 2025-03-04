
import { ShoppingCart, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";

interface BookPurchaseButtonProps {
  isComingSoon: boolean;
  onAddToCart: () => void;
  price: string;
  bookTitle: string;
}

const BookPurchaseButton = ({ 
  isComingSoon, 
  onAddToCart, 
  price,
  bookTitle
}: BookPurchaseButtonProps) => {
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const navigate = useNavigate();

  const handlePurchase = () => {
    if (!isSignedIn) {
      toast.error("Giriş yapmanız gerekiyor", {
        description: "Kitap satın almak için önce giriş yapmalısınız.",
        action: {
          label: "Giriş Yap",
          onClick: () => navigate("/login")
        }
      });
      return;
    }

    // Kullanıcı giriş yapmışsa satın alma işlemine devam et
    onAddToCart();
    toast.success(`${bookTitle} sepete eklendi`, {
      description: "Ödeme sayfasına gitmek için sepeti ziyaret edin.",
    });
  };

  return (
    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
      <span className="text-lg font-bold text-masqot-primary">
        {price}
      </span>
      {isComingSoon ? (
        <Button
          className="bg-gray-400 hover:bg-gray-500 text-white transition-all duration-300"
          disabled={true}
        >
          <Clock className="mr-2 h-4 w-4" />
          Yakında
        </Button>
      ) : !isSignedIn ? (
        <Button
          className="bg-masqot-primary hover:bg-masqot-secondary text-white transition-all duration-300"
          onClick={() => navigate("/login")}
        >
          <User className="mr-2 h-4 w-4" />
          Giriş Yap
        </Button>
      ) : (
        <Button
          className="bg-masqot-primary hover:bg-masqot-secondary text-white transition-all duration-300"
          onClick={handlePurchase}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Satın Al
        </Button>
      )}
    </div>
  );
};

export default BookPurchaseButton;
