
import { useState } from 'react';
import BookCard from './BookCard';
import { BookType } from '@/types/book';
import BookRating from './BookRating';

interface BookGridViewProps {
  books: BookType[];
  onAddToCart: (bookId: number, bookTitle: string) => void;
  onOpenPreview?: (bookId: number) => void;
}

const BookGridView = ({ books, onAddToCart, onOpenPreview = () => {} }: BookGridViewProps) => {
  const [hoveredBook, setHoveredBook] = useState<number | null>(null);

  return (
    <div 
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
    >
      {books.map((book, index) => (
        <div 
          key={book.id}
          className="relative transition-all duration-300 hover:-translate-y-2 group"
          onMouseEnter={() => setHoveredBook(book.id)}
          onMouseLeave={() => setHoveredBook(null)}
        >
          <BookCard 
            book={book} 
            onAddToCart={onAddToCart} 
            onOpenPreview={onOpenPreview}
            ratingComponent={book.rating ? <BookRating rating={book.rating} reviewCount={book.reviewCount} /> : undefined}
            view="grid"
          />
        </div>
      ))}
    </div>
  );
};

export default BookGridView;
