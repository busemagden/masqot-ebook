
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useAuth } from '@clerk/clerk-react';
import CartDrawer from "@/components/cart/CartDrawer";
import { User } from 'lucide-react';

const Header = () => {
  const { isSignedIn } = useAuth();

  return (
    <header className="flex items-center justify-between p-4 bg-white shadow">
      <div className="flex items-center gap-3">
        <Link to="/" className="flex items-center gap-2">
          <img 
            src="/lovable-uploads/69c0a793-1c2e-48d6-a8c1-e56524249ceb.png" 
            alt="Masqot Logo" 
            className="h-10 w-auto" // Increased size from h-8 to h-10
          />
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-500">E-kitap</span>
            <span className="text-sm font-semibold text-masqot-primary">#gelecegiokuyun</span>
          </div>
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <Link to="/catalog">
          <Button variant="ghost">Katalog</Button>
        </Link>
        <CartDrawer />
        {isSignedIn ? (
          <Link to="/profile">
            <Button variant="outline" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Profil
            </Button>
          </Link>
        ) : (
          <Link to="/login">
            <Button variant="outline">Giriş Yap</Button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
