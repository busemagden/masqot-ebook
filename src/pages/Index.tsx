
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Book, BookOpen, User, ShoppingCart } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

const featuredBooks = [
  {
    id: 1,
    title: "AI ve Makine Öğrenimi Temelleri",
    author: "MASQOT Team",
    cover: "/placeholder.svg",
    price: "₺299",
  },
  {
    id: 2,
    title: "Python ile Derin Öğrenme",
    author: "MASQOT Team",
    cover: "/placeholder.svg",
    price: "₺399",
  },
  {
    id: 3,
    title: "Doğal Dil İşleme",
    author: "MASQOT Team",
    cover: "/placeholder.svg",
    price: "₺349",
  },
];

const Index = () => {
  const [isHovered, setIsHovered] = useState<number | null>(null);
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

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="flex flex-col items-center text-center space-y-6 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-masqot-dark">
            MASQOT E-Kitap
          </h1>
          <p className="text-xl text-masqot-secondary max-w-2xl">
            Yapay zeka ve makine öğrenimi konularında uzmanlaşmanızı sağlayacak kapsamlı e-kitap koleksiyonumuzu keşfedin.
          </p>
          <Link to="/catalog">
            <Button
              className="mt-8 bg-masqot-primary hover:bg-masqot-secondary text-white px-8 py-6 text-lg rounded-full transition-all duration-300"
            >
              <BookOpen className="mr-2 h-5 w-5" />
              Koleksiyonu Keşfet
            </Button>
          </Link>
        </div>
      </section>

      {/* Featured Books */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-serif font-bold text-center mb-12 text-masqot-dark">
          Öne Çıkan E-Kitaplar
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredBooks.map((book) => (
            <Card
              key={book.id}
              className="book-card glass-card"
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
                <p className="text-masqot-secondary mb-4">{book.author}</p>
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
        <div className="text-center mt-10">
          <Link to="/catalog">
            <Button
              variant="outline"
              className="border-masqot-primary text-masqot-primary hover:bg-masqot-soft"
            >
              Tüm Koleksiyonu Görüntüle
            </Button>
          </Link>
        </div>
      </section>

      {/* Call to Action */}
      <section className="container mx-auto px-4 py-16">
        <div className="glass-card rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-serif font-bold text-masqot-dark mb-6">
            Hemen Başlayın
          </h2>
          <p className="text-lg text-masqot-secondary mb-8 max-w-2xl mx-auto">
            E-kitaplarımıza erişmek için hesap oluşturun ve yapay zeka dünyasını keşfetmeye başlayın.
          </p>
          <Link to="/login">
            <Button
              className="bg-masqot-primary hover:bg-masqot-secondary text-white px-8 py-6 text-lg rounded-full transition-all duration-300"
            >
              <User className="mr-2 h-5 w-5" />
              Hesap Oluştur
            </Button>
          </Link>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
