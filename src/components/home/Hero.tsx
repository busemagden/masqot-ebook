import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { CheckCircle, BookOpen, Users, ShoppingCart } from "lucide-react";
import { Card } from "@/components/ui/card";
import { BookType } from '@/types/book';

interface HeroProps {
  featuredBook: BookType;
  onAddToCart: (bookId: number, bookTitle: string) => void;
}

const Hero = ({ featuredBook, onAddToCart }: HeroProps) => {
  return (
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
                    onClick={() => onAddToCart(featuredBook.id, featuredBook.title)}
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
  );
};

export default Hero;
