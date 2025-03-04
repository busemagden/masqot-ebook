
import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { BookType } from '@/types/book';
import BookPreview from './BookPreview';
import BookRating from './BookRating';
import BookCover from './BookCover';
import BookDetails from './BookDetails';

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
    // Only open preview if preview images are available
    if (book.previewImages && book.previewImages.length > 0) {
      console.log("Opening preview for book:", book.title, "with images:", book.previewImages);
      setIsPreviewOpen(true);
    } else {
      console.log("No preview available for book:", book.title);
    }
  };

  const hasPreview = book.previewImages && book.previewImages.length > 0;
  const isComingSoon = book.comingSoon === true;

  // Prepare rating component
  const defaultRating = ratingComponent || <BookRating rating={book.rating} />;

  // Handle add to cart with the correct parameters
  const handleAddToCart = () => {
    onAddToCart(book.id, book.title);
  };

  if (view === 'grid') {
    return (
      <>
        <Card
          className="book-card glass-card transition-all duration-300 hover:shadow-xl overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <BookCover 
            cover={book.cover}
            title={book.title}
            isComingSoon={isComingSoon}
            hasPreview={hasPreview}
            onPreviewClick={handlePreviewClick}
            view="grid"
          />
          
          <BookDetails 
            title={book.title}
            author={book.author}
            description={book.description}
            price={book.price}
            isComingSoon={isComingSoon}
            onAddToCart={handleAddToCart}
            ratingComponent={defaultRating}
            view="grid"
          />
        </Card>

        {hasPreview && (
          <BookPreview 
            isOpen={isPreviewOpen} 
            onClose={() => setIsPreviewOpen(false)} 
            title={book.title}
            previewImages={book.previewImages}
          />
        )}
      </>
    );
  }

  return (
    <>
      <Card
        className="book-card glass-card transition-all duration-300 hover:shadow-xl overflow-hidden"
      >
        <div className="p-6 flex flex-col md:flex-row gap-6">
          <BookCover 
            cover={book.cover}
            title={book.title}
            isComingSoon={isComingSoon}
            hasPreview={hasPreview}
            onPreviewClick={handlePreviewClick}
            view="list"
          />
          
          <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <BookDetails 
              title={book.title}
              author={book.author}
              description={book.description}
              price={book.price}
              isComingSoon={isComingSoon}
              onAddToCart={handleAddToCart}
              ratingComponent={defaultRating}
              view="list"
            />
          </div>
        </div>
      </Card>

      {hasPreview && (
        <BookPreview 
          isOpen={isPreviewOpen} 
          onClose={() => setIsPreviewOpen(false)} 
          title={book.title}
          previewImages={book.previewImages}
        />
      )}
    </>
  );
};

export default BookCard;
