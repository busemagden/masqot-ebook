import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useAuth } from '@clerk/clerk-react';
import CartDrawer from "@/components/cart/CartDrawer";

const Header = () => {
  const { isSignedIn, user } = useAuth();

  return (
    <header className="flex items-center justify-between p-4 bg-white shadow">
      <div className="flex items-center">
        <Link to="/" className="text-xl font-bold">MASQOT</Link>
      </div>
      <div className="flex items-center space-x-4">
        <CartDrawer />
        {isSignedIn && user ? (
          <div className="flex items-center space-x-2">
            <span>{user.firstName}</span>
            <Link to="/my-books">
              <Button variant="outline">Kitaplarım</Button>
            </Link>
          </div>
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
