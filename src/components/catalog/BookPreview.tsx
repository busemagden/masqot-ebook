
import { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, X, ZoomIn, ZoomOut, ShoppingCart } from "lucide-react";

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
  const [zoomLevel, setZoomLevel] = useState(1);
  const imageRef = useRef<HTMLImageElement>(null);

  // Add more sample images
  const allImages = [
    ...previewImages,
    "public/lovable-uploads/37064668-1dc7-462a-bb37-10c1c2aff540.png",
    "public/lovable-uploads/8810179f-6d73-44b6-9680-ed330c00b712.png"
  ];

  // Reset state and preload images when dialog opens
  useEffect(() => {
    if (isOpen && allImages && allImages.length > 0) {
      console.log("Preview opened with images:", allImages);
      setCurrentPage(0);
      setLoadingError(false);
      setZoomLevel(1);
      
      // Preload images
      const imagePromises = allImages.map((src) => {
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
    if (currentPage < allImages.length - 1) {
      setCurrentPage(prev => prev + 1);
      setZoomLevel(1); // Reset zoom when changing pages
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
      setZoomLevel(1); // Reset zoom when changing pages
    }
  };

  const zoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.25, 3));
  };

  const zoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.25, 0.5));
  };

  const handleImageClick = (e: React.MouseEvent) => {
    // Get click position relative to image
    if (imageRef.current) {
      const rect = imageRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // If click is in right half, go next, otherwise go previous
      if (x > rect.width / 2) {
        nextPage();
      } else {
        prevPage();
      }
    }
  };

  // Check if we're at the last page to show purchase button
  const isLastPage = currentPage === allImages.length - 1;

  // Safety check: ensure we have images to display
  if (!allImages || allImages.length === 0) {
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
              Sayfa {currentPage + 1} / {allImages.length}
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
            <div 
              className="w-full h-full flex items-center justify-center overflow-auto"
              style={{ cursor: "pointer" }}
            >
              {allImages[currentPage] && (
                <div 
                  className="relative transition-all duration-200"
                  style={{ 
                    transform: `scale(${zoomLevel})`,
                    transformOrigin: 'center',
                    transition: 'transform 0.2s ease-out'
                  }}
                >
                  <img 
                    ref={imageRef}
                    src={allImages[currentPage]} 
                    alt={`${title} - Sayfa ${currentPage + 1}`} 
                    className="max-h-full max-w-full object-contain shadow-lg"
                    style={{ maxHeight: "calc(80vh - 80px)" }}
                    onClick={handleImageClick}
                    onError={(e) => {
                      console.error(`Error loading image: ${allImages[currentPage]}`);
                      e.currentTarget.src = '/placeholder.svg';
                    }}
                  />
                </div>
              )}
            </div>
          )}

          {/* Zoom controls */}
          <div className="absolute top-4 right-4 flex space-x-2">
            <Button 
              onClick={zoomIn}
              disabled={loadingError || zoomLevel >= 3}
              className="bg-white/80 text-black hover:bg-white rounded-full p-3 flex items-center"
              variant="outline"
              size="icon"
              title="Yakınlaştır"
            >
              <ZoomIn className="h-5 w-5" />
            </Button>
            <Button 
              onClick={zoomOut}
              disabled={loadingError || zoomLevel <= 0.5}
              className="bg-white/80 text-black hover:bg-white rounded-full p-3 flex items-center"
              variant="outline"
              size="icon"
              title="Uzaklaştır"
            >
              <ZoomOut className="h-5 w-5" />
            </Button>
          </div>

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
              Sayfa {currentPage + 1} / {allImages.length}
            </span>
            
            <Button 
              onClick={nextPage} 
              disabled={currentPage === allImages.length - 1 || loadingError}
              className="bg-white/80 text-black hover:bg-white rounded-full p-3 flex items-center"
              variant="outline"
              size="icon"
            >
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Footer with purchase button */}
        <DialogFooter className="border-t p-4 flex justify-between items-center">
          <span className="text-sm text-gray-500">
            ©️ 2023 MASQOT Yayınları - Tüm hakları saklıdır
          </span>
          {isLastPage && (
            <Button 
              className="bg-masqot-primary hover:bg-masqot-secondary text-white"
              onClick={() => {
                onClose();
                // You can add a cart action here
              }}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Kitabın Tamamını Satın Al
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BookPreview;
