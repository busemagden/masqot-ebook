
import React, { createContext, useContext, useState, useEffect } from 'react';
import { BookType } from '@/types/book';
import { toast } from "sonner";

type CartItem = {
  id: number;
  title: string;
  price: string;
  cover: string;
  quantity: number;
};

interface CartContextType {
  items: CartItem[];
  addItem: (book: BookType) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
  getTotal: () => string;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  
  // Load cart from localStorage on initial render
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        setItems(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error('Failed to load cart from localStorage:', error);
    }
  }, []);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(items));
    } catch (error) {
      console.error('Failed to save cart to localStorage:', error);
    }
  }, [items]);

  const addItem = (book: BookType) => {
    setItems(prevItems => {
      // Check if the item is already in the cart
      const existingItem = prevItems.find(item => item.id === book.id);
      
      if (existingItem) {
        // Item exists, just notify user
        toast.info(`${book.title} zaten sepetinizde bulunuyor`);
        return prevItems;
      } else {
        // Add new item
        toast.success(`${book.title} sepete eklendi`);
        return [...prevItems, {
          id: book.id,
          title: book.title,
          price: book.price,
          cover: book.cover,
          quantity: 1
        }];
      }
    });
  };

  const removeItem = (id: number) => {
    setItems(prevItems => {
      const item = prevItems.find(item => item.id === id);
      if (item) {
        toast.info(`${item.title} sepetten çıkarıldı`);
      }
      return prevItems.filter(item => item.id !== id);
    });
  };

  const clearCart = () => {
    setItems([]);
    toast.info('Sepet temizlendi');
  };

  const getTotal = () => {
    const total = items.reduce((sum, item) => {
      // Extract numeric value from price string (e.g. "₺59.99" -> 59.99)
      const priceValue = parseFloat(item.price.replace(/[^\d.-]/g, ''));
      return sum + priceValue * item.quantity;
    }, 0);
    
    // Format total price with TL symbol
    return `₺${total.toFixed(2)}`;
  };

  return (
    <CartContext.Provider value={{
      items,
      addItem,
      removeItem,
      clearCart,
      getTotal,
      itemCount: items.length
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
