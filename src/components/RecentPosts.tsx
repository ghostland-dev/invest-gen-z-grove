
import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
import { Badge } from './ui/badge';

// Mock data for recent posts
const recentPosts = [
  {
    id: 1,
    title: "Comment réduire vos dépenses de 30% en 30 jours",
    description: "Un challenge pratique pour améliorer drastiquement vos finances personnelles en un mois seulement.",
    category: "Budgétisation",
    categorySlug: "budgeting",
    readTime: "6 min",
    date: "15 juin 2023",
    slug: "reduire-depenses-30-pourcent-30-jours"
  },
  {
    id: 2,
    title: "Les fondamentaux de l'investissement en bourse pour débutants",
    description: "Tout ce que vous devez savoir avant d'investir votre premier euro en bourse.",
    category: "Investissement",
    categorySlug: "investing",
    readTime: "9 min",
    date: "10 juin 2023",
    slug: "fondamentaux-investissement-bourse-debutants"
  },
  {
    id: 3,
    title: "5 revenus passifs à créer avec moins de 1000€",
    description: "Des idées accessibles pour commencer à générer des revenus passifs avec un petit capital.",
    category: "Revenus Passifs",
    categorySlug: "passive-income",
    readTime: "7 min",
    date: "5 juin 2023",
    slug: "5-revenus-passifs-moins-1000-euros"
  },
  {
    id: 4,
    title: "Le mouvement FIRE: comment prendre sa retraite à 40 ans",
    description: "Découvrez les principes du mouvement Indépendance Financière, Retraite Anticipée.",
    category: "Finance Gen Z",
    categorySlug: "gen-z-finance",
    readTime: "11 min",
    date: "1 juin 2023",
    slug: "mouvement-fire-retraite-40-ans"
  }
];

const RecentPosts = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Articles Récents</h2>
          <Link 
            to="/articles" 
            className="flex items-center text-primary hover:text-primary/80 transition-colors"
          >
            Tous les articles 
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        
        <div className="space-y-6">
          {recentPosts.map((post) => (
            <div key={post.id} className="flex flex-col md:flex-row gap-6 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all">
              <div className="md:w-2/3">
                <div className="flex items-center gap-3 mb-2">
                  <Badge variant="outline" className="bg-primary/10 text-primary hover:bg-primary/20">
                    <Link to={`/categories/${post.categorySlug}`}>
                      {post.category}
                    </Link>
                  </Badge>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Clock className="w-3 h-3 mr-1" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  <Link 
                    to={`/article/${post.slug}`} 
                    className="hover:text-primary transition-colors"
                  >
                    {post.title}
                  </Link>
                </h3>
                <p className="text-gray-600 mb-3 line-clamp-2">
                  {post.description}
                </p>
                <p className="text-sm text-gray-500">
                  {post.date}
                </p>
              </div>
              <div className="md:w-1/3 flex justify-end items-center">
                <Link 
                  to={`/article/${post.slug}`} 
                  className="text-primary font-medium hover:text-primary/80 transition-colors"
                >
                  Lire l'article →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentPosts;
