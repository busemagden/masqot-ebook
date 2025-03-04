
import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { BookType } from '@/types/book';

interface BookCardProps {
  book: BookType;
  onAddToCart: (bookId: number, bookTitle: string) => void;
  view: 'grid' | 'list';
}

const BookCard = ({ book, onAddToCart, view }: BookCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  if (view === 'grid') {
    return (
      <Card
        key={book.id}
        className="book-card glass-card transition-all duration-300 hover:shadow-xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="p-6">
          <img
            src={book.cover}
            alt={book.title}
            className="w-full h-64 object-cover rounded-md mb-4 transition-transform duration-300"
            style={{
              transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            }}
          />
          <div className="mb-2">
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-masqot-soft text-masqot-primary">
              {book.category}
            </span>
          </div>
          <h3 className="text-xl font-serif font-bold text-masqot-dark mb-2">
            {book.title}
          </h3>
          <p className="text-masqot-secondary mb-2">{book.author}</p>
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">{book.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-masqot-primary">
              {book.price}
            </span>
            <Button
              className="bg-masqot-primary hover:bg-masqot-secondary text-white transition-all duration-300"
              onClick={() => onAddToCart(book.id, book.title)}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Sepete Ekle
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card
      key={book.id}
      className="book-card glass-card transition-all duration-300 hover:shadow-xl"
    >
      <div className="p-6 flex flex-col md:flex-row gap-6">
        <img
          src={book.cover}
          alt={book.title}
          className="w-full md:w-48 h-48 object-cover rounded-md"
        />
        <div className="flex-1">
          <div className="mb-2">
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-masqot-soft text-masqot-primary">
              {book.category}
            </span>
          </div>
          <h3 className="text-xl font-serif font-bold text-masqot-dark mb-2">
            {book.title}
          </h3>
          <p className="text-masqot-secondary mb-2">{book.author}</p>
          <p className="text-sm text-gray-600 mb-4">{book.description}</p>
          <div className="flex items-center justify-between mt-auto">
            <span className="text-lg font-bold text-masqot-primary">
              {book.price}
            </span>
            <Button
              className="bg-masqot-primary hover:bg-masqot-secondary text-white transition-all duration-300"
              onClick={() => onAddToCart(book.id, book.title)}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Sepete Ekle
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default BookCard;
