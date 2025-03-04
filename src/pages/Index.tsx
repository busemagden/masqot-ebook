
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookOpen, User, ShoppingCart, CheckCircle, Rss, GraduationCap, Users } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { bookCatalog } from "@/data/bookCatalog";

const Index = () => {
  const [isHovered, setIsHovered] = useState<number | null>(null);
  const { toast } = useToast();

  // Get featured book from catalog (first book)
  const featuredBook = bookCatalog[0];
  
  // Get upcoming books for the featured section
  const upcomingBooks = bookCatalog.filter(book => book.comingSoon === true).slice(0, 3);

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

      {/* Hero Section with Featured Book */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
          <div className="lg:col-span-3 space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-masqot-dark leading-tight">
              MASQOT E-Kitap ile <span className="text-masqot-primary">Dijital Dönüşümünüzü</span> Hızlandırın
            </h1>
            <p className="text-lg md:text-xl text-masqot-secondary max-w-2xl">
              Yapay zeka ve dijital dönüşüm konularında uzmanlaşmanızı sağlayacak kapsamlı e-kitap koleksiyonumuzu keşfedin.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Link to="/catalog">
                <Button
                  className="bg-masqot-primary hover:bg-masqot-secondary text-white px-5 py-2 text-sm rounded-md transition-all duration-300 w-full sm:w-auto"
                >
                  <BookOpen className="mr-2 h-4 w-4" />
                  Koleksiyonu Keşfet
                </Button>
              </Link>
              <a 
                href="https://chat.whatsapp.com/G4tshtPS1RE64PEecc3QWc" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-2 text-sm rounded-md transition-all duration-300 w-full sm:w-auto"
              >
                <Users className="h-4 w-4" />
                Topluluğa Katıl
              </a>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-masqot-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-medium text-masqot-dark">Güncel İçerik</h3>
                  <p className="text-sm text-masqot-secondary">Sürekli güncellenen yapay zeka ve dijital dönüşüm içerikleri</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-masqot-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-medium text-masqot-dark">Pratik Uygulamalar</h3>
                  <p className="text-sm text-masqot-secondary">İş dünyasında hemen kullanabileceğiniz pratik AI araçları</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-masqot-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-medium text-masqot-dark">Topluluk Desteği</h3>
                  <p className="text-sm text-masqot-secondary">Whatsapp topluluğumuzla sürekli destek ve güncellemeler</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2 flex justify-center">
            <div className="relative transform transition-all duration-300 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-masqot-primary/30 to-masqot-primary/10 rounded-lg blur-lg"></div>
              <Card className="glass-card border-0 shadow-lg overflow-hidden relative z-10">
                <div className="relative p-6">
                  <div className="absolute top-4 right-4 bg-masqot-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                    En Çok Satan
                  </div>
                  <img
                    src={featuredBook.cover}
                    alt={featuredBook.title}
                    className="w-full h-80 object-cover rounded-md mb-4 shadow-lg"
                  />
                  <h3 className="text-xl font-serif font-bold text-masqot-dark mb-2">
                    {featuredBook.title}
                  </h3>
                  <p className="text-masqot-secondary mb-3">{featuredBook.author}</p>
                  <p className="text-sm text-masqot-secondary mb-4 line-clamp-2">{featuredBook.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-masqot-primary">
                      {featuredBook.price}
                    </span>
                    <Button
                      className="bg-masqot-primary hover:bg-masqot-secondary text-white text-sm rounded-md transition-all duration-300"
                      onClick={() => handleAddToCart(featuredBook.id, featuredBook.title)}
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Sepete Ekle
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Books Section */}
      <section className="container mx-auto px-4 py-16 bg-white/50 rounded-3xl my-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-bold text-masqot-dark mb-4">
            Yakında Çıkacak E-Kitaplar
          </h2>
          <p className="text-masqot-secondary max-w-2xl mx-auto">
            Dijital dönüşüm yolculuğunuzda size rehberlik edecek, çok yakında yayınlanacak kitaplarımız
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {upcomingBooks.map((book) => (
            <Card
              key={book.id}
              className="book-card overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300"
              onMouseEnter={() => setIsHovered(book.id)}
              onMouseLeave={() => setIsHovered(null)}
            >
              <div className="p-6">
                <div className="relative">
                  <img
                    src={book.cover || "/placeholder.svg"}
                    alt={book.title}
                    className="w-full h-64 object-cover rounded-md mb-4 transition-transform duration-300"
                    style={{
                      transform: isHovered === book.id ? 'scale(1.05)' : 'scale(1)',
                    }}
                  />
                  {book.comingSoon && (
                    <div className="absolute top-3 right-3 bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      Yakında
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-serif font-bold text-masqot-dark mb-2">
                  {book.title}
                </h3>
                <p className="text-masqot-secondary mb-2">{book.author}</p>
                <p className="text-sm text-masqot-secondary mb-4 line-clamp-2">{book.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-masqot-primary">
                    {book.price}
                  </span>
                  <Button
                    variant="outline"
                    className="border-masqot-primary text-masqot-primary hover:bg-masqot-soft text-sm rounded-md"
                  >
                    <Rss className="mr-2 h-4 w-4" />
                    Haber Ver
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Link to="/catalog">
            <Button
              variant="outline"
              className="border-masqot-primary text-masqot-primary hover:bg-masqot-soft text-sm"
            >
              Tüm Koleksiyonu Görüntüle
            </Button>
          </Link>
        </div>
      </section>

      {/* Learning Paths Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-bold text-masqot-dark mb-4">
            Öğrenme Yolculuğunuz
          </h2>
          <p className="text-masqot-secondary max-w-2xl mx-auto">
            MASQOT ekosistemi ile dijital dönüşüm yolculuğunuzda size eşlik ediyoruz
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="p-6 border-0 shadow-md hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-masqot-soft/50">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="bg-masqot-soft p-3 rounded-full">
                <BookOpen className="h-6 w-6 text-masqot-primary" />
              </div>
              <h3 className="text-xl font-serif font-bold text-masqot-dark">E-Kitaplar</h3>
              <p className="text-masqot-secondary">
                Kapsamlı ve pratik içeriklerle dolu e-kitaplarımızla başlayın
              </p>
              <Link to="/catalog">
                <Button
                  variant="outline"
                  className="border-masqot-primary text-masqot-primary hover:bg-masqot-soft mt-2 text-sm"
                >
                  Kitapları Keşfet
                </Button>
              </Link>
            </div>
          </Card>
          
          <Card className="p-6 border-0 shadow-md hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-masqot-soft/50">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="bg-masqot-soft p-3 rounded-full">
                <GraduationCap className="h-6 w-6 text-masqot-primary" />
              </div>
              <h3 className="text-xl font-serif font-bold text-masqot-dark">Academy</h3>
              <p className="text-masqot-secondary">
                Video dersler ve interaktif içeriklerle öğrenmeye devam edin
              </p>
              <a href="https://academy.masqot.co" target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outline"
                  className="border-masqot-primary text-masqot-primary hover:bg-masqot-soft mt-2 text-sm"
                >
                  Academy'yi Ziyaret Et
                </Button>
              </a>
            </div>
          </Card>
          
          <Card className="p-6 border-0 shadow-md hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-masqot-soft/50">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="bg-masqot-soft p-3 rounded-full">
                <Users className="h-6 w-6 text-masqot-primary" />
              </div>
              <h3 className="text-xl font-serif font-bold text-masqot-dark">Topluluk</h3>
              <p className="text-masqot-secondary">
                WhatsApp topluluğumuza katılarak destek alın ve güncel kalın
              </p>
              <a href="https://chat.whatsapp.com/G4tshtPS1RE64PEecc3QWc" target="_blank" rel="noopener noreferrer">
                <Button
                  className="bg-green-500 hover:bg-green-600 text-white mt-2 text-sm"
                >
                  Topluluğa Katıl
                </Button>
              </a>
            </div>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="container mx-auto px-4 py-16 mb-8">
        <div className="glass-card rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-serif font-bold text-masqot-dark mb-6">
            Hemen Başlayın
          </h2>
          <p className="text-lg text-masqot-secondary mb-8 max-w-2xl mx-auto">
            E-kitaplarımıza erişmek için hesap oluşturun ve yapay zeka dünyasını keşfetmeye başlayın.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login">
              <Button
                className="bg-masqot-primary hover:bg-masqot-secondary text-white px-6 py-2 text-sm rounded-md transition-all duration-300 w-full sm:w-auto"
              >
                <User className="mr-2 h-4 w-4" />
                Hesap Oluştur
              </Button>
            </Link>
            <a href="https://chat.whatsapp.com/G4tshtPS1RE64PEecc3QWc" target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                className="border-green-500 text-green-500 hover:bg-green-50 px-6 py-2 text-sm rounded-md transition-all duration-300 w-full sm:w-auto"
              >
                <Users className="mr-2 h-4 w-4" />
                WhatsApp Grubuna Katıl
              </Button>
            </a>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
