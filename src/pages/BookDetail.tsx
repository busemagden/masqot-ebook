
import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { bookCatalog } from '@/data/bookCatalog';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, BookOpen, ShoppingCart, Clock, Star, Users, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { useCart } from '@/contexts/CartContext';
import { toast } from "sonner";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import BookRating from '@/components/catalog/BookRating';
import { motion } from 'framer-motion';

const BookDetail = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [activePreviewIndex, setActivePreviewIndex] = useState(0);
  const [showAllChapters, setShowAllChapters] = useState(false);

  // Find the book from the catalog
  const book = bookCatalog.find(book => book.id === Number(bookId));

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-masqot-soft">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Kitap Bulunamadı</h1>
          <p className="mb-6">Aradığınız kitap mevcut değil.</p>
          <Link to="/catalog">
            <Button>Koleksiyona Dön</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(book);
    toast.success(`${book.title} sepete eklendi.`, {
      description: "Sepete eklenen ürünleri ödemeye devam edebilirsiniz."
    });
  };

  const nextPreview = () => {
    if (book.previewImages && activePreviewIndex < book.previewImages.length - 1) {
      setActivePreviewIndex(prev => prev + 1);
    }
  };

  const prevPreview = () => {
    if (activePreviewIndex > 0) {
      setActivePreviewIndex(prev => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-masqot-soft flex flex-col">
      <Header />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)} 
          className="mb-6"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Geri Dön
        </Button>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Left Column - Book Cover and Purchase */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1"
          >
            <Card className="p-6 shadow-md relative overflow-hidden glass-card border-0">
              <Badge className="absolute top-4 right-4 bg-yellow-500 text-white font-medium px-2 py-1 z-10">
                En Çok Satan
              </Badge>
              <div className="mb-6 relative w-full">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-full aspect-[3/4] object-cover rounded-lg shadow-lg"
                />
              </div>
              
              <div className="mb-4 text-center">
                <h2 className="text-2xl font-serif font-bold text-masqot-dark mb-2">
                  {book.title}
                </h2>
                <p className="text-masqot-secondary">{book.author}</p>
              </div>

              <div className="flex justify-center mb-4">
                <BookRating rating={book.rating || 4.5} reviewCount={book.reviewCount || 0} />
              </div>
              
              <div className="flex items-center justify-between mb-6 border-t border-b border-gray-100 py-4">
                <div>
                  <p className="text-sm text-gray-500">Fiyat</p>
                  <p className="text-2xl font-bold text-masqot-primary">{book.price}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Sayfa</p>
                  <p className="text-xl font-bold">{book.pageCount || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Yayın</p>
                  <p className="text-xl font-bold">{book.publishDate ? new Date(book.publishDate).getFullYear() : 'N/A'}</p>
                </div>
              </div>
              
              <Button 
                className="w-full bg-masqot-primary hover:bg-masqot-secondary text-white text-md rounded-md transition-all duration-300 py-6"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Şimdi Satın Al
              </Button>
              
              <div className="mt-6 space-y-3">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-masqot-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm text-masqot-secondary">Anında erişim - Ödemenin ardından e-kitaba hemen erişebilirsiniz</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-masqot-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm text-masqot-secondary">30 gün para iade garantisi</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-masqot-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm text-masqot-secondary">WhatsApp grubuyla sürekli destek</p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
          
          {/* Right Column - Book Details and Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Tabs defaultValue="details">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="details">Kitap Hakkında</TabsTrigger>
                <TabsTrigger value="preview">Önizleme</TabsTrigger>
                <TabsTrigger value="chapters">İçerik</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="space-y-8">
                <Card className="p-6 shadow-md glass-card border-0">
                  <h3 className="text-xl font-bold mb-4 text-masqot-dark">Dijital Çağda Başarının Formülü</h3>
                  <p className="text-masqot-secondary mb-6">
                    Dijital çağın yükselen yıldızı olan yapay zeka (AI), iş dünyasında dönüşümün anahtarı haline geldi. İster küçük bir girişimci olun, ister büyük bir şirket yönetin, yapay zekanın gücünden faydalanarak daha hızlı, daha verimli ve daha etkili sonuçlar elde edebilirsiniz.
                  </p>
                  
                  <h4 className="text-lg font-semibold mb-3 text-masqot-dark">Bu Kitapta Ne Öğreneceksiniz?</h4>
                  <ul className="space-y-4 mb-6">
                    {book.benefits && book.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-masqot-primary flex-shrink-0 mt-1 mr-2" />
                        <span className="text-masqot-secondary">{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  <h4 className="text-lg font-semibold mb-3 text-masqot-dark">Hedef Kitle</h4>
                  <p className="text-masqot-secondary mb-6">
                    Bu kitap, işinizi büyütmek isteyen girişimciler, yöneticiler, dijital pazarlama uzmanları ve yapay zeka teknolojilerini işlerine entegre etmek isteyen herkes için tasarlanmıştır.
                  </p>
                  
                  <div className="flex flex-col md:flex-row items-center justify-between bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center mb-4 md:mb-0">
                      <BookOpen className="h-10 w-10 text-masqot-primary mr-4" />
                      <div>
                        <h5 className="font-semibold text-masqot-dark">Toplam Sayfa</h5>
                        <p className="text-masqot-secondary">{book.pageCount} sayfa içerik</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-10 w-10 text-masqot-primary mr-4" />
                      <div>
                        <h5 className="font-semibold text-masqot-dark">Topluluk</h5>
                        <p className="text-masqot-secondary">WhatsApp destek grubu</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>
              
              <TabsContent value="preview">
                <Card className="p-6 shadow-md glass-card border-0">
                  <h3 className="text-xl font-bold mb-4 text-masqot-dark">Kitaptan Önizleme</h3>
                  <p className="text-masqot-secondary mb-6">
                    "Dijital Çağda Başarının Formülü" kitabından örnek sayfalar. Satın aldığınızda tüm içeriğe erişebilirsiniz.
                  </p>
                  
                  <div className="relative mb-6 bg-gray-100 rounded-lg p-4">
                    {book.previewImages && book.previewImages.length > 0 && (
                      <>
                        <img 
                          src={book.previewImages[activePreviewIndex]} 
                          alt={`Önizleme sayfa ${activePreviewIndex + 1}`} 
                          className="w-full rounded-lg shadow-md"
                        />
                        <div className="absolute left-0 top-1/2 transform -translate-y-1/2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={prevPreview}
                            disabled={activePreviewIndex === 0}
                            className="bg-white/80 hover:bg-white shadow-md"
                          >
                            <ChevronLeft className="h-6 w-6" />
                          </Button>
                        </div>
                        <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={nextPreview}
                            disabled={!book.previewImages || activePreviewIndex === book.previewImages.length - 1}
                            className="bg-white/80 hover:bg-white shadow-md"
                          >
                            <ChevronRight className="h-6 w-6" />
                          </Button>
                        </div>
                        <div className="text-center mt-4">
                          <p className="text-sm text-masqot-secondary">
                            Sayfa {activePreviewIndex + 1} / {book.previewImages.length}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                  
                  <div className="text-center p-6 bg-masqot-soft rounded-lg">
                    <h4 className="text-lg font-semibold mb-2 text-masqot-dark">Tüm İçeriğe Erişmek İster misiniz?</h4>
                    <p className="text-masqot-secondary mb-4">
                      90 sayfalık kapsamlı içeriğin tamamına erişmek için şimdi satın alın.
                    </p>
                    <Button 
                      className="bg-masqot-primary hover:bg-masqot-secondary text-white text-md rounded-md transition-all duration-300"
                      onClick={handleAddToCart}
                    >
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      {book.price} - Şimdi Satın Al
                    </Button>
                  </div>
                </Card>
              </TabsContent>
              
              <TabsContent value="chapters">
                <Card className="p-6 shadow-md glass-card border-0">
                  <h3 className="text-xl font-bold mb-4 text-masqot-dark">İçindekiler</h3>
                  <p className="text-masqot-secondary mb-6">
                    "Dijital Çağda Başarının Formülü" kitabının bölümleri.
                  </p>
                  
                  <ul className="space-y-4 mb-6">
                    {book.chapters && book.chapters.slice(0, showAllChapters ? book.chapters.length : 4).map((chapter, index) => (
                      <li key={index} className="flex p-3 bg-white rounded-md shadow-sm hover:shadow-md transition-all duration-300">
                        <div className="mr-4 bg-masqot-primary rounded-full w-8 h-8 flex items-center justify-center text-white flex-shrink-0">
                          {index + 1}
                        </div>
                        <div>
                          <h5 className="font-semibold text-masqot-dark">{chapter}</h5>
                          {index === 0 && (
                            <Badge variant="outline" className="mt-2">
                              Ücretsiz Önizleme
                            </Badge>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                  
                  {book.chapters && book.chapters.length > 4 && (
                    <Button
                      variant="ghost"
                      className="w-full text-masqot-primary"
                      onClick={() => setShowAllChapters(!showAllChapters)}
                    >
                      {showAllChapters ? "Daha Az Göster" : "Tüm Bölümleri Göster"}
                      <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${showAllChapters ? 'rotate-180' : ''}`} />
                    </Button>
                  )}
                  
                  <div className="text-center p-6 bg-masqot-soft rounded-lg mt-6">
                    <h4 className="text-lg font-semibold mb-2 text-masqot-dark">Tüm Bölümlere Erişmek İster misiniz?</h4>
                    <p className="text-masqot-secondary mb-4">
                      90 sayfalık kapsamlı içeriğin tamamına erişmek için şimdi satın alın.
                    </p>
                    <Button 
                      className="bg-masqot-primary hover:bg-masqot-secondary text-white text-md rounded-md transition-all duration-300"
                      onClick={handleAddToCart}
                    >
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      {book.price} - Şimdi Satın Al
                    </Button>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
        
        {/* Additional book information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-12"
        >
          <Card className="p-6 shadow-md glass-card border-0">
            <h3 className="text-xl font-bold mb-6 text-masqot-dark">Yapay Zeka ile İş Dünyasında Fark Yaratın</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="text-masqot-secondary mb-4">
                  Dijital çağın yükselen yıldızı olan yapay zeka (AI), iş dünyasında dönüşümün anahtarı haline geldi. Bu kitapta, iş süreçlerinizi dönüştürmek ve rekabet avantajı elde etmek için kullanabileceğiniz 20 etkili yapay zeka aracını bulacaksınız.
                </p>
                <p className="text-masqot-secondary mb-4">
                  Modern iş dünyasında başarılı olmak, teknolojik gelişmeleri takip etmeyi ve bunları işinize entegre etmeyi gerektirir. Yapay zeka araçları, verimliliği artırmanın, maliyetleri düşürmenin ve yenilikçi çözümler sunmanın en etkili yollarından biridir.
                </p>
                <p className="text-masqot-secondary">
                  Bu kitap, yapay zeka araçlarını tanıtmanın ötesinde, bunları nasıl stratejik olarak kullanacağınızı ve iş hedeflerinize nasıl ulaşacağınızı adım adım anlatır. Teoriden pratiğe, bu kitabın içeriği iş dünyasındaki gerçek başarı hikayelerinden ve çözümlerden esinlenmiştir.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-masqot-primary flex-shrink-0 mt-1" />
                  <div>
                    <h5 className="font-semibold text-masqot-dark">Verimlilik ve Hız</h5>
                    <p className="text-sm text-masqot-secondary">Tekrarlayan görevleri otomatikleştirerek zamandan ve kaynaklardan tasarruf edin.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-masqot-primary flex-shrink-0 mt-1" />
                  <div>
                    <h5 className="font-semibold text-masqot-dark">Kişiselleştirilmiş Deneyimler</h5>
                    <p className="text-sm text-masqot-secondary">Müşteri memnuniyetini artırmak için yapay zeka ile kişiselleştirilmiş çözümler sunun.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-masqot-primary flex-shrink-0 mt-1" />
                  <div>
                    <h5 className="font-semibold text-masqot-dark">Maliyet Tasarrufu</h5>
                    <p className="text-sm text-masqot-secondary">İnsan kaynaklı hataları azaltarak ve süreçleri optimize ederek maliyetleri düşürün.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-masqot-primary flex-shrink-0 mt-1" />
                  <div>
                    <h5 className="font-semibold text-masqot-dark">Yaratıcılık ve İnovasyon</h5>
                    <p className="text-sm text-masqot-secondary">Yapay zeka ile yeni fikirler keşfedin ve yaratıcı projeler geliştirin.</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
        
        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center p-8 bg-masqot-primary/10 rounded-xl"
        >
          <h3 className="text-2xl font-serif font-bold text-masqot-dark mb-4">
            Dijital dönüşüm yolculuğunuza bugün başlayın!
          </h3>
          <p className="text-masqot-secondary mb-6 max-w-2xl mx-auto">
            "Dijital Çağda Başarının Formülü" e-kitabı, yapay zeka araçlarını kullanarak işinizi nasıl büyüteceğinizi adım adım gösterir. 90 sayfalık kapsamlı içeriğiyle, dijital dönüşümünüzü hızlandırmanın anahtarı elinizde.
          </p>
          <Button 
            className="bg-masqot-primary hover:bg-masqot-secondary text-white text-md rounded-md transition-all duration-300 px-8 py-6 text-lg"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="mr-2 h-5 w-5" />
            {book.price} - Hemen Satın Al
          </Button>
          <p className="text-sm text-masqot-secondary mt-4">
            30 gün para iade garantisi ile risksiz satın alın.
          </p>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
};

export default BookDetail;
