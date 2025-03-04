
import { BookType } from '@/types/book';
import { Award, Sparkles, Clock, Tag, TrendingUp } from 'lucide-react';

interface BookBadgesProps {
  book: BookType;
  hoveredId: number | null;
  getTrendingValue: (bookId: number) => number;
  view: 'grid' | 'list';
}

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

const BookBadges = ({ book, hoveredId, getTrendingValue, view }: BookBadgesProps) => {
  return null; // This is a utility component with exported functions, not meant to be rendered
};

export default BookBadges;
