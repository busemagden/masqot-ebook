
import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star, StarHalf, Eye } from "lucide-react";
import { BookType } from '@/types/book';

interface BookCardProps {
  book: BookType;
  onAddToCart: (bookId: number, bookTitle: string) => void;
  view: 'grid' | 'list';
  ratingComponent?: React.ReactNode;
}

const BookCard = ({ book, onAddToCart, view, ratingComponent }: BookCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  
  const handlePreviewClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPreviewOpen(true);
    // In a real implementation, this would open a preview modal
    console.log("Preview clicked for book:", book.title);
  };

  if (view === 'grid') {
    return (
      <Card
        className="book-card glass-card transition-all duration-300 hover:shadow-xl overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative">
          <img
            src={book.cover}
            alt={book.title}
            className="w-full h-64 object-cover transition-transform duration-300"
            style={{
              transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            }}
          />
          {isHovered && (
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center transition-opacity duration-300">
              <Button variant="ghost" className="text-white border border-white/60 hover:bg-white/20" onClick={handlePreviewClick}>
                <Eye className="mr-2 h-4 w-4" />
                Önizleme
              </Button>
            </div>
          )}
        </div>
        
        <div className="p-6">
          <div className="flex items-center mb-3">
            {ratingComponent || (
              <div className="flex text-yellow-500">
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <StarHalf className="h-4 w-4 fill-current" />
              </div>
            )}
          </div>
          
          <h3 className="text-xl font-serif font-bold text-masqot-dark mb-2 line-clamp-2 h-14">
            {book.title}
          </h3>
          <p className="text-masqot-secondary mb-2">{book.author}</p>
          <p className="text-sm text-gray-600 mb-4 line-clamp-2 h-10">{book.description}</p>
          
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
            <span className="text-lg font-bold text-masqot-primary">
              {book.price}
            </span>
            <Button
              className="bg-masqot-primary hover:bg-masqot-secondary text-white transition-all duration-300"
              onClick={() => onAddToCart(book.id, book.title)}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Satın Al
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card
      className="book-card glass-card transition-all duration-300 hover:shadow-xl overflow-hidden"
    >
      <div className="p-6 flex flex-col md:flex-row gap-6">
        <div className="relative w-full md:w-48 h-48 flex-shrink-0">
          <img
            src={book.cover}
            alt={book.title}
            className="w-full h-full object-cover rounded-md"
          />
          {isHovered && (
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center rounded-md">
              <Button variant="ghost" size="sm" className="text-white border border-white/60 hover:bg-white/20" onClick={handlePreviewClick}>
                <Eye className="mr-2 h-4 w-4" />
                Önizleme
              </Button>
            </div>
          )}
        </div>
        
        <div className="flex-1" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
          <div className="flex items-center mb-2">
            {ratingComponent || (
              <div className="flex text-yellow-500">
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <StarHalf className="h-4 w-4 fill-current" />
              </div>
            )}
          </div>
          
          <h3 className="text-xl font-serif font-bold text-masqot-dark mb-2">
            {book.title}
          </h3>
          <p className="text-masqot-secondary mb-2">{book.author}</p>
          <p className="text-sm text-gray-600 mb-4">{book.description}</p>
          
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
            <span className="text-lg font-bold text-masqot-primary">
              {book.price}
            </span>
            <Button
              className="bg-masqot-primary hover:bg-masqot-secondary text-white transition-all duration-300"
              onClick={() => onAddToCart(book.id, book.title)}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Satın Al
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default BookCard;
