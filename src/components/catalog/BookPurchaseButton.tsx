
import { ShoppingCart, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@clerk/clerk-react";
import { useCart } from "@/contexts/CartContext";
import { bookCatalog } from "@/data/bookCatalog";

interface BookPurchaseButtonProps {
  isComingSoon: boolean;
  onAddToCart: () => void;
  price: string;
  bookTitle: string;
  bookId: number;
}

const BookPurchaseButton = ({ 
  isComingSoon, 
  onAddToCart, 
  price,
  bookTitle,
  bookId
}: BookPurchaseButtonProps) => {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();
  const { addItem } = useCart();

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

    // Find the book in the catalog and add it to cart
    const book = bookCatalog.find(book => book.id === bookId);
    if (book) {
      addItem(book);
      onAddToCart(); // Keep the original callback for compatibility
    }
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
