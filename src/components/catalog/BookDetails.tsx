
import React from 'react';
import BookPurchaseButton from './BookPurchaseButton';

interface BookDetailsProps {
  title: string;
  author: string;
  description: string;
  price: string;
  isComingSoon: boolean;
  onAddToCart: () => void;
  ratingComponent?: React.ReactNode;
  view: 'grid' | 'list';
}

const BookDetails = ({ 
  title, 
  author, 
  description, 
  price, 
  isComingSoon, 
  onAddToCart,
  ratingComponent,
  view
}: BookDetailsProps) => {
  if (view === 'grid') {
    return (
      <div className="p-6">
        <div className="flex items-center mb-3">
          {ratingComponent}
        </div>
        
        <h3 className="text-xl font-serif font-bold text-masqot-dark mb-2 line-clamp-2 h-14">
          {title}
        </h3>
        <p className="text-masqot-secondary mb-2">{author}</p>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2 h-10">{description}</p>
        
        <BookPurchaseButton 
          isComingSoon={isComingSoon} 
          onAddToCart={onAddToCart} 
          price={price} 
        />
      </div>
    );
  }

  return (
    <div className="flex-1">
      <div className="flex items-center mb-2">
        {ratingComponent}
      </div>
      
      <h3 className="text-xl font-serif font-bold text-masqot-dark mb-2">
        {title}
      </h3>
      <p className="text-masqot-secondary mb-2">{author}</p>
      <p className="text-sm text-gray-600 mb-4">{description}</p>
      
      <BookPurchaseButton 
        isComingSoon={isComingSoon} 
        onAddToCart={onAddToCart} 
        price={price} 
      />
    </div>
  );
};

export default BookDetails;
