
import React from 'react';
import { BookType } from '@/types/book';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import BookRating from './BookRating';
import BookPurchaseButton from './BookPurchaseButton';

interface BookDetailsProps {
  book: BookType;
  onClose: () => void;
  onAddToCart: (bookId: number, bookTitle: string) => void;
}

const BookDetails = ({ book, onClose, onAddToCart }: BookDetailsProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute right-2 top-2 z-10"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </Button>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          <div>
            <img 
              src={book.cover} 
              alt={book.title} 
              className="w-full h-auto object-cover rounded-md shadow-md"
            />
          </div>
          
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold mb-2">{book.title}</h2>
            <p className="text-gray-600 mb-4">{book.author}</p>
            
            {book.rating && (
              <div className="mb-4">
                <BookRating rating={book.rating} reviewCount={book.reviewCount} />
              </div>
            )}
            
            <div className="mb-6">
              <BookPurchaseButton 
                isComingSoon={book.comingSoon || false} 
                onAddToCart={() => onAddToCart(book.id, book.title)}
                price={book.price}
                bookTitle={book.title}
                bookId={book.id}
              />
            </div>
            
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Açıklama</h3>
              <p className="text-gray-700">{book.description}</p>
            </div>
            
            {book.topics && book.topics.length > 0 && (
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Konular</h3>
                <div className="flex flex-wrap gap-2">
                  {book.topics.map((topic, index) => (
                    <span 
                      key={index} 
                      className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {book.pages && (
              <div className="text-sm text-gray-500">
                Sayfa Sayısı: {book.pages}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
