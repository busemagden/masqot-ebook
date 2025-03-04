
import React from 'react';
import { ArrowLeft, Calendar, Book, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { BookType } from '@/types/book';
import BookRating from './BookRating';
import BookPurchaseButton from './BookPurchaseButton';

interface BookDetailsProps {
  book: BookType;
  onClose: () => void;
  onAddToCart: (bookId: number, bookTitle: string) => void;
}

const BookDetails = ({ book, onClose, onAddToCart }: BookDetailsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white z-10 p-4 border-b flex items-center">
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <h2 className="text-xl font-bold ml-2">Kitap Detayları</h2>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-1">
            <div className="sticky top-20">
              <img
                src={book.cover}
                alt={book.title}
                className="w-full h-auto rounded-lg shadow-md"
              />
              
              <div className="mt-4">
                {book.rating && (
                  <BookRating rating={book.rating} reviewCount={book.reviewCount || 0} />
                )}
              </div>
              
              <div className="mt-6">
                <BookPurchaseButton
                  isComingSoon={book.comingSoon || false}
                  onAddToCart={() => onAddToCart(book.id, book.title)}
                  price={book.price}
                  bookTitle={book.title}
                  bookId={book.id}
                />
              </div>
            </div>
          </div>
          
          <div className="col-span-1 md:col-span-2 space-y-6">
            <div>
              <h1 className="text-2xl font-bold">{book.title}</h1>
              <p className="text-gray-600">{book.author}</p>
            </div>
            
            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
              <div className="flex items-center">
                <Calendar size={16} className="mr-1" />
                <span>Yayın: {book.publishDate || 'Belirtilmemiş'}</span>
              </div>
              
              <div className="flex items-center">
                <Book size={16} className="mr-1" />
                <span>Sayfa: {book.pageCount || 'Belirtilmemiş'}</span>
              </div>
              
              <div className="flex items-center">
                <Users size={16} className="mr-1" />
                <span>Okuyucu: {book.readerCount || '0'}</span>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-2">Açıklama</h3>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {book.description}
              </p>
            </div>
            
            {book.previewImages && book.previewImages.length > 0 && (
              <div>
                <h3 className="font-semibold text-lg mb-3">Kitaptan Görüntüler</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {book.previewImages.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${book.title} Preview ${index + 1}`}
                      className="w-full h-40 object-cover rounded-md shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BookDetails;
