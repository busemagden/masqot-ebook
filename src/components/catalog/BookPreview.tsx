
import { useState } from 'react';
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

  const nextPage = () => {
    setCurrentPage((prev) => (prev < previewImages.length - 1 ? prev + 1 : prev));
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : prev));
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl w-[90vw] p-0 overflow-hidden bg-white">
        <DialogHeader className="p-4 border-b">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-serif">{title} - Önizleme</DialogTitle>
            <DialogClose className="h-8 w-8 rounded-full hover:bg-gray-100 flex items-center justify-center">
              <X className="h-4 w-4" />
            </DialogClose>
          </div>
        </DialogHeader>
        
        <div className="relative h-[80vh] bg-gray-100 flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentPage}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="w-full h-full flex items-center justify-center"
            >
              <img 
                src={previewImages[currentPage]} 
                alt={`${title} - Sayfa ${currentPage + 1}`} 
                className="max-h-full max-w-full object-contain shadow-lg"
              />
            </motion.div>
          </AnimatePresence>

          {/* Page navigation controls */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center items-center gap-8">
            <Button 
              onClick={prevPage} 
              disabled={currentPage === 0}
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
              disabled={currentPage === previewImages.length - 1}
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
