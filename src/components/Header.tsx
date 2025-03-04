
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import CartDrawer from "@/components/cart/CartDrawer";
import { Mail, Home, ExternalLink, Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="flex items-center justify-between p-4 bg-white shadow">
      <div className="flex items-center gap-3">
        <Link to="/" className="flex items-center gap-2">
          <img 
            src="/lovable-uploads/69c0a793-1c2e-48d6-a8c1-e56524249ceb.png" 
            alt="Masqot Logo" 
            className="h-12 w-auto"
          />
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-500">E-kitap</span>
            <span className="text-sm font-semibold text-masqot-primary">#gelecegiokuyun</span>
          </div>
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-3">
        <Link to="/">
          <Button variant="ghost" className="flex items-center gap-1">
            <Home className="h-4 w-4" />
            Anasayfa
          </Button>
        </Link>
        <a href="https://masqot.co" target="_blank" rel="noopener noreferrer">
          <Button variant="ghost" className="flex items-center gap-1">
            <ExternalLink className="h-4 w-4" />
            Blog
          </Button>
        </a>
        <Link to="/catalog">
          <Button variant="ghost">Katalog</Button>
        </Link>
        <Link to="/contact">
          <Button variant="ghost" className="flex items-center gap-1">
            <Mail className="h-4 w-4" />
            Bizimle İletişime Geçin
          </Button>
        </Link>
        <CartDrawer />
      </div>

      {/* Mobile menu button */}
      <div className="flex items-center md:hidden gap-2">
        <CartDrawer />
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="h-10 w-10">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Menüyü Aç</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[80%] sm:w-[350px] bg-white">
            <div className="flex flex-col gap-4 mt-8">
              <Link to="/" className="w-full" onClick={() => setIsOpen(false)}>
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <Home className="h-4 w-4" />
                  Anasayfa
                </Button>
              </Link>
              <a 
                href="https://masqot.co" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-full"
              >
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Blog
                </Button>
              </a>
              <Link to="/catalog" className="w-full" onClick={() => setIsOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">
                  Katalog
                </Button>
              </Link>
              <Link to="/contact" className="w-full" onClick={() => setIsOpen(false)}>
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <Mail className="h-4 w-4" />
                  Bizimle İletişime Geçin
                </Button>
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
