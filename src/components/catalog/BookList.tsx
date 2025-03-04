
import { useState } from 'react';
import BookCard from './BookCard';
import EmptyState from './EmptyState';
import { BookType } from '@/types/book';
import { Star, StarHalf, Tag } from 'lucide-react';

interface BookListProps {
  books: BookType[];
  viewMode: 'grid' | 'list';
  onAddToCart: (bookId: number, bookTitle: string) => void;
}

const BookList = ({ books, viewMode, onAddToCart }: BookListProps) => {
  const [hoveredBook, setHoveredBook] = useState<number | null>(null);

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

  if (viewMode === 'grid') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {books.map((book) => (
          <div 
            key={book.id}
            className="relative transition-all duration-300 hover:-translate-y-2"
            onMouseEnter={() => setHoveredBook(book.id)}
            onMouseLeave={() => setHoveredBook(null)}
          >
            {hoveredBook === book.id && (
              <div className="absolute -top-2 -right-2 bg-masqot-primary text-white text-xs font-medium px-2 py-1 rounded-full flex items-center z-10 animate-fade-in">
                <Tag className="w-3 h-3 mr-1" />
                {book.category}
              </div>
            )}
            <BookCard 
              book={book} 
              onAddToCart={onAddToCart} 
              view="grid" 
              ratingComponent={book.rating ? renderRating(book.rating) : undefined}
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {books.map((book) => (
        <div 
          key={book.id}
          className="relative transition-all duration-300 hover:-translate-y-1"
          onMouseEnter={() => setHoveredBook(book.id)}
          onMouseLeave={() => setHoveredBook(null)}
        >
          {hoveredBook === book.id && (
            <div className="absolute -top-2 left-2 bg-masqot-primary text-white text-xs font-medium px-2 py-1 rounded-full flex items-center z-10 animate-fade-in">
              <Tag className="w-3 h-3 mr-1" />
              {book.category}
            </div>
          )}
          <BookCard 
            key={book.id} 
            book={book} 
            onAddToCart={onAddToCart} 
            view="list" 
            ratingComponent={book.rating ? renderRating(book.rating) : undefined}
          />
        </div>
      ))}
    </div>
  );
};

export default BookList;
