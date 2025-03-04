
import { Star, StarHalf } from "lucide-react";

interface BookRatingProps {
  rating?: number;
}

const BookRating = ({ rating = 4.5 }: BookRatingProps) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  
  return (
    <div className="flex text-yellow-500">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-current" />
      ))}
      {hasHalfStar && <StarHalf className="h-4 w-4 fill-current" />}
    </div>
  );
};

export default BookRating;
