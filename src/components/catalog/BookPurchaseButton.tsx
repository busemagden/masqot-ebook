
import { ShoppingCart, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BookPurchaseButtonProps {
  isComingSoon: boolean;
  onAddToCart: () => void;
  price: string;
}

const BookPurchaseButton = ({ 
  isComingSoon, 
  onAddToCart, 
  price 
}: BookPurchaseButtonProps) => {
  return (
    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
      <span className="text-lg font-bold text-masqot-primary">
        {price}
      </span>
      <Button
        className={`${isComingSoon ? 'bg-gray-400 hover:bg-gray-500' : 'bg-masqot-primary hover:bg-masqot-secondary'} text-white transition-all duration-300`}
        onClick={() => !isComingSoon && onAddToCart()}
        disabled={isComingSoon}
      >
        {isComingSoon ? (
          <>
            <Clock className="mr-2 h-4 w-4" />
            Yakında
          </>
        ) : (
          <>
            <ShoppingCart className="mr-2 h-4 w-4" />
            Satın Al
          </>
        )}
      </Button>
    </div>
  );
};

export default BookPurchaseButton;
