
import { useState, useEffect } from 'react';
import BookCard from './BookCard';
import EmptyState from './EmptyState';
import { BookType } from '@/types/book';
import { Star, StarHalf, Tag, TrendingUp, Award, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface BookListProps {
  books: BookType[];
  viewMode: 'grid' | 'list';
  onAddToCart: (bookId: number, bookTitle: string) => void;
}

const BookList = ({ books, viewMode, onAddToCart }: BookListProps) => {
  const [hoveredBook, setHoveredBook] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading state for smoother transitions
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [books]);

  if (books.length === 0) {
    return <EmptyState />;
  }

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

  // Function to determine if a book is bestselling (first book is bestseller)
  const isBestseller = (bookId: number) => {
    return bookId === 9;
  };

  // Function to get a random trending value (just for visual enhancement)
  const getTrendingValue = (bookId: number) => {
    return Math.floor(Math.random() * 50) + 50; // Random number between 50-100%
  };

  // Function to check if a book has preview
  const hasPreview = (book: BookType) => {
    return book.previewImages && book.previewImages.length > 0;
  };

  if (viewMode === 'grid') {
    return (
      <AnimatePresence>
        {!isLoading && (
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
                
                {hoveredBook === book.id && (
                  <div className="absolute -top-2 right-2 bg-masqot-primary text-white text-xs font-medium px-2 py-1 rounded-full flex items-center z-10 animate-fade-in shadow-sm">
                    <Tag className="w-3 h-3 mr-1" />
                    {book.category}
                  </div>
                )}

                {book.reviewCount && book.reviewCount > 50 && (
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
        )}
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      {!isLoading && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="space-y-8"
        >
          {books.map((book, index) => (
            <motion.div 
              key={book.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="relative transition-all duration-300 hover:-translate-y-1 group"
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
                <div className="absolute -top-3 right-3 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center z-10 shadow-md">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Önizleme
                </div>
              )}
              
              {hoveredBook === book.id && (
                <div className="absolute -top-2 left-24 bg-masqot-primary text-white text-xs font-medium px-2 py-1 rounded-full flex items-center z-10 animate-fade-in shadow-sm">
                  <Tag className="w-3 h-3 mr-1" />
                  {book.category}
                </div>
              )}
              
              {book.reviewCount && book.reviewCount > 50 && (
                <div className="absolute bottom-12 left-12 bg-teal-500/80 text-white text-xs font-medium px-2 py-1 rounded-full flex items-center z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  Trend {getTrendingValue(book.id)}%
                </div>
              )}
              
              <BookCard 
                key={book.id} 
                book={book} 
                onAddToCart={onAddToCart} 
                view="list" 
                ratingComponent={book.rating ? renderRating(book.rating) : undefined}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BookList;
