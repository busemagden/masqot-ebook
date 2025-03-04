
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BookOpenCheck, ShoppingCart, CreditCard, User } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { bookCatalog } from "@/data/bookCatalog";
import { BookType } from "@/types/book";
import { toast } from "sonner";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@clerk/clerk-react";

const Profile = () => {
  const [purchasedBooks, setPurchasedBooks] = useState<BookType[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { items } = useCart();
  const { isSignedIn } = useAuth();

  useEffect(() => {
    // Redirect if not logged in
    if (!isSignedIn) {
      toast.error("Bu sayfayı görüntülemek için giriş yapmalısınız");
      navigate("/login");
      return;
    }

    // Simulate fetching purchased books
    setTimeout(() => {
      // Demo amaçlı, belirli kitapları kullanıcının satın aldığı kitaplar olarak göster
      const userPurchasedBookIds = [1, 3, 5];
      const userBooks = bookCatalog.filter(book => userPurchasedBookIds.includes(book.id));
      setPurchasedBooks(userBooks);
      setLoading(false);
    }, 1000);
  }, [navigate, isSignedIn]);

  const openBookReader = (book: BookType) => {
    toast.success(`${book.title} kitabını açıyorsunuz`, {
      description: "Kitap okuma sayfasına yönlendiriliyorsunuz."
    });
    // TODO: Kitap okuyucu sayfası daha sonra eklenecek
    // navigate(`/reader/${book.id}`);
  };

  const goToCheckout = () => {
    navigate("/payment");
  };

  const getCartBooks = () => {
    return items.map(item => {
      const book = bookCatalog.find(book => book.id === item.id);
      return book || null;
    }).filter(Boolean) as BookType[];
  };

  if (!isSignedIn) {
    return null; // Redirect will happen in useEffect
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-masqot-soft">
      <Header />
      
      <main className="container mx-auto px-4 py-12 flex-grow">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <h1 className="text-4xl font-serif font-bold text-masqot-dark mb-4 relative inline-block">
            Profilim
            <motion.div
              className="absolute -bottom-2 left-1/2 h-1 bg-masqot-primary rounded-full"
              initial={{ width: 0, x: "-50%" }}
              animate={{ width: "80%", x: "-40%" }}
              transition={{ delay: 0.3, duration: 0.6 }}
            />
          </h1>
          <p className="text-masqot-secondary max-w-2xl mx-auto">
            Satın aldığınız ve sepetinizdeki kitaplar burada listelenir.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <Tabs defaultValue="purchased" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="purchased" className="flex items-center gap-2">
                <BookOpenCheck className="h-4 w-4" />
                Satın Aldıklarım
              </TabsTrigger>
              <TabsTrigger value="cart" className="flex items-center gap-2">
                <ShoppingCart className="h-4 w-4" />
                Sepetim
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="purchased">
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-masqot-primary"></div>
                </div>
              ) : purchasedBooks.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {purchasedBooks.map(book => (
                    <motion.div
                      key={book.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
                        <div className="relative pt-[60%] overflow-hidden">
                          <img 
                            src={book.cover} 
                            alt={book.title} 
                            className="absolute top-0 left-0 w-full h-full object-cover"
                          />
                        </div>
                        <CardHeader>
                          <CardTitle className="line-clamp-2">{book.title}</CardTitle>
                          <CardDescription>{book.author}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow">
                          <p className="text-sm text-gray-600 line-clamp-3">{book.description}</p>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                          <Button 
                            className="w-full bg-masqot-primary hover:bg-masqot-secondary"
                            onClick={() => openBookReader(book)}
                          >
                            <BookOpenCheck className="mr-2 h-4 w-4" />
                            Kitabı Oku
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="flex justify-center mb-4">
                    <BookOpenCheck className="h-16 w-16 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">Henüz kitap satın almadınız</h3>
                  <p className="text-gray-500 mb-6">Satın aldığınız kitaplar burada görünecek.</p>
                  <Button 
                    className="bg-masqot-primary hover:bg-masqot-secondary"
                    onClick={() => navigate('/catalog')}
                  >
                    Kataloga Git
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="cart">
              {items.length > 0 ? (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                    {getCartBooks().map(book => (
                      <motion.div
                        key={book.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
                          <div className="relative pt-[60%] overflow-hidden">
                            <img 
                              src={book.cover} 
                              alt={book.title} 
                              className="absolute top-0 left-0 w-full h-full object-cover"
                            />
                          </div>
                          <CardHeader>
                            <CardTitle className="line-clamp-2">{book.title}</CardTitle>
                            <CardDescription>{book.author}</CardDescription>
                          </CardHeader>
                          <CardContent className="flex-grow">
                            <p className="text-sm text-gray-600 line-clamp-3">{book.description}</p>
                          </CardContent>
                          <CardFooter>
                            <div className="w-full flex justify-between items-center">
                              <span className="text-lg font-bold text-masqot-primary">
                                {book.price}
                              </span>
                            </div>
                          </CardFooter>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="flex justify-end mt-6">
                    <Button 
                      className="bg-masqot-primary hover:bg-masqot-secondary"
                      onClick={goToCheckout}
                    >
                      <CreditCard className="mr-2 h-4 w-4" />
                      Ödemeye Geç
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="flex justify-center mb-4">
                    <ShoppingCart className="h-16 w-16 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">Sepetinizde ürün bulunmuyor</h3>
                  <p className="text-gray-500 mb-6">Sepetinize eklediğiniz kitaplar burada görünecek.</p>
                  <Button 
                    className="bg-masqot-primary hover:bg-masqot-secondary"
                    onClick={() => navigate('/catalog')}
                  >
                    Kataloga Git
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
