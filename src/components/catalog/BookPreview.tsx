
import { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, X, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface BookPreviewProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  previewImages: string[];
}

const BookPreview = ({ isOpen, onClose, title, previewImages }: BookPreviewProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isPageTurning, setIsPageTurning] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Reset state when dialog opens
  useEffect(() => {
    if (isOpen) {
      setCurrentPage(0);
      setZoomLevel(1);
      setPosition({ x: 0, y: 0 });
    }
  }, [isOpen]);

  const nextPage = () => {
    if (currentPage < previewImages.length - 1 && !isPageTurning) {
      setIsPageTurning(true);
      // Reset zoom and position before turning the page
      setZoomLevel(1);
      setPosition({ x: 0, y: 0 });
      setTimeout(() => {
        setCurrentPage(prev => prev + 1);
        setIsPageTurning(false);
      }, 300);
    }
  };

  const prevPage = () => {
    if (currentPage > 0 && !isPageTurning) {
      setIsPageTurning(true);
      // Reset zoom and position before turning the page
      setZoomLevel(1);
      setPosition({ x: 0, y: 0 });
      setTimeout(() => {
        setCurrentPage(prev => prev - 1);
        setIsPageTurning(false);
      }, 300);
    }
  };

  // Zoom controls
  const zoomIn = () => {
    if (zoomLevel < 3) {
      setZoomLevel(prev => Math.min(prev + 0.5, 3));
    }
  };

  const zoomOut = () => {
    if (zoomLevel > 1) {
      setZoomLevel(prev => Math.max(prev - 0.5, 1));
      
      // Adjust position if we're zooming out
      if (zoomLevel > 1) {
        setPosition(prev => ({
          x: prev.x / 1.5,
          y: prev.y / 1.5
        }));
      } else {
        setPosition({ x: 0, y: 0 });
      }
    }
  };

  const resetZoom = () => {
    setZoomLevel(1);
    setPosition({ x: 0, y: 0 });
  };

  // Mouse and touch event handlers for panning
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel > 1) {
      setIsDragging(true);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoomLevel > 1) {
      setPosition(prev => ({
        x: prev.x + e.movementX,
        y: prev.y + e.movementY
      }));
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Page turning animation variants
  const pageVariants = {
    initial: (direction: number) => ({
      rotateY: direction > 0 ? 0 : -180,
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    }),
    animate: (direction: number) => ({
      rotateY: direction > 0 ? -180 : 0,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 20
      }
    }),
    exit: (direction: number) => ({
      rotateY: direction > 0 ? -180 : 0,
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 20
      }
    })
  };

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
        
        <div 
          className="relative h-[80vh] bg-gray-100 flex items-center justify-center overflow-hidden page-transition"
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{ cursor: isDragging ? 'grabbing' : (zoomLevel > 1 ? 'grab' : 'default') }}
        >
          <AnimatePresence custom={currentPage} mode="wait">
            <motion.div 
              key={currentPage}
              custom={1}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className={`w-full h-full flex items-center justify-center page ${isPageTurning ? 'turning' : ''}`}
            >
              <img 
                ref={imageRef}
                src={previewImages[currentPage]} 
                alt={`${title} - Sayfa ${currentPage + 1}`} 
                className="max-h-full max-w-full object-contain shadow-lg transition-all duration-300"
                style={{ 
                  maxHeight: "calc(80vh - 40px)",
                  transform: `scale(${zoomLevel}) translate(${position.x / zoomLevel}px, ${position.y / zoomLevel}px)`,
                  transition: isDragging ? 'none' : 'transform 0.3s ease'
                }}
              />
            </motion.div>
          </AnimatePresence>

          {/* Book edge shadow */}
          <div className="absolute h-full w-4 left-1/2 transform -translate-x-1/2 pointer-events-none"
               style={{ 
                 background: "linear-gradient(90deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.1) 100%)",
                 zIndex: 2 
               }} 
          />

          {/* Zoom controls */}
          <div className="absolute top-4 right-4 flex space-x-2">
            <Button 
              onClick={zoomIn} 
              disabled={zoomLevel >= 3}
              className="bg-white/80 text-black hover:bg-white rounded-full p-2 flex items-center"
              variant="outline"
              size="icon"
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button 
              onClick={zoomOut} 
              disabled={zoomLevel <= 1}
              className="bg-white/80 text-black hover:bg-white rounded-full p-2 flex items-center"
              variant="outline"
              size="icon"
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button 
              onClick={resetZoom} 
              disabled={zoomLevel === 1 && position.x === 0 && position.y === 0}
              className="bg-white/80 text-black hover:bg-white rounded-full p-2 flex items-center"
              variant="outline"
              size="icon"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>

          {/* Page navigation controls */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center items-center gap-8">
            <Button 
              onClick={prevPage} 
              disabled={currentPage === 0 || isPageTurning}
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
              disabled={currentPage === previewImages.length - 1 || isPageTurning}
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
