
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Book, ShoppingCart, Grid3X3, List, ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

// Book categories
const categories = [
  { id: "all", name: "Tümü" },
  { id: "ai", name: "Yapay Zeka" },
  { id: "ml", name: "Makine Öğrenimi" },
  { id: "dl", name: "Derin Öğrenme" },
  { id: "nlp", name: "Doğal Dil İşleme" },
  { id: "cv", name: "Bilgisayarlı Görü" }
];

// Book data (we'll later move this to a common data file)
const bookCatalog = [
  {
    id: 1,
    title: "AI ve Makine Öğrenimi Temelleri",
    author: "MASQOT Team",
    cover: "/placeholder.svg",
    price: "₺299",
    category: "ai",
    rating: 4.8,
    description: "Yapay zeka ve makine öğrenimini temel kavramlardan ileri düzeye kadar kapsamlı şekilde ele alan bir kaynak."
  },
  {
    id: 2,
    title: "Python ile Derin Öğrenme",
    author: "MASQOT Team",
    cover: "/placeholder.svg",
    price: "₺399",
    category: "dl",
    rating: 4.9,
    description: "Python kullanarak derin öğrenme modellerini geliştirmeyi ve uygulamayı öğreten pratik bir rehber."
  },
  {
    id: 3,
    title: "Doğal Dil İşleme",
    author: "MASQOT Team",
    cover: "/placeholder.svg",
    price: "₺349",
    category: "nlp",
    rating: 4.7,
    description: "Metin verileri üzerinde çalışmak ve doğal dil işleme algoritmaları geliştirmek için temel bilgiler."
  },
  {
    id: 4,
    title: "Bilgisayarlı Görü Sistemleri",
    author: "MASQOT Team",
    cover: "/placeholder.svg",
    price: "₺329",
    category: "cv",
    rating: 4.6,
    description: "Bilgisayarlı görü teknolojilerinin temellerini ve pratik uygulamalarını anlatan kapsamlı bir kaynak."
  },
  {
    id: 5,
    title: "Büyük Veri Analizi",
    author: "MASQOT Team",
    cover: "/placeholder.svg",
    price: "₺379",
    category: "ml",
    rating: 4.8,
    description: "Büyük veri setlerinin işlenmesi, analizi ve görselleştirilmesi konularını ele alan detaylı bir rehber."
  },
  {
    id: 6,
    title: "Nöral Ağlar ve İleri Algoritmalar",
    author: "MASQOT Team",
    cover: "/placeholder.svg",
    price: "₺449",
    category: "ai",
    rating: 4.9,
    description: "Nöral ağların yapısı, çeşitleri ve gelişmiş algoritmalarla uygulanması hakkında detaylı bilgiler."
  }
];

