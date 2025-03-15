
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, TrendingUp, PiggyBank, Wallet, Landmark } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { categoryData } from '../data/categoryData';

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  
  useEffect(() => {
    // Scroll to top when the category changes
    window.scrollTo(0, 0);
  }, [slug]);
  
  const category = categoryData.find(cat => cat.slug === slug);
  
  if (!category) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-6">Catégorie non trouvée</h1>
          <p className="mb-6">La catégorie que vous recherchez n'existe pas.</p>
          <Button asChild>
            <Link to="/">Retour à l'accueil</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const getCategoryIcon = (categorySlug: string) => {
    switch (categorySlug) {
      case 'budgeting':
        return <PiggyBank className="w-8 h-8 text-money-500" />;
      case 'investing':
        return <TrendingUp className="w-8 h-8 text-growth-500" />;
      case 'passive-income':
        return <Wallet className="w-8 h-8 text-accent" />;
      case 'gen-z-finance':
        return <Landmark className="w-8 h-8 text-blue-500" />;
      default:
        return <TrendingUp className="w-8 h-8 text-primary" />;
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <div className="flex justify-center mb-4">
            {getCategoryIcon(category.slug)}
          </div>
          <h1 className="text-4xl font-bold mb-4">{category.title}</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{category.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {category.articles.map((article) => (
            <Card key={article.id} className="h-full flex flex-col">
              <CardHeader className="pb-2">
                <div className="aspect-w-16 aspect-h-9 mb-4 overflow-hidden rounded-md">
                  <img 
                    src={article.image} 
                    alt={article.title} 
                    className="object-cover w-full h-full transition-transform hover:scale-105"
                  />
                </div>
                <CardTitle className="text-xl">{article.title}</CardTitle>
                <CardDescription className="flex items-center text-sm mt-2">
                  <Calendar className="w-4 h-4 mr-1" /> {article.date}
                  <span className="mx-2">•</span>
                  <Clock className="w-4 h-4 mr-1" /> {article.readTime}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{article.excerpt}</p>
              </CardContent>
              <CardFooter className="mt-auto pt-2">
                <Button asChild variant="link" className="p-0 h-auto font-semibold text-primary">
                  <Link to={`/articles/${article.slug}`}>Lire l'article →</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryPage;
