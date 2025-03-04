
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Book, ShoppingCart, Grid3X3, List } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

// Book data (we'll later move this to a common data file)
const bookCatalog = [
  {
    id: 1,
    title: "AI ve Makine Öğrenimi Temelleri",
    author: "MASQOT Team",
    cover: "/placeholder.svg",
    price: "₺299",
    category: "Artificial Intelligence",
    description: "Yapay zeka ve makine öğrenimini temel kavramlardan ileri düzeye kadar kapsamlı şekilde ele alan bir kaynak."
  },
  {
    id: 2,
    title: "Python ile Derin Öğrenme",
    author: "MASQOT Team",
    cover: "/placeholder.svg",
    price: "₺399",
    category: "Deep Learning",
    description: "Python kullanarak derin öğrenme modellerini geliştirmeyi ve uygulamayı öğreten pratik bir rehber."
  },
  {
    id: 3,
    title: "Doğal Dil İşleme",
    author: "MASQOT Team",
    cover: "/placeholder.svg",
    price: "₺349",
    category: "NLP",
    description: "Metin verileri üzerinde çalışmak ve doğal dil işleme algoritmaları geliştirmek için temel bilgiler."
  },
  {
    id: 4,
    title: "Bilgisayarlı Görü Sistemleri",
    author: "MASQOT Team",
    cover: "/placeholder.svg",
    price: "₺329",
    category: "Computer Vision",
    description: "Bilgisayarlı görü teknolojilerinin temellerini ve pratik uygulamalarını anlatan kapsamlı bir kaynak."
  },
  {
    id: 5,
    title: "Büyük Veri Analizi",
    author: "MASQOT Team",
    cover: "/placeholder.svg",
    price: "₺379",
    category: "Big Data",
    description: "Büyük veri setlerinin işlenmesi, analizi ve görselleştirilmesi konularını ele alan detaylı bir rehber."
  },
  {
    id: 6,
    title: "Nöral Ağlar ve İleri Algoritmalar",
    author: "MASQOT Team",
    cover: "/placeholder.svg",
    price: "₺449",
    category: "Neural Networks",
    description: "Nöral ağların yapısı, çeşitleri ve gelişmiş algoritmalarla uygulanması hakkında detaylı bilgiler."
  }
];

const Kitaplar = () => {
  const [isHovered, setIsHovered] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-masqot-soft flex flex-col">
      <Header />

      <main className="container mx-auto px-4 py-12 flex-grow">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-serif font-bold text-masqot-dark">
            Kitap Kataloğu
          </h1>
          <div className="flex items-center space-x-2">
            <Button 
              variant={viewMode === 'grid' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setViewMode('grid')}
              className="bg-masqot-primary text-white"
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button 
              variant={viewMode === 'list' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setViewMode('list')}
              className="bg-masqot-primary text-white"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bookCatalog.map((book) => (
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
            {bookCatalog.map((book) => (
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
      </main>

      <Footer />
    </div>
  );
};

export default Kitaplar;
