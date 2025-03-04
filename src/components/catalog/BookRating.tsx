
import { Star, StarHalf } from "lucide-react";

interface BookRatingProps {
  rating?: number;
  showCount?: boolean;
}

const BookRating = ({ rating = 4.5, showCount = false }: BookRatingProps) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  
  return (
    <div className="flex items-center">
      <div className="flex text-yellow-500">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-current" />
        ))}
        {hasHalfStar && <StarHalf className="h-4 w-4 fill-current" />}
      </div>
      {showCount && <span className="text-xs text-gray-500 ml-2">({rating})</span>}
    </div>
  );
};

export default BookRating;
