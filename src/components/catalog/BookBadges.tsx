
import { BookType } from '@/types/book';
import { Award, Sparkles, Clock, Tag, TrendingUp } from 'lucide-react';

export const isBestseller = (bookId: number) => {
  return bookId === 9;
};

export const hasPreview = (book: BookType) => {
  return book.previewImages && book.previewImages.length > 0;
};

export const isComingSoon = (book: BookType) => {
  return book.comingSoon === true;
};

export const getRandomTrendingValue = (bookId: number) => {
  return Math.floor(Math.random() * 50) + 50; // Random number between 50-100%
};

interface BookBadgesProps {
  book: BookType;
  hoveredId?: number | null;
  getTrendingValue?: (bookId: number) => number;
  view?: 'grid' | 'list';
}

const BookBadges = ({ 
  book, 
  hoveredId = null, 
  getTrendingValue = getRandomTrendingValue, 
  view = 'grid' 
}: BookBadgesProps) => {
  const isBookBestseller = isBestseller(book.id);
  const hasBookPreview = hasPreview(book);
  const isBookComingSoon = isComingSoon(book);
  const isBookHovered = hoveredId === book.id;

  return (
    <div className="absolute top-2 left-2 flex flex-col gap-2 z-10">
      {isBookBestseller && (
        <div className="bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center shadow-md">
          <Award className="w-3 h-3 mr-1" />
          Bestseller
        </div>
      )}
      
      {hasBookPreview && (
        <div className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center shadow-md">
          <Sparkles className="w-3 h-3 mr-1" />
          Önizleme
        </div>
      )}

      {isBookComingSoon && (
        <div className="bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center shadow-md">
          <Clock className="w-3 h-3 mr-1" />
          Yakında
        </div>
      )}
    </div>
  );
};

export default BookBadges;
