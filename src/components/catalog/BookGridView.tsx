
import { useState } from 'react';
import BookCard from './BookCard';
import { BookType } from '@/types/book';
import { Star, StarHalf } from 'lucide-react';
import { motion } from 'framer-motion';

interface BookGridViewProps {
  books: BookType[];
  onAddToCart: (bookId: number, bookTitle: string) => void;
  onOpenPreview?: (bookId: number) => void;
}

const BookGridView = ({ books, onAddToCart, onOpenPreview = () => {} }: BookGridViewProps) => {
  const [hoveredBook, setHoveredBook] = useState<number | null>(null);

  const renderRating = (rating: number = 4.5, reviewCount: number = 0) => {
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
        {reviewCount > 0 && <span className="text-xs text-gray-500 ml-1">{reviewCount} değerlendirme</span>}
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
          <BookCard 
            book={book} 
            onAddToCart={onAddToCart} 
            onOpenPreview={onOpenPreview}
            ratingComponent={book.rating ? renderRating(book.rating, book.reviewCount) : undefined}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default BookGridView;
