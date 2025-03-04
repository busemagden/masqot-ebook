
import { useState, useEffect } from 'react';
import EmptyState from './EmptyState';
import { BookType } from '@/types/book';
import { motion, AnimatePresence } from 'framer-motion';
import BookGridView from './BookGridView';
import BookListView from './BookListView';

interface BookListProps {
  books: BookType[];
  viewMode: 'grid' | 'list';
  onAddToCart: (bookId: number, bookTitle: string) => void;
}

const BookList = ({ books, viewMode, onAddToCart }: BookListProps) => {
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

  // Default preview handler, in a real app this would open a modal or navigate to preview page
  const handleOpenPreview = (bookId: number) => {
    console.log(`Opening preview for book ${bookId}`);
  };

  console.log("Books in BookList:", books);

  return (
    <AnimatePresence>
      {!isLoading && (
        viewMode === 'grid' ? (
          <BookGridView 
            books={books} 
            onAddToCart={onAddToCart} 
            onOpenPreview={handleOpenPreview} 
          />
        ) : (
          <BookListView 
            books={books} 
            onAddToCart={onAddToCart} 
            onOpenPreview={handleOpenPreview} 
          />
        )
      )}
    </AnimatePresence>
  );
};

export default BookList;
