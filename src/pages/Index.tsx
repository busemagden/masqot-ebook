
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { bookCatalog } from "@/data/bookCatalog";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/home/Hero";
import UpcomingBooks from "@/components/home/UpcomingBooks";
import LearningPaths from "@/components/home/LearningPaths";
import CallToAction from "@/components/home/CallToAction";

const Index = () => {
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
      
      <Hero featuredBook={featuredBook} onAddToCart={handleAddToCart} />
      
      <UpcomingBooks upcomingBooks={upcomingBooks} />
      
      <LearningPaths />
      
      <CallToAction />
      
      <Footer />
    </div>
  );
};

export default Index;
