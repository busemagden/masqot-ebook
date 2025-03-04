
import BookCard from './BookCard';
import EmptyState from './EmptyState';
import { BookType } from '@/types/book';

interface BookListProps {
  books: BookType[];
  viewMode: 'grid' | 'list';
  onAddToCart: (bookId: number, bookTitle: string) => void;
}

const BookList = ({ books, viewMode, onAddToCart }: BookListProps) => {
  if (books.length === 0) {
    return <EmptyState />;
  }

  if (viewMode === 'grid') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {books.map((book) => (
          <BookCard 
            key={book.id}
            book={book} 
            onAddToCart={onAddToCart} 
            view="grid" 
          />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {books.map((book) => (
        <BookCard 
          key={book.id} 
          book={book} 
          onAddToCart={onAddToCart} 
          view="list" 
        />
      ))}
    </div>
  );
};

export default BookList;
