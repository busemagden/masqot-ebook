
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchFilter from '@/components/catalog/SearchFilter';
import BookList from '@/components/catalog/BookList';
import { bookCatalog, categories } from '@/data/bookCatalog';
import { Button } from '@/components/ui/button';
import { ArrowUpCircle, BookOpenCheck, HandCoins } from 'lucide-react';
import { motion } from 'framer-motion';

const Catalog = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tümü");
  const [sortOption, setSortOption] = useState("featured");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [pageReady, setPageReady] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Set page ready after a small delay for smooth entry animations
    const timer = setTimeout(() => {
      setPageReady(true);
    }, 100);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const handleAddToCart = (bookId: number, bookTitle: string) => {
    console.log(`Added book ${bookId} to cart`);
    
    toast({
      title: "Satın Alma İşlemi Başlatıldı",
      description: `${bookTitle} için ödeme sayfasına yönlendiriliyorsunuz.`,
      duration: 3000,
    });
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const filteredBooks = bookCatalog.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        book.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === "Tümü" || book.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const sortedBooks = [...filteredBooks].sort((a, b) => {
    switch (sortOption) {
      case "priceLow":
        return parseFloat(a.price.replace(/[^\d.-]/g, '')) - parseFloat(b.price.replace(/[^\d.-]/g, ''));
      case "priceHigh":
        return parseFloat(b.price.replace(/[^\d.-]/g, '')) - parseFloat(a.price.replace(/[^\d.-]/g, ''));
      case "newest":
        return b.id - a.id;
      case "popular":
        return (b.reviewCount || 0) - (a.reviewCount || 0);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-masqot-soft flex flex-col">
      <Header />

      <main className="container mx-auto px-4 py-12 flex-grow">
        {pageReady && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <h1 className="text-4xl font-serif font-bold text-masqot-dark mb-4 relative inline-block">
              Yapay Zeka E-Kitap Koleksiyonu
              <motion.div
                className="absolute -bottom-2 left-1/2 h-1 bg-masqot-primary rounded-full"
                initial={{ width: 0, x: "-50%" }}
                animate={{ width: "80%", x: "-40%" }}
                transition={{ delay: 0.3, duration: 0.6 }}
              />
            </h1>
            <p className="text-masqot-secondary max-w-2xl mx-auto">
              Yapay zeka, veri bilimi ve dijital dönüşüm konularında uzmanlaşmanızı sağlayacak kapsamlı e-kitaplarımızı keşfedin.
            </p>
            
            <div className="flex justify-center mt-8 space-x-8">
              <motion.div 
                className="flex items-center" 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <BookOpenCheck className="h-5 w-5 text-masqot-primary mr-2" />
                <span className="text-sm">Kendi hızınızda öğrenin</span>
              </motion.div>
              <motion.div 
                className="flex items-center" 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <HandCoins className="h-5 w-5 text-masqot-primary mr-2" />
                <span className="text-sm">30 gün para iade garantisi</span>
              </motion.div>
            </div>
          </motion.div>
        )}

        <SearchFilter 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          viewMode={viewMode}
          setViewMode={setViewMode}
          categories={categories}
          sortOption={sortOption}
          setSortOption={setSortOption}
        />

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6 flex justify-between items-center"
        >
          <p className="text-masqot-secondary bg-white/50 px-3 py-1 rounded-full text-sm shadow-sm">
            {filteredBooks.length} sonuç bulundu
          </p>
          <p className="text-sm text-masqot-secondary bg-white/50 px-3 py-1 rounded-full shadow-sm">
            MASQOT e-kitapları sadece site içinde okunabilir
          </p>
        </motion.div>

        <BookList 
          books={sortedBooks}
          viewMode={viewMode}
          onAddToCart={handleAddToCart}
        />

        {showScrollTop && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <Button
              className="fixed bottom-8 right-8 bg-masqot-primary/80 hover:bg-masqot-primary text-white rounded-full p-3 shadow-lg transition-all duration-300"
              onClick={scrollToTop}
              size="icon"
            >
              <ArrowUpCircle className="h-6 w-6" />
            </Button>
          </motion.div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Catalog;
