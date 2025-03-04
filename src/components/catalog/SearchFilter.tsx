
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Grid3X3, List, Search, SlidersHorizontal } from "lucide-react";

interface SearchFilterProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
  categories: string[];
  sortOption: string;
  setSortOption: (option: string) => void;
}

const SearchFilter = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  viewMode,
  setViewMode,
  categories,
  sortOption,
  setSortOption
}: SearchFilterProps) => {
  return (
    <div className="bg-white/50 rounded-xl p-6 mb-8 shadow-sm backdrop-blur-sm">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-end">
          <div className="flex-1 space-y-2">
            <label htmlFor="search" className="text-sm font-medium text-masqot-dark">Kitap, Yazar veya Anahtar Kelime Ara</label>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-masqot-primary" />
              <Input 
                id="search" 
                placeholder="Arama yapın..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="w-full md:w-64 space-y-2">
            <label htmlFor="category" className="text-sm font-medium text-masqot-dark">Kategori</label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger id="category" className="w-full">
                <SelectValue placeholder="Kategori Seçin" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-full md:w-64 space-y-2">
            <label htmlFor="sort" className="text-sm font-medium text-masqot-dark">Sıralama</label>
            <Select value={sortOption} onValueChange={setSortOption}>
              <SelectTrigger id="sort" className="w-full">
                <SelectValue placeholder="Sıralama" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Öne Çıkanlar</SelectItem>
                <SelectItem value="newest">En Yeniler</SelectItem>
                <SelectItem value="priceLow">Fiyat (Düşükten Yükseğe)</SelectItem>
                <SelectItem value="priceHigh">Fiyat (Yüksekten Düşüğe)</SelectItem>
                <SelectItem value="popular">Popüler</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex justify-between items-center border-t border-gray-100 pt-4 mt-2">
          <div className="flex items-center">
            <SlidersHorizontal className="h-4 w-4 text-masqot-primary mr-2" />
            <span className="text-sm font-medium text-masqot-dark">Görünüm:</span>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              variant={viewMode === 'grid' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setViewMode('grid')}
              className={viewMode === 'grid' ? "bg-masqot-primary text-white" : ""}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button 
              variant={viewMode === 'list' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setViewMode('list')}
              className={viewMode === 'list' ? "bg-masqot-primary text-white" : ""}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
