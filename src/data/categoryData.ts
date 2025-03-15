
export interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  date: string;
  readTime: string;
  image: string;
  category: string;
  featured?: boolean;
}

export interface Category {
  id: number;
  title: string;
  slug: string;
  description: string;
  color: string;
  articles: Article[];
}

// Mock article data
const articles: Article[] = [
  // Budgeting articles
  {
    id: 1,
    title: "10 applications de budgétisation qui changeront votre vie financière",
    slug: "applications-budgetisation",
    excerpt: "Découvrez les meilleures applications qui rendront la gestion de votre budget simple et efficace.",
    date: "12 Mai 2023",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1520333789090-1afc82db536a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "budgeting",
    featured: true
  },
  {
    id: 2,
    title: "Comment économiser 5000€ en un an avec la méthode des enveloppes",
    slug: "methode-enveloppes",
    excerpt: "Une stratégie simple mais puissante pour économiser une somme importante en peu de temps.",
    date: "23 Avril 2023",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "budgeting"
  },
  {
    id: 3,
    title: "Le minimalisme financier : vivre avec moins pour épargner plus",
    slug: "minimalisme-financier",
    excerpt: "Comment adopter un style de vie minimaliste peut transformer vos finances personnelles.",
    date: "7 Mars 2023",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "budgeting"
  },

  // Investing articles
  {
    id: 4,
    title: "Guide du débutant pour investir en bourse en 2023",
    slug: "guide-debutant-bourse",
    excerpt: "Tout ce que vous devez savoir pour commencer à investir en bourse sans expérience préalable.",
    date: "15 Juin 2023",
    readTime: "10 min",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "investing",
    featured: true
  },
  {
    id: 5,
    title: "5 plateformes de trading à 0% de commission à découvrir",
    slug: "plateformes-trading-zero-commission",
    excerpt: "Analyse comparative des meilleures plateformes sans frais pour les investisseurs français.",
    date: "2 Mai 2023",
    readTime: "7 min",
    image: "https://images.unsplash.com/photo-1617011748022-605a2e54d2b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "investing"
  },
  {
    id: 6,
    title: "La stratégie d'investissement en dividendes pour un revenu passif",
    slug: "strategie-dividendes",
    excerpt: "Comment constituer un portefeuille d'actions à dividendes pour générer des revenus réguliers.",
    date: "19 Avril 2023",
    readTime: "9 min",
    image: "https://images.unsplash.com/photo-1559526324-593bc073d938?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "investing"
  },

  // Passive Income articles
  {
    id: 7,
    title: "15 sources de revenus passifs accessibles aux débutants",
    slug: "sources-revenus-passifs",
    excerpt: "Des idées concrètes pour commencer à générer des revenus sans y consacrer tout votre temps.",
    date: "28 Juin 2023",
    readTime: "11 min",
    image: "https://images.unsplash.com/photo-1564069114553-7215e1ff1890?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "passive-income",
    featured: true
  },
  {
    id: 8,
    title: "Comment créer un blog rentable en 6 mois",
    slug: "blog-rentable",
    excerpt: "Guide étape par étape pour lancer un blog qui génère des revenus significatifs.",
    date: "11 Mai 2023",
    readTime: "7 min",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "passive-income"
  },
  {
    id: 9,
    title: "Investissement locatif : les bases pour réussir",
    slug: "investissement-locatif",
    excerpt: "Les fondamentaux pour se lancer dans l'immobilier locatif avec un budget limité.",
    date: "3 Avril 2023",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "passive-income"
  },

  // Gen Z Finance articles
  {
    id: 10,
    title: "Finance 101 pour la génération Z : par où commencer",
    slug: "finance-101-gen-z",
    excerpt: "Les bases essentielles de la finance personnelle quand on débute dans la vie active.",
    date: "20 Juin 2023",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "gen-z-finance",
    featured: true
  },
  {
    id: 11,
    title: "Top 5 des comptes bancaires sans frais pour étudiants et jeunes actifs",
    slug: "comptes-bancaires-jeunes",
    excerpt: "Comparatif des meilleures offres bancaires avec leurs avantages et inconvénients.",
    date: "8 Mai 2023",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1616077168712-fc6c788ea01e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "gen-z-finance"
  },
  {
    id: 12,
    title: "Comment rembourser ses prêts étudiants plus rapidement",
    slug: "remboursement-prets-etudiants",
    excerpt: "Stratégies efficaces pour se libérer de ses dettes d'études et avancer financièrement.",
    date: "24 Avril 2023",
    readTime: "7 min",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "gen-z-finance"
  }
];

// Create the category data structure
export const categoryData: Category[] = [
  {
    id: 1,
    title: "Budgétisation & Économies",
    slug: "budgeting",
    description: "Astuces pour économiser rapidement et outils de budgétisation efficaces pour gérer vos finances au quotidien.",
    color: "bg-money-50 border-money-200",
    articles: articles.filter(article => article.category === "budgeting")
  },
  {
    id: 2,
    title: "Stratégies d'Investissement",
    slug: "investing",
    description: "Analyses du marché boursier et conseils d'investissement pour faire fructifier votre patrimoine à long terme.",
    color: "bg-growth-50 border-growth-200",
    articles: articles.filter(article => article.category === "investing")
  },
  {
    id: 3,
    title: "Revenus Passifs",
    slug: "passive-income",
    description: "Créer et diversifier vos sources de revenus passifs pour atteindre la liberté financière plus rapidement.",
    color: "bg-amber-50 border-amber-200",
    articles: articles.filter(article => article.category === "passive-income")
  },
  {
    id: 4,
    title: "Finance pour Gen Z",
    slug: "gen-z-finance",
    description: "Planification financière pour jeunes professionnels et étudiants qui souhaitent construire des bases solides.",
    color: "bg-blue-50 border-blue-200",
    articles: articles.filter(article => article.category === "gen-z-finance")
  }
];

// Helper function to get featured articles across all categories
export const getFeaturedArticles = () => {
  return articles.filter(article => article.featured);
};

// Helper function to get recent articles
export const getRecentArticles = (limit = 6) => {
  // In a real app, we would sort by date
  return [...articles].sort(() => 0.5 - Math.random()).slice(0, limit);
};

// Helper function to get article by slug
export const getArticleBySlug = (slug: string) => {
  return articles.find(article => article.slug === slug);
};
