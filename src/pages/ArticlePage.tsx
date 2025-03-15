
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { getArticleBySlug, isSubscribed } from '../data/categoryData';
import NewsletterCard from '../components/NewsletterCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { Lock, Mail } from 'lucide-react';

const ArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [emailChecked, setEmailChecked] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);

  // Check if article is accessible
  useEffect(() => {
    if (slug) {
      const foundArticle = getArticleBySlug(slug);
      setArticle(foundArticle);
      
      // Si l'article n'est pas exclusif, on donne l'accès directement
      if (foundArticle && !foundArticle.exclusive) {
        setHasAccess(true);
      } else {
        // Vérifier si l'utilisateur a un accès enregistré
        const userEmail = localStorage.getItem('newsletter_user_email');
        if (userEmail) {
          setEmail(userEmail);
          checkSubscriptionStatus(userEmail);
        }
      }
      
      setLoading(false);
    }
  }, [slug]);
  
  // Vérifie si l'email est abonné à la newsletter
  const checkSubscriptionStatus = (emailToCheck: string) => {
    const subscribed = isSubscribed(emailToCheck);
    setHasAccess(subscribed);
    setEmailChecked(true);
    
    if (subscribed) {
      localStorage.setItem('newsletter_user_email', emailToCheck);
    }
  };
  
  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast({
        variant: "destructive",
        title: "Adresse email invalide",
        description: "Veuillez entrer une adresse email valide.",
      });
      return;
    }
    
    checkSubscriptionStatus(email);
    
    if (!isSubscribed(email)) {
      toast({
        variant: "destructive",
        title: "Accès refusé",
        description: "Cette adresse email n'est pas inscrite à notre newsletter. Veuillez vous inscrire pour accéder à ce contenu exclusif.",
      });
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-6"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-12"></div>
            <div className="h-64 bg-gray-200 rounded mb-8"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!article) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-bold mb-4">Article non trouvé</h1>
          <p className="mb-8">L'article que vous recherchez n'existe pas ou a été supprimé.</p>
          <Button onClick={() => navigate('/')}>Retour à l'accueil</Button>
        </div>
      </Layout>
    );
  }

  // Afficher le contenu exclusif ou l'écran de vérification
  if (article.exclusive && !hasAccess) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <article>
              <h1 className="text-3xl font-bold mb-3">{article.title}</h1>
              <div className="text-gray-500 text-sm mb-6">
                {article.date} • {article.readTime} de lecture • Catégorie: {article.category}
              </div>
              
              <div className="bg-gray-50 border border-gray-100 rounded-lg p-8 text-center my-8">
                <div className="flex justify-center mb-4">
                  <div className="bg-amber-100 p-3 rounded-full">
                    <Lock className="h-8 w-8 text-amber-600" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold mb-3">Contenu exclusif</h2>
                <p className="text-gray-600 mb-6">
                  Cet article est réservé à nos abonnés newsletter. Veuillez vérifier votre adresse email pour y accéder.
                </p>
                
                {!emailChecked ? (
                  <form onSubmit={handleEmailSubmit} className="max-w-md mx-auto">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Input
                        type="email"
                        placeholder="Votre adresse email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <Button type="submit">
                        Vérifier l'accès
                      </Button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-4">
                    <p className="text-red-500">
                      Cette adresse email n'est pas inscrite à notre newsletter.
                    </p>
                    <Button 
                      onClick={() => navigate('/newsletter')}
                      className="flex items-center gap-2"
                    >
                      <Mail className="h-4 w-4" />
                      S'inscrire à la newsletter
                    </Button>
                  </div>
                )}
                
                <p className="text-sm text-gray-500 mt-6">
                  L'inscription à notre newsletter est gratuite et vous donne accès à du contenu exclusif.
                </p>
              </div>
              
              <div className="prose max-w-none">
                <p className="text-lg font-medium">{article.excerpt}</p>
                <div className="blur-sm select-none">
                  {/* Contenu flouté */}
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor magna at metus pellentesque, in finibus neque faucibus...</p>
                  <p>Sed vitae eros nec nisi pharetra volutpat. Phasellus vel dui vel tellus facilisis varius vitae id nunc...</p>
                  <p>Suspendisse potenti. Ut venenatis magna quis semper vulputate. Vivamus euismod ultricies lacus eget tincidunt...</p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <article>
            <h1 className="text-3xl font-bold mb-3">{article.title}</h1>
            <div className="text-gray-500 text-sm mb-6">
              {article.date} • {article.readTime} de lecture • Catégorie: {article.category}
              {article.exclusive && (
                <span className="ml-2 bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full text-xs">
                  Exclusif
                </span>
              )}
            </div>
            <img 
              src={article.image} 
              alt={article.title} 
              className="w-full h-[400px] object-cover rounded-lg mb-8" 
            />
            <div className="prose max-w-none">
              <p className="text-lg font-medium">{article.excerpt}</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras porta condimentum lectus, non gravida ipsum blandit eget. Nam condimentum neque ac felis posuere, a vestibulum nulla sagittis.
              </p>
              <h2>Les points clés à retenir</h2>
              <p>
                Fusce vehicula dolor arcu, sit amet blandit dolor mollis nec. Donec viverra eleifend lacus, vitae ullamcorper metus. Sed sollicitudin ipsum quis nunc sollicitudin ultrices. Donec euismod scelerisque ligula. Maecenas eu varius risus, eu aliquet arcu.
              </p>
              <ul>
                <li>Pellentesque non pretium sem</li>
                <li>Cras dapibus risus ac nulla fringilla</li>
                <li>Maecenas tempus ante vel ligula pulvinar</li>
                <li>Vivamus eleifend malesuada dui in imperdiet</li>
              </ul>
              <p>
                Donec lobortis ultricies turpis, eu viverra magna gravida quis. Fusce sit amet pretium nulla. Duis rutrum metus vel libero sodales, pellentesque varius ex pulvinar.
              </p>
              <blockquote>
                "La gestion efficace de vos finances personnelles est essentielle pour atteindre vos objectifs de vie à long terme."
              </blockquote>
              <p>
                Suspendisse eu justo id lacus mollis interdum. Sed sem libero, sollicitudin id dui a, molestie faucibus diam. Aliquam erat volutpat. Nulla facilisi. In accumsan tincidunt justo id pulvinar.
              </p>
            </div>
          </article>
          
          <div className="mt-12">
            <NewsletterCard />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ArticlePage;
