
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, User, ShoppingCart, Rss } from "lucide-react";

const Header = () => {
  return (
    <header className="w-full bg-white/70 backdrop-blur-md border-b border-masqot-soft sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img 
            src="/lovable-uploads/37b957ea-2d4c-47f6-85e3-ae4359eeaa5c.png" 
            alt="MASQOT Logo" 
            className="h-10 w-auto"
          />
          <span className="ml-2 text-xl font-serif font-bold text-masqot-dark">E-Kitap</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-masqot-dark hover:text-masqot-primary transition-colors duration-200">
            Ana Sayfa
          </Link>
          <Link to="/catalog" className="text-masqot-dark hover:text-masqot-primary transition-colors duration-200">
            Koleksiyon
          </Link>
          <a href="https://masqot.co" target="_blank" rel="noopener noreferrer" className="text-masqot-dark hover:text-masqot-primary transition-colors duration-200">
            Blog
          </a>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Link to="/catalog">
            <Button variant="ghost" className="text-masqot-dark hover:text-masqot-primary hover:bg-masqot-soft">
              <BookOpen className="h-5 w-5" />
              <span className="ml-2 hidden sm:inline">Katalog</span>
            </Button>
          </Link>
          <Button variant="ghost" className="text-masqot-dark hover:text-masqot-primary hover:bg-masqot-soft relative">
            <ShoppingCart className="h-5 w-5" />
            <span className="ml-2 hidden sm:inline">Sepet</span>
            <span className="absolute -top-1 -right-1 bg-masqot-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              0
            </span>
          </Button>
          <Link to="/login">
            <Button className="bg-masqot-primary hover:bg-masqot-secondary text-white">
              <User className="h-5 w-5" />
              <span className="ml-2 hidden sm:inline">Giriş Yap</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
