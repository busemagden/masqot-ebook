
import { useState } from 'react';
import BookCard from './BookCard';
import { BookType } from '@/types/book';
import { Star, StarHalf, Tag, TrendingUp, Award, Sparkles, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

interface BookGridViewProps {
  books: BookType[];
  onAddToCart: (bookId: number, bookTitle: string) => void;
}

const BookGridView = ({ books, onAddToCart }: BookGridViewProps) => {
  const [hoveredBook, setHoveredBook] = useState<number | null>(null);

  // Function to determine if a book is bestselling
  const isBestseller = (bookId: number) => {
    return bookId === 9;
  };

  // Function to get a random trending value
  const getTrendingValue = (bookId: number) => {
    return Math.floor(Math.random() * 50) + 50; // Random number between 50-100%
  };

  // Function to check if a book has preview
  const hasPreview = (book: BookType) => {
    return book.previewImages && book.previewImages.length > 0;
  };

  // Function to check if a book is coming soon
  const isComingSoon = (book: BookType) => {
    return book.comingSoon === true;
  };

  const renderRating = (rating: number = 4.5) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    return (
      <div className="flex items-center">
        <div className="flex text-yellow-500">
          {[...Array(fullStars)].map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-current" />
          ))}
          {hasHalfStar && <StarHalf className="h-4 w-4 fill-current" />}
        </div>
        <span className="text-xs text-gray-500 ml-2">({rating})</span>
      </div>
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
    >
      {books.map((book, index) => (
        <motion.div 
          key={book.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          className="relative transition-all duration-300 hover:-translate-y-2 group"
          onMouseEnter={() => setHoveredBook(book.id)}
          onMouseLeave={() => setHoveredBook(null)}
        >
          {isBestseller(book.id) && (
            <div className="absolute -top-3 -left-3 bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center z-10 shadow-md">
              <Award className="w-3 h-3 mr-1" />
              Bestseller
            </div>
          )}
          
          {hasPreview(book) && (
            <div className="absolute -top-3 -right-3 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center z-10 shadow-md">
              <Sparkles className="w-3 h-3 mr-1" />
              Önizleme
            </div>
          )}

          {isComingSoon(book) && (
            <div className="absolute -top-3 -right-3 bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center z-10 shadow-md">
              <Clock className="w-3 h-3 mr-1" />
              Yakında
            </div>
          )}
          
          {hoveredBook === book.id && (
            <div className="absolute -top-2 right-2 bg-masqot-primary text-white text-xs font-medium px-2 py-1 rounded-full flex items-center z-10 animate-fade-in shadow-sm">
              <Tag className="w-3 h-3 mr-1" />
              {book.category}
            </div>
          )}

          {book.reviewCount && book.reviewCount > 50 && !isComingSoon(book) && (
            <div className="absolute bottom-2 left-2 bg-teal-500/80 text-white text-xs font-medium px-2 py-1 rounded-full flex items-center z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <TrendingUp className="w-3 h-3 mr-1" />
              Trend {getTrendingValue(book.id)}%
            </div>
          )}
          
          <BookCard 
            book={book} 
            onAddToCart={onAddToCart} 
            view="grid" 
            ratingComponent={book.rating ? renderRating(book.rating) : undefined}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default BookGridView;
