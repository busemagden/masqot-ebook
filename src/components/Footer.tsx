
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail, Phone } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-masqot-dark text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="flex items-center">
              <img 
                src="/lovable-uploads/37b957ea-2d4c-47f6-85e3-ae4359eeaa5c.png" 
                alt="MASQOT Logo" 
                className="h-10 w-auto invert" 
              />
              <span className="ml-2 text-xl font-serif font-bold">MASQOT E-Kitap</span>
            </div>
            <p className="text-gray-300 text-sm max-w-md">
              MASQOT E-Kitap, yapay zeka ve makine öğrenimi konularında nitelikli 
              içerikler sunan dijital kitap platformudur.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-masqot-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-masqot-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-masqot-primary transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Hızlı Bağlantılar</h3>
            <nav className="flex flex-col space-y-2">
              <Link to="/" className="text-gray-300 hover:text-masqot-primary transition-colors">
                Ana Sayfa
              </Link>
              <Link to="/kitaplar" className="text-gray-300 hover:text-masqot-primary transition-colors">
                Kitaplar
              </Link>
              <Link to="/hakkimizda" className="text-gray-300 hover:text-masqot-primary transition-colors">
                Hakkımızda
              </Link>
              <Link to="/sss" className="text-gray-300 hover:text-masqot-primary transition-colors">
                Sıkça Sorulan Sorular
              </Link>
              <Link to="/iletisim" className="text-gray-300 hover:text-masqot-primary transition-colors">
                İletişim
              </Link>
            </nav>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">İletişim</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <Mail size={18} className="mr-2 text-masqot-primary" />
                <span className="text-gray-300">info@masqot.co</span>
              </div>
              <div className="flex items-center">
                <Phone size={18} className="mr-2 text-masqot-primary" />
                <span className="text-gray-300">+90 212 123 4567</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>© {currentYear} MASQOT E-Kitap. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
