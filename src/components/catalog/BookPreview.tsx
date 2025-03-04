
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
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

  // Reset current page when dialog opens
  useEffect(() => {
    if (isOpen) {
      setCurrentPage(0);
    }
  }, [isOpen]);

  const nextPage = () => {
    if (currentPage < previewImages.length - 1 && !isPageTurning) {
      setIsPageTurning(true);
      setTimeout(() => {
        setCurrentPage(prev => prev + 1);
        setIsPageTurning(false);
      }, 300);
    }
  };

  const prevPage = () => {
    if (currentPage > 0 && !isPageTurning) {
      setIsPageTurning(true);
      setTimeout(() => {
        setCurrentPage(prev => prev - 1);
        setIsPageTurning(false);
      }, 300);
    }
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
            <DialogClose className="h-8 w-8 rounded-full hover:bg-gray-100 flex items-center justify-center">
              <X className="h-4 w-4" />
            </DialogClose>
          </div>
        </DialogHeader>
        
        <div className="relative h-[80vh] bg-gray-100 flex items-center justify-center overflow-hidden page-transition">
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
                src={previewImages[currentPage]} 
                alt={`${title} - Sayfa ${currentPage + 1}`} 
                className="max-h-full max-w-full object-contain shadow-lg"
                style={{ maxHeight: "calc(80vh - 40px)" }}
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
