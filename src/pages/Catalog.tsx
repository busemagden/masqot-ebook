import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Book, ShoppingCart, Grid3X3, List, Search, Filter } from "lucide-react";
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
  },
  {
    id: 7,
    title: "Veri Bilimi için İstatistik",
    author: "MASQOT Team",
    cover: "/placeholder.svg",
    price: "₺329",
    category: "Statistics",
    description: "Veri bilimi uygulamalarında kullanılan temel ve ileri düzey istatistik kavramlarını açıklayan bir kaynak."
  },
  {
    id: 8,
    title: "Etik Yapay Zeka",
    author: "MASQOT Team",
    cover: "/placeholder.svg",
    price: "₺279",
    category: "AI Ethics",
    description: "Yapay zeka uygulamalarında etik kuralları, sorumlulukları ve karşılaşılan zorlukları ele alan kapsamlı bir inceleme."
  },
  {
    id: 9,
    title: "Dijital Çağda Başarının Formülü",
    author: "MASQOT Team",
    cover: "/lovable-uploads/02b6a973-aac4-40b1-b116-de88d72b509b.png",
    price: "₺499",
    category: "AI Tools",
    description: "20 Etkili AI Aracıyla İşinizi Adım Adım İleriye Taşıyın. İş dünyasında yapay zeka araçlarını kullanarak verimliliği artırmanın yollarını öğreten kapsamlı bir rehber."
  },
  {
    id: 10,
    title: "Yapay Zeka İle İş Dünyasında Fark Yaratın",
    author: "MASQOT Team",
    cover: "/lovable-uploads/fc9fea45-0ec6-4eed-9ee9-f4371f2c3d70.png",
    price: "₺469",
    category: "Business AI",
    description: "Modern iş dünyasında rekabet avantajı sağlamak için yapay zeka teknolojilerini nasıl kullanacağınızı anlatan stratejik bir kılavuz."
  }
];

// Categories
const categories = [
  "Tümü",
  "Artificial Intelligence",
  "Deep Learning",
  "NLP",
  "Computer Vision",
  "Big Data",
  "Neural Networks",
  "Statistics",
  "AI Ethics",
  "AI Tools",
  "Business AI"
];

const Catalog = () => {
  const [isHovered, setIsHovered] = useState<number | null>(null);
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

        <div className="bg-white/50 rounded-xl p-6 mb-8 shadow-sm backdrop-blur-sm">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-end">
            <div className="flex-1 space-y-2">
              <label htmlFor="search" className="text-sm font-medium text-masqot-dark">Kitap, Yazar veya Anahtar Kelime Ara</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-masqot-primary" />
                <Input 
                  id="search" 
                  placeholder="Arama yapın..." 
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full md:w-64 space-y-2">
              <label htmlFor="category" className="text-sm font-medium text-masqot-dark">Kategori</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger id="category" className="w-full">
                  <SelectValue placeholder="Kategori Seçin" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
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
        </div>

        <div className="mb-6">
          <p className="text-masqot-secondary">
            {filteredBooks.length} sonuç bulundu
          </p>
        </div>

        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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
                  <div className="mb-2">
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-masqot-soft text-masqot-primary">
                      {book.category}
                    </span>
                  </div>
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
                    <div className="mb-2">
                      <span className="text-xs font-medium px-2 py-1 rounded-full bg-masqot-soft text-masqot-primary">
                        {book.category}
                      </span>
                    </div>
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

        {filteredBooks.length === 0 && (
          <div className="text-center py-12">
            <Book className="h-12 w-12 text-masqot-primary mx-auto mb-4" />
            <h3 className="text-xl font-medium text-masqot-dark mb-2">Sonuç Bulunamadı</h3>
            <p className="text-masqot-secondary">
              Arama kriterlerinize uygun e-kitap bulunamadı. Lütfen farklı anahtar kelimeler deneyin veya filtreleri sıfırlayın.
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Catalog;