const Kitaplar = () => {
  const [isHovered, setIsHovered] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const { toast } = useToast();

  const handleAddToCart = (bookId: number, bookTitle: string) => {
    // Here you would integrate with a real cart system
    console.log(`Added book ${bookId} to cart`);
    
    // Show toast notification
    toast({
      title: "Sepete Eklendi!",
      description: `${bookTitle} sepetinize eklendi.`,
      duration: 3000,
    });
  };

  // Filter books by category
  const filteredBooks = activeCategory === "all" 
    ? bookCatalog 
    : bookCatalog.filter(book => book.category === activeCategory);

  // Function to generate star ratings
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <svg 
            key={i} 
            className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        <span className="ml-1 text-sm text-masqot-secondary">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-masqot-soft flex flex-col">
      <Header />

      <main className="container mx-auto px-4 py-12 flex-grow">
        <div className="mb-8">
          <div className="flex items-center text-sm text-masqot-secondary mb-4">
            <Link to="/" className="hover:text-masqot-primary transition-colors">Ana Sayfa</Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="font-medium text-masqot-dark">Kitaplar</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-masqot-dark mb-2">
            MASQOT Kitaplığı
          </h1>
          <p className="text-masqot-secondary">
            En yeni ve popüler yapay zeka ve veri bilimi e-kitaplarımızı keşfedin
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Category Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white/50 rounded-xl p-6 shadow-sm backdrop-blur-sm">
                <h3 className="text-lg font-medium text-masqot-dark mb-4">Kategoriler</h3>
                <ul className="space-y-2">
                  {categories.map((category) => (
                    <li key={category.id}>
                      <button
                        className={`w-full text-left py-2 px-3 rounded-lg transition-colors ${
                          activeCategory === category.id 
                            ? 'bg-masqot-primary text-white' 
                            : 'text-masqot-secondary hover:bg-masqot-soft'
                        }`}
                        onClick={() => setActiveCategory(category.id)}
                      >
                        {category.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white/50 rounded-xl p-6 shadow-sm backdrop-blur-sm mt-6">
                <h3 className="text-lg font-medium text-masqot-dark mb-4">Görünüm</h3>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant={viewMode === 'grid' ? 'default' : 'outline'} 
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className={viewMode === 'grid' ? 'bg-masqot-primary text-white' : ''}
                  >
                    <Grid3X3 className="h-4 w-4" />
                    <span className="ml-2">Grid</span>
                  </Button>
                  <Button 
                    variant={viewMode === 'list' ? 'default' : 'outline'} 
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className={viewMode === 'list' ? 'bg-masqot-primary text-white' : ''}
                  >
                    <List className="h-4 w-4" />
                    <span className="ml-2">Liste</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Book Listing */}
          <div className="lg:col-span-3">
            {filteredBooks.length > 0 ? (
              <>
                {viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredBooks.map((book) => (
                      <Card
                        key={book.id}
                        className="book-card glass-card transition-all duration-300 hover:shadow-xl"
                        onMouseEnter={() => setIsHovered(book.id)}
                        onMouseLeave={() => setIsHovered(null)}
                      >
                        <div className="p-6">
                          <img
                            src={book.cover}
                            alt={book.title}
                            className="w-full h-64 object-cover rounded-md mb-4 transition-transform duration-300"
                            style={{
                              transform: isHovered === book.id ? 'scale(1.05)' : 'scale(1)',
                            }}
                          />
                          <h3 className="text-xl font-serif font-bold text-masqot-dark mb-2">
                            {book.title}
                          </h3>
                          <p className="text-masqot-secondary mb-2">{book.author}</p>
                          <div className="mb-3">
                            {renderStars(book.rating)}
                          </div>
                          <p className="text-sm text-gray-600 mb-4 line-clamp-2">{book.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-bold text-masqot-primary">
                              {book.price}
                            </span>
                            <Button
                              className="bg-masqot-primary hover:bg-masqot-secondary text-white transition-all duration-300"
                              onClick={() => handleAddToCart(book.id, book.title)}
                            >
                              <ShoppingCart className="mr-2 h-4 w-4" />
                              Sepete Ekle
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-6">
                    {filteredBooks.map((book) => (
                      <Card
                        key={book.id}
                        className="book-card glass-card transition-all duration-300 hover:shadow-xl"
                      >
                        <div className="p-6 flex flex-col md:flex-row gap-6">
                          <img
                            src={book.cover}
                            alt={book.title}
                            className="w-full md:w-48 h-48 object-cover rounded-md"
                          />
                          <div className="flex-1">
                            <h3 className="text-xl font-serif font-bold text-masqot-dark mb-2">
                              {book.title}
                            </h3>
                            <p className="text-masqot-secondary mb-2">{book.author}</p>
                            <div className="mb-3">
                              {renderStars(book.rating)}
                            </div>
                            <p className="text-sm text-gray-600 mb-4">{book.description}</p>
                            <div className="flex items-center justify-between mt-auto">
                              <span className="text-lg font-bold text-masqot-primary">
                                {book.price}
                              </span>
                              <Button
                                className="bg-masqot-primary hover:bg-masqot-secondary text-white transition-all duration-300"
                                onClick={() => handleAddToCart(book.id, book.title)}
                              >
                                <ShoppingCart className="mr-2 h-4 w-4" />
                                Sepete Ekle
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-20 bg-white/50 rounded-xl">
                <Book className="h-12 w-12 text-masqot-primary mx-auto mb-4" />
                <h3 className="text-xl font-medium text-masqot-dark mb-2">Bu kategoride kitap bulunamadı</h3>
                <p className="text-masqot-secondary">
                  Lütfen başka bir kategori seçin veya daha sonra tekrar kontrol edin.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Kitaplar;
