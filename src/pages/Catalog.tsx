
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchFilter from '@/components/catalog/SearchFilter';
import BookList from '@/components/catalog/BookList';
import { bookCatalog, categories } from '@/data/bookCatalog';

const Catalog = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tümü");
  const { toast } = useToast();

  const handleAddToCart = (bookId: number, bookTitle: string) => {
    console.log(`Added book ${bookId} to cart`);
    
    toast({
      title: "Sepete Eklendi!",
      description: `${bookTitle} sepetinize eklendi.`,
      duration: 3000,
    });
  };

  const filteredBooks = bookCatalog.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        book.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === "Tümü" || book.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-masqot-soft flex flex-col">
      <Header />

      <main className="container mx-auto px-4 py-12 flex-grow">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-serif font-bold text-masqot-dark mb-4">
            E-Kitap Koleksiyonu
          </h1>
          <p className="text-masqot-secondary max-w-2xl mx-auto">
            Yapay zeka ve veri bilimi konularında uzmanlaşmanızı sağlayacak kapsamlı e-kitaplarımızı keşfedin.
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
        />

        <div className="mb-6">
          <p className="text-masqot-secondary">
            {filteredBooks.length} sonuç bulundu
          </p>
        </div>

        <BookList 
          books={filteredBooks}
          viewMode={viewMode}
          onAddToCart={handleAddToCart}
        />
      </main>

      <Footer />
    </div>
  );
};

export default Catalog;
