
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Eye, Clock } from "lucide-react";

interface BookCoverProps {
  cover: string;
  title: string;
  isPreviewable?: boolean;
  isComingSoon?: boolean;
  hasPreview?: boolean;
  onPreviewClick?: (e: React.MouseEvent) => void;
  view?: 'grid' | 'list';
}

const BookCover = ({ 
  cover, 
  title, 
  isComingSoon = false, 
  hasPreview = true, 
  onPreviewClick = () => {},
  view = 'grid',
  isPreviewable = false
}: BookCoverProps) => {
  const [isHovered, setIsHovered] = useState(false);

  if (view === 'grid') {
    return (
      <div 
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src={cover}
          alt={title}
          className="w-full h-64 object-cover transition-transform duration-300"
          style={{
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          }}
        />
        {isHovered && isPreviewable && (
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center transition-opacity duration-300">
            {isComingSoon ? (
              <Button 
                variant="ghost" 
                className="text-white border border-white/60 hover:bg-white/20 opacity-70 cursor-not-allowed"
                disabled
              >
                <Clock className="mr-2 h-4 w-4" />
                Yakında
              </Button>
            ) : (
              <Button 
                variant="ghost" 
                className={`text-white border border-white/60 hover:bg-white/20 ${!hasPreview ? 'opacity-50 cursor-not-allowed' : ''}`} 
                onClick={onPreviewClick}
                disabled={!hasPreview}
              >
                <Eye className="mr-2 h-4 w-4" />
                {hasPreview ? 'Önizleme' : 'Önizleme Yok'}
              </Button>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div 
      className="relative w-full md:w-48 h-48 flex-shrink-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={cover}
        alt={title}
        className="w-full h-full object-cover rounded-md"
      />
      {isHovered && isPreviewable && (
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center rounded-md">
          {isComingSoon ? (
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-white border border-white/60 hover:bg-white/20 opacity-70 cursor-not-allowed"
              disabled
            >
              <Clock className="mr-2 h-4 w-4" />
              Yakında
            </Button>
          ) : (
            <Button 
              variant="ghost" 
              size="sm" 
              className={`text-white border border-white/60 hover:bg-white/20 ${!hasPreview ? 'opacity-50 cursor-not-allowed' : ''}`} 
              onClick={onPreviewClick}
              disabled={!hasPreview}
            >
              <Eye className="mr-2 h-4 w-4" />
              {hasPreview ? 'Önizleme' : 'Önizleme Yok'}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default BookCover;
