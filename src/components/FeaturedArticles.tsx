
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Clock, ArrowRight } from 'lucide-react';

// Mock data for featured articles
const featuredArticles = [
  {
    id: 1,
    title: "5 Applications de Budgétisation Essentielles pour 2023",
    description: "Découvrez les meilleures applications qui vous aideront à économiser de l'argent et à atteindre vos objectifs financiers cette année.",
    category: "Budgétisation",
    categorySlug: "budgeting",
    imageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    readTime: "8 min",
    date: "12 juin 2023",
    slug: "5-applications-budgetisation-essentielles-2023"
  },
  {
    id: 2,
    title: "Comment Investir dans les ETF: Guide Complet pour Débutants",
    description: "Tout ce que vous devez savoir pour commencer à investir dans les fonds indiciels cotés (ETF) avec un petit budget.",
    category: "Investissement",
    categorySlug: "investing",
    imageUrl: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    readTime: "12 min",
    date: "3 juin 2023",
    slug: "comment-investir-etf-guide-complet-debutants"
  },
  {
    id: 3,
    title: "10 Sources de Revenus Passifs à Démarrer Aujourd'hui",
    description: "Des stratégies éprouvées pour générer des revenus passifs que vous pouvez mettre en œuvre avec peu ou pas d'investissement initial.",
    category: "Revenus Passifs",
    categorySlug: "passive-income",
    imageUrl: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    readTime: "10 min",
    date: "28 mai 2023",
    slug: "10-sources-revenus-passifs-demarrer-aujourdhui"
  }
];

const FeaturedArticles = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Articles à la Une</h2>
          <Link 
            to="/articles" 
            className="flex items-center text-primary hover:text-primary/80 transition-colors"
          >
            Tous les articles 
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredArticles.map((article) => (
            <Card key={article.id} className="article-card overflow-hidden">
              <div className="aspect-video overflow-hidden">
                <img 
                  src={article.imageUrl} 
                  alt={article.title} 
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                />
              </div>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="bg-primary/10 text-primary hover:bg-primary/20">
                    <Link to={`/categories/${article.categorySlug}`}>
                      {article.category}
                    </Link>
                  </Badge>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Clock className="w-3 h-3 mr-1" />
                    <span>{article.readTime}</span>
                  </div>
                </div>
                <CardTitle className="text-xl mt-2">
                  <Link 
                    to={`/article/${article.slug}`} 
                    className="hover:text-primary transition-colors line-clamp-2"
                  >
                    {article.title}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="line-clamp-3">
                  {article.description}
                </CardDescription>
              </CardContent>
              <CardFooter className="text-sm text-gray-500">
                {article.date}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedArticles;
