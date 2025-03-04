
export interface BookType {
  id: number;
  title: string;
  author: string;
  cover: string;
  price: string;
  category: string;
  description: string;
  rating?: number;
  reviewCount?: number;
  previewImages?: string[];
}
