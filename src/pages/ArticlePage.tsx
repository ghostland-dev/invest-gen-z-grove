
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, ArrowLeft, Share2 } from 'lucide-react';
import { getArticleBySlug, getRecentArticles } from '../data/categoryData';
import { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import NewsletterCard from '../components/NewsletterCard';

const ArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = getArticleBySlug(slug || '');
  const relatedArticles = getRecentArticles(3);
  
  useEffect(() => {
    // Scroll to top when article changes
    window.scrollTo(0, 0);
  }, [slug]);

  if (!article) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-6">Article non trouvé</h1>
          <p className="mb-6">L'article que vous recherchez n'existe pas ou a été déplacé.</p>
          <Button asChild>
            <Link to="/">Retour à l'accueil</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto mb-12">
          <Link to={`/categories/${article.category}`} className="inline-flex items-center text-primary mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" /> Retour à la catégorie
          </Link>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{article.title}</h1>
          
          <div className="flex items-center text-gray-500 mb-6">
            <Calendar className="w-4 h-4 mr-1" /> {article.date}
            <span className="mx-2">•</span>
            <Clock className="w-4 h-4 mr-1" /> {article.readTime}
          </div>
          
          <div className="aspect-w-16 aspect-h-9 mb-8 overflow-hidden rounded-lg">
            <img 
              src={article.image} 
              alt={article.title} 
              className="object-cover w-full h-full"
            />
          </div>
          
          {/* Placeholder for article content - in a real app, this would be rich text content */}
          <div className="prose max-w-none">
            <p className="text-lg leading-relaxed mb-6">
              {article.excerpt}
            </p>
            <p className="mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum at semper magna. Sed non felis vitae turpis ultrices sodales. Vivamus ut sapien at nisi elementum eleifend. Praesent fringilla, purus nec facilisis mattis, tellus lacus pellentesque dolor, at facilisis quam enim ut magna.
            </p>
            <h2 className="text-2xl font-bold mt-8 mb-4">Les points clés à retenir</h2>
            <p className="mb-6">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li className="mb-2">Facilisis quam enim ut magna</li>
              <li className="mb-2">Sed non felis vitae turpis ultrices sodales</li>
              <li className="mb-2">Vivamus ut sapien at nisi elementum eleifend</li>
              <li className="mb-2">Praesent fringilla, purus nec facilisis mattis</li>
            </ul>
            <p className="mb-6">
              Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.
            </p>
          </div>
          
          <div className="border-t border-b border-gray-200 py-6 my-8 flex justify-between items-center">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Share2 className="w-4 h-4" /> Partager
            </Button>
            <div>
              <Link to={`/categories/${article.category}`} className="text-sm text-primary font-medium">
                #{article.category}
              </Link>
            </div>
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8 mb-12">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-6">Articles similaires</h3>
            <div className="grid sm:grid-cols-2 gap-6">
              {relatedArticles.slice(0, 2).map((related) => (
                <Card key={related.id} className="h-full flex flex-col">
                  <CardHeader className="pb-2">
                    <div className="aspect-w-16 aspect-h-9 mb-4 overflow-hidden rounded-md">
                      <img 
                        src={related.image} 
                        alt={related.title} 
                        className="object-cover w-full h-full transition-transform hover:scale-105"
                      />
                    </div>
                    <CardTitle className="text-lg">{related.title}</CardTitle>
                    <CardDescription className="flex items-center text-xs mt-1">
                      <Calendar className="w-3 h-3 mr-1" /> {related.date}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="py-2">
                    <p className="text-gray-600 text-sm line-clamp-2">{related.excerpt}</p>
                  </CardContent>
                  <CardFooter className="mt-auto pt-0">
                    <Button asChild variant="link" className="p-0 h-auto text-sm font-semibold text-primary">
                      <Link to={`/articles/${related.slug}`}>Lire l'article →</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-6">Newsletter</h3>
            <NewsletterCard />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ArticlePage;
