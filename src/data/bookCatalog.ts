
import { BookType } from '@/types/book';

// Book catalog data
export const bookCatalog: BookType[] = [
  {
    id: 9,
    title: "Dijital Çağda Başarının Formülü",
    author: "MASQOT Team",
    cover: "/lovable-uploads/75b1a5e3-7464-47c8-81dc-dea727f760f0.png",
    price: "₺499",
    category: "AI Tools",
    description: "20 Etkili AI Aracıyla İşinizi Adım Adım İleriye Taşıyın. İş dünyasında yapay zeka araçlarını kullanarak verimliliği artırmanın yollarını öğreten kapsamlı bir rehber.",
    rating: 4.9,
    reviewCount: 124,
    previewImages: [
      "/lovable-uploads/b56f5f9f-70c4-466c-b85a-7717c3aa30fc.png",
      "/lovable-uploads/87243fdd-8dbf-4411-afac-39b60e1b39fe.png",
      "/lovable-uploads/dfba1129-8ac9-4a50-85c7-30436671a3fd.png",
      "/lovable-uploads/fa26c9b6-4187-4988-a9dd-83fe5fb084df.png",
      "/lovable-uploads/7279815a-e3fd-4e77-8921-976a199b6ff8.png"
    ]
  },
  {
    id: 1,
    title: "AI ve Makine Öğrenimi Temelleri",
    author: "MASQOT Team",
    cover: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    price: "₺299",
    category: "Artificial Intelligence",
    description: "Yapay zeka ve makine öğrenimini temel kavramlardan ileri düzeye kadar kapsamlı şekilde ele alan bir kaynak.",
    rating: 4.7,
    reviewCount: 86,
    comingSoon: true
  },
  {
    id: 2,
    title: "Python ile Derin Öğrenme",
    author: "MASQOT Team",
    cover: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    price: "₺399",
    category: "Deep Learning",
    description: "Python kullanarak derin öğrenme modellerini geliştirmeyi ve uygulamayı öğreten pratik bir rehber.",
    rating: 4.8,
    reviewCount: 103,
    comingSoon: true
  },
  {
    id: 3,
    title: "Doğal Dil İşleme",
    author: "MASQOT Team",
    cover: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    price: "₺349",
    category: "NLP",
    description: "Metin verileri üzerinde çalışmak ve doğal dil işleme algoritmaları geliştirmek için temel bilgiler.",
    rating: 4.5,
    reviewCount: 72,
    comingSoon: true
  },
  {
    id: 4,
    title: "Bilgisayarlı Görü Sistemleri",
    author: "MASQOT Team",
    cover: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    price: "₺329",
    category: "Computer Vision",
    description: "Bilgisayarlı görü teknolojilerinin temellerini ve pratik uygulamalarını anlatan kapsamlı bir kaynak.",
    rating: 4.6,
    reviewCount: 65,
    comingSoon: true
  },
  {
    id: 5,
    title: "Büyük Veri Analizi",
    author: "MASQOT Team",
    cover: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    price: "₺379",
    category: "Big Data",
    description: "Büyük veri setlerinin işlenmesi, analizi ve görselleştirilmesi konularını ele alan detaylı bir rehber.",
    rating: 4.7,
    reviewCount: 91,
    comingSoon: true
  },
  {
    id: 6,
    title: "Nöral Ağlar ve İleri Algoritmalar",
    author: "MASQOT Team",
    cover: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    price: "₺449",
    category: "Neural Networks",
    description: "Nöral ağların yapısı, çeşitleri ve gelişmiş algoritmalarla uygulanması hakkında detaylı bilgiler.",
    rating: 4.9,
    reviewCount: 117,
    comingSoon: true
  },
  {
    id: 7,
    title: "Veri Bilimi için İstatistik",
    author: "MASQOT Team",
    cover: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    price: "₺329",
    category: "Statistics",
    description: "Veri bilimi uygulamalarında kullanılan temel ve ileri düzey istatistik kavramlarını açıklayan bir kaynak.",
    rating: 4.6,
    reviewCount: 88,
    comingSoon: true
  },
  {
    id: 8,
    title: "Etik Yapay Zeka",
    author: "MASQOT Team",
    cover: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    price: "₺279",
    category: "AI Ethics",
    description: "Yapay zeka uygulamalarında etik kuralları, sorumlulukları ve karşılaşılan zorlukları ele alan kapsamlı bir inceleme.",
    rating: 4.5,
    reviewCount: 76,
    comingSoon: true
  }
];

// Categories
export const categories = [
  "Tümü",
  "Artificial Intelligence",
  "Deep Learning",
  "NLP",
  "Computer Vision",
  "Big Data",
  "Neural Networks",
  "Statistics",
  "AI Ethics",
  "AI Tools",
  "Business AI"
];
