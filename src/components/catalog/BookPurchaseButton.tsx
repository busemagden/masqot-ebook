
import { ShoppingCart, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
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
  const { addItem } = useCart();

  const handlePurchase = () => {
    // Find the book in the catalog and add it to cart
    const book = bookCatalog.find(book => book.id === bookId);
    if (book) {
      console.log('Adding book to cart:', book);
      addItem(book);
      onAddToCart(); // Keep the original callback for compatibility
    } else {
      console.error('Book not found in catalog:', bookId);
      toast.error("Kitap kataloğda bulunamadı");
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
