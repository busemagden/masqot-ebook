
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, User, ShoppingCart, Users, GraduationCap } from "lucide-react";

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
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-masqot-dark hover:text-masqot-primary transition-colors duration-200">
            Ana Sayfa
          </Link>
          <Link to="/catalog" className="text-masqot-dark hover:text-masqot-primary transition-colors duration-200">
            Koleksiyon
          </Link>
          <a href="https://academy.masqot.co" target="_blank" rel="noopener noreferrer" className="text-masqot-dark hover:text-masqot-primary transition-colors duration-200 flex items-center">
            <GraduationCap className="h-4 w-4 mr-1" />
            Academy
          </a>
          <a href="https://masqot.co" target="_blank" rel="noopener noreferrer" className="text-masqot-dark hover:text-masqot-primary transition-colors duration-200">
            Blog
          </a>
          <a 
            href="https://chat.whatsapp.com/G4tshtPS1RE64PEecc3QWc" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded text-sm font-medium transition-colors flex items-center"
          >
            <Users className="h-3.5 w-3.5 mr-1" />
            Topluluğa Katıl
          </a>
        </nav>
        
        <div className="flex items-center space-x-3">
          <Link to="/catalog">
            <Button variant="ghost" size="sm" className="text-masqot-dark hover:text-masqot-primary hover:bg-masqot-soft">
              <BookOpen className="h-4 w-4" />
              <span className="ml-1 hidden sm:inline text-sm">Katalog</span>
            </Button>
          </Link>
          <Button variant="ghost" size="sm" className="text-masqot-dark hover:text-masqot-primary hover:bg-masqot-soft relative">
            <ShoppingCart className="h-4 w-4" />
            <span className="ml-1 hidden sm:inline text-sm">Sepet</span>
            <span className="absolute -top-1 -right-1 bg-masqot-primary text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              0
            </span>
          </Button>
          <a 
            href="https://chat.whatsapp.com/G4tshtPS1RE64PEecc3QWc" 
            target="_blank" 
            rel="noopener noreferrer"
            className="md:hidden bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded text-xs font-medium transition-colors flex items-center"
          >
            <Users className="h-3 w-3" />
          </a>
          <Link to="/login">
            <Button size="sm" className="bg-masqot-primary hover:bg-masqot-secondary text-white text-sm">
              <User className="h-4 w-4" />
              <span className="ml-1 hidden sm:inline">Giriş</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
