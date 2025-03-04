
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Rss } from "lucide-react";
import { BookType } from '@/types/book';

interface UpcomingBooksProps {
  upcomingBooks: BookType[];
}

const UpcomingBooks = ({ upcomingBooks }: UpcomingBooksProps) => {
  const [isHovered, setIsHovered] = useState<number | null>(null);

  return (
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
  );
};

export default UpcomingBooks;
