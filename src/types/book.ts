
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
  comingSoon?: boolean;
  previewImages?: string[];
  publishDate?: string;
  pageCount?: number;
  readerCount?: number;
}
