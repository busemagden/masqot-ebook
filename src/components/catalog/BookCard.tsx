
import { BookType } from "@/types/book";
import BookCover from "./BookCover";
import BookBadges from "./BookBadges";
import BookRating from "./BookRating";
import BookPurchaseButton from "./BookPurchaseButton";
import { motion } from "framer-motion";
import { useState, useEffect } from 'react';

interface BookCardProps {
  book: BookType;
  onOpenPreview: (bookId: number) => void;
  onAddToCart: (bookId: number, bookTitle: string) => void;
}

const BookCard = ({ book, onOpenPreview, onAddToCart }: BookCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const isComingSoon = book.comingSoon || false;
  
  // Truncate description to 100 characters
  const truncatedDescription = book.description.length > 100 
    ? `${book.description.substring(0, 100)}...` 
    : book.description;

  return (
    <motion.div 
      className="h-full p-4 rounded-lg bg-white shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <motion.div
          animate={{
            scale: isHovered ? 1.03 : 1,
            y: isHovered ? -5 : 0
          }}
          transition={{ duration: 0.3 }}
          className="mb-4"
          onClick={() => onOpenPreview(book.id)}
        >
          <BookCover
            coverImage={book.cover}
            title={book.title}
            isPreviewable={true}
          />
        </motion.div>
        
        <BookBadges book={book} />
      </div>
      
      <div className="mb-2 flex-grow">
        <h3 className="font-bold text-lg text-gray-800 line-clamp-2 mb-1" title={book.title}>
          {book.title}
        </h3>
        <p className="text-gray-600 text-sm mb-2">{book.author}</p>
        
        {book.rating && (
          <BookRating rating={book.rating} reviewCount={book.reviewCount || 0} />
        )}
        
        <p className="text-gray-500 text-sm mt-4 line-clamp-3">
          {truncatedDescription}
        </p>
      </div>
      
      <BookPurchaseButton 
        isComingSoon={isComingSoon} 
        onAddToCart={() => onAddToCart(book.id, book.title)}
        price={book.price}
        bookTitle={book.title}
      />
    </motion.div>
  );
};

export default BookCard;
