
import { BookType } from '@/types/book';

// Book catalog data
export const bookCatalog: BookType[] = [
  {
    id: 9,
    title: "Dijital Çağda Başarının Formülü",
    author: "MASQOT Team",
    cover: "/lovable-uploads/75b1a5e3-7464-47c8-81dc-dea727f760f0.png",
    price: "₺299",
    category: "AI Tools",
    description: "20 Etkili AI Aracıyla İşinizi Adım Adım İleriye Taşıyın. İş dünyasında yapay zeka araçlarını kullanarak verimliliği artırmanın yollarını öğreten kapsamlı bir rehber.",
    rating: 4.9,
    reviewCount: 124,
    pageCount: 90,
    publishDate: "2023-10-15",
    previewImages: [
      "/lovable-uploads/9216013d-7e89-4203-8a45-819736d9d970.png",
      "/lovable-uploads/79ab1853-7d01-4851-9e18-27227f5343e5.png",
      "/lovable-uploads/c3e4475d-dbd8-48d9-858e-d7ad8969ef3b.png",
      "/lovable-uploads/e0320fbf-f416-4983-9492-fbd3c6cadd3a.png",
      "/lovable-uploads/b9e70139-ef42-4236-8acb-75fc19452d05.png",
      "/lovable-uploads/fe426291-13df-436e-905e-f1fe706192ef.png",
      "/lovable-uploads/71f346f8-bf05-433e-8394-d43848a0fff7.png",
      "/lovable-uploads/c01f9356-f847-48ab-b1f9-62fe0bf81fb0.png",
      "/lovable-uploads/217af3c8-5570-4abd-b754-d92f7e34ef0d.png"
    ],
    chapters: [
      "Yapay Zeka Tanıma ve Doğru Kullanma Rehberi",
      "Zaman ve Kaynak Yönetimi",
      "İşinizi Büyütecek Stratejiler",
      "Adım Adım Uygulama Planı",
      "Rekabet Avantajı",
      "Başarı Hikayeleri ve İlham",
      "İş Dünyasında Geleceğe Hazırlık"
    ],
    benefits: [
      "Yapay zeka ile iş süreçlerinizi otomatikleştirin",
      "Müşteri deneyimini yapay zeka ile kişiselleştirin",
      "Maliyetlerinizi optimize edin ve tasarruf sağlayın",
      "Yaratıcılık ve inovasyon kapasitesini artırın",
      "Rekabet avantajı için stratejik yapay zeka kullanımı",
      "Veri odaklı karar verme mekanizmalarını geliştirin"
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
