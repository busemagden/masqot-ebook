
import { BookType } from "@/types/book";
import BookRating from "./BookRating";
import BookPurchaseButton from "./BookPurchaseButton";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { motion } from "framer-motion";
import BookBadges, { isBestseller, hasPreview, isComingSoon } from "./BookBadges";

interface BookListViewProps {
  books: BookType[];
  onOpenPreview: (bookId: number) => void;
  onAddToCart: (bookId: number, bookTitle: string) => void;
}

const BookListView = ({ books, onOpenPreview, onAddToCart }: BookListViewProps) => {
  if (books.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">Arama kriterlerine uygun kitap bulunamadı.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {books.map((book, index) => (
        <motion.div
          key={book.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="p-4 rounded-lg bg-white shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6 hover:shadow-md transition-all duration-300"
        >
          <div 
            className="relative w-full md:w-40 h-56 md:h-48 flex-shrink-0 cursor-pointer"
            onClick={() => onOpenPreview(book.id)}
          >
            <img 
              src={book.cover} 
              alt={book.title} 
              className="w-full h-full object-cover rounded-md"
            />
            <div className="absolute top-2 left-2">
              {isBestseller(book.id) && (
                <div className="bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center shadow-md mb-2">
                  Bestseller
                </div>
              )}
              {hasPreview(book) && (
                <div className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center shadow-md mb-2">
                  Önizleme
                </div>
              )}
              {isComingSoon(book) && (
                <div className="bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center shadow-md mb-2">
                  Yakında
                </div>
              )}
            </div>
          </div>
          
          <div className="flex-grow flex flex-col">
            <div className="mb-2">
              <h3 className="font-bold text-xl text-gray-800 mb-1">{book.title}</h3>
              <p className="text-gray-600 text-sm">{book.author}</p>
              
              {book.rating && (
                <div className="mt-2">
                  <BookRating rating={book.rating} reviewCount={book.reviewCount} showCount={false} />
                </div>
              )}
            </div>
            
            <p className="text-gray-500 text-sm mt-2 mb-4 flex-grow">
              {book.description.length > 200 
                ? `${book.description.substring(0, 200)}...` 
                : book.description}
            </p>
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-auto">
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={() => onOpenPreview(book.id)}
              >
                <Eye size={16} />
                Önizle
              </Button>
              
              <BookPurchaseButton 
                isComingSoon={book.comingSoon || false} 
                onAddToCart={() => onAddToCart(book.id, book.title)}
                price={book.price}
                bookTitle={book.title}
              />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default BookListView;
