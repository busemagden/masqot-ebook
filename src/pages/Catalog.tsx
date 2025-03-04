import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchFilter from '@/components/catalog/SearchFilter';
import BookList from '@/components/catalog/BookList';
import { bookCatalog, categories } from '@/data/bookCatalog';
import { Button } from '@/components/ui/button';
import { ArrowUpCircle } from 'lucide-react';

const Catalog = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tümü");
  const [sortOption, setSortOption] = useState("featured");
  const [showScrollTop, setShowScrollTop] = useState(false);
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
    return () => window.removeEventListener('scroll', handleScroll);
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
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-serif font-bold text-masqot-dark mb-4">
            Yapay Zeka E-Kitap Koleksiyonu
          </h1>
          <p className="text-masqot-secondary max-w-2xl mx-auto">
            Yapay zeka, veri bilimi ve dijital dönüşüm konularında uzmanlaşmanızı sağlayacak kapsamlı e-kitaplarımızı keşfedin.
          </p>
        </div>

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

        <div className="mb-6 flex justify-between items-center">
          <p className="text-masqot-secondary">
            {filteredBooks.length} sonuç bulundu
          </p>
          <p className="text-sm text-masqot-secondary">
            MASQOT e-kitapları sadece site içinde okunabilir, indirilemez.
          </p>
        </div>

        <BookList 
          books={sortedBooks}
          viewMode={viewMode}
          onAddToCart={handleAddToCart}
        />

        {showScrollTop && (
          <Button
            className="fixed bottom-8 right-8 bg-masqot-primary/80 hover:bg-masqot-primary text-white rounded-full p-3 shadow-lg transition-all duration-300"
            onClick={scrollToTop}
            size="icon"
          >
            <ArrowUpCircle className="h-6 w-6" />
          </Button>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Catalog;
