
import { Book } from "lucide-react";

const EmptyState = () => {
  return (
    <div className="text-center py-12">
      <Book className="h-12 w-12 text-masqot-primary mx-auto mb-4" />
      <h3 className="text-xl font-medium text-masqot-dark mb-2">Sonuç Bulunamadı</h3>
      <p className="text-masqot-secondary">
        Arama kriterlerinize uygun e-kitap bulunamadı. Lütfen farklı anahtar kelimeler deneyin veya filtreleri sıfırlayın.
      </p>
    </div>
  );
};

export default EmptyState;
