
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Grid3X3, List, Search } from "lucide-react";

interface SearchFilterProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
  categories: string[];
}

const SearchFilter = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  viewMode,
  setViewMode,
  categories
}: SearchFilterProps) => {
  return (
    <div className="bg-white/50 rounded-xl p-6 mb-8 shadow-sm backdrop-blur-sm">
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
        <div className="flex items-center space-x-2">
          <Button 
            variant={viewMode === 'grid' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setViewMode('grid')}
            className="bg-masqot-primary text-white"
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button 
            variant={viewMode === 'list' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setViewMode('list')}
            className="bg-masqot-primary text-white"
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
