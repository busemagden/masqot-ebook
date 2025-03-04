
import { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, X } from "lucide-react";

interface BookPreviewProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  previewImages: string[];
}

const BookPreview = ({ isOpen, onClose, title, previewImages }: BookPreviewProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [loadedImages, setLoadedImages] = useState<string[]>([]);
  const [loadingError, setLoadingError] = useState(false);

  // Reset state and preload images when dialog opens
  useEffect(() => {
    if (isOpen && previewImages && previewImages.length > 0) {
      console.log("Preview opened with images:", previewImages);
      setCurrentPage(0);
      setLoadingError(false);
      
      // Preload images
      const imagePromises = previewImages.map((src) => {
        return new Promise<string>((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve(src);
          img.onerror = () => {
            console.error(`Failed to load image: ${src}`);
            reject(new Error(`Failed to load image: ${src}`));
          };
          img.src = src;
        });
      });
      
      Promise.all(imagePromises)
        .then(loadedSrcs => {
          console.log("All images preloaded:", loadedSrcs);
          setLoadedImages(loadedSrcs);
        })
        .catch(error => {
          console.error("Error preloading images:", error);
          setLoadingError(true);
        });
    }
  }, [isOpen, previewImages]);

  const nextPage = () => {
    if (currentPage < previewImages.length - 1) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  };

  // Safety check: ensure we have images to display
  if (!previewImages || previewImages.length === 0) {
    console.error("No preview images provided to BookPreview component");
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-5xl w-[90vw] max-h-[90vh] p-0 overflow-hidden bg-white">
        <DialogHeader className="p-4 border-b">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-serif">{title} - Önizleme</DialogTitle>
            <DialogDescription className="text-sm">
              Sayfa {currentPage + 1} / {previewImages.length}
            </DialogDescription>
            <DialogClose className="h-8 w-8 rounded-full hover:bg-gray-100 flex items-center justify-center">
              <X className="h-4 w-4" />
            </DialogClose>
          </div>
        </DialogHeader>
        
        <div className="relative h-[80vh] bg-gray-100 flex items-center justify-center overflow-hidden">
          {loadingError ? (
            <div className="text-center p-8">
              <p className="text-red-500 mb-4">Görseller yüklenirken bir hata oluştu.</p>
              <Button onClick={() => window.location.reload()} variant="outline">Yeniden Dene</Button>
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              {previewImages[currentPage] && (
                <img 
                  src={previewImages[currentPage]} 
                  alt={`${title} - Sayfa ${currentPage + 1}`} 
                  className="max-h-full max-w-full object-contain shadow-lg"
                  style={{ maxHeight: "calc(80vh - 40px)" }}
                  onError={(e) => {
                    console.error(`Error loading image: ${previewImages[currentPage]}`);
                    e.currentTarget.src = '/placeholder.svg';
                  }}
                />
              )}
            </div>
          )}

          {/* Page navigation controls */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center items-center gap-8">
            <Button 
              onClick={prevPage} 
              disabled={currentPage === 0 || loadingError}
              className="bg-white/80 text-black hover:bg-white rounded-full p-3 flex items-center"
              variant="outline"
              size="icon"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            
            <span className="bg-white/80 text-sm px-4 py-2 rounded-full">
              Sayfa {currentPage + 1} / {previewImages.length}
            </span>
            
            <Button 
              onClick={nextPage} 
              disabled={currentPage === previewImages.length - 1 || loadingError}
              className="bg-white/80 text-black hover:bg-white rounded-full p-3 flex items-center"
              variant="outline"
              size="icon"
            >
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookPreview;
