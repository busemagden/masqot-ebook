
import { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BookOpenCheck, Lock } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { bookCatalog } from "@/data/bookCatalog";
import { BookType } from "@/types/book";
import { useToast } from "@/hooks/use-toast";
import { toast } from "sonner";

const MyBooks = () => {
  const { isSignedIn, user } = useUser();
  const [purchasedBooks, setPurchasedBooks] = useState<BookType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // For now, we'll simulate fetching purchased books
    // Later, this will come from a database
    if (isSignedIn) {
      // Simulate API call with a delay
      setTimeout(() => {
        // For demo purposes, let's say the user has purchased books with IDs 1, 3, and 5
        const userPurchasedBookIds = [1, 3, 5];
        const userBooks = bookCatalog.filter(book => userPurchasedBookIds.includes(book.id));
        setPurchasedBooks(userBooks);
        setLoading(false);
      }, 1000);
    }
  }, [isSignedIn, user?.id]);

  const openBookReader = (book: BookType) => {
    toast.success(`${book.title} kitabını açıyorsunuz`, {
      description: "Kitap okuma sayfasına yönlendiriliyorsunuz."
    });
    // TODO: Implement book reader page later
    // navigate(`/reader/${book.id}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-masqot-soft">
      <Header />
      
      <main className="container mx-auto px-4 py-12 flex-grow">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl font-serif font-bold text-masqot-dark mb-4 relative inline-block">
            E-Kitaplarım
            <motion.div
              className="absolute -bottom-2 left-1/2 h-1 bg-masqot-primary rounded-full"
              initial={{ width: 0, x: "-50%" }}
              animate={{ width: "80%", x: "-40%" }}
              transition={{ delay: 0.3, duration: 0.6 }}
            />
          </h1>
          <p className="text-masqot-secondary max-w-2xl mx-auto">
            Satın aldığınız tüm e-kitapları buradan okuyabilirsiniz.
          </p>
        </motion.div>

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
              <Lock className="h-16 w-16 text-gray-400" />
            </div>
            <h3 className="text-xl font-medium mb-2">Henüz kitap satın almadınız</h3>
            <p className="text-gray-500 mb-6">Satın aldığınız kitaplar burada görünecek.</p>
            <Button 
              className="bg-masqot-primary hover:bg-masqot-secondary"
              onClick={() => location.href = '/catalog'}
            >
              Kataloga Git
            </Button>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default MyBooks;
