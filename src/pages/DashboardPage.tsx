
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Eye, EyeOff, Plus, Pencil, Trash2, LogOut } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { toast } from '@/hooks/use-toast';

// Simulated auth state for demo (would use Clerk or Supabase in production)
const useAuth = () => {
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const savedUser = localStorage.getItem('finance_blog_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (email: string, password: string) => {
    // Simple demo authentication (replace with real auth in production)
    if (password.length >= 6) {
      const userData = { email };
      localStorage.setItem('finance_blog_user', JSON.stringify(userData));
      setUser(userData);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('finance_blog_user');
    localStorage.removeItem('finance_blog_articles');
    setUser(null);
  };

  return { user, loading, login, logout };
};

// Article type
interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  status: 'draft' | 'published';
  slug: string;
}

// Article form schema
const articleSchema = z.object({
  title: z.string().min(5, { message: "Le titre doit contenir au moins 5 caractères" }),
  excerpt: z.string().min(10, { message: "L'extrait doit contenir au moins 10 caractères" }),
  content: z.string().min(50, { message: "Le contenu doit contenir au moins 50 caractères" }),
  category: z.string().min(1, { message: "Veuillez sélectionner une catégorie" }),
  status: z.enum(["draft", "published"], {
    required_error: "Veuillez sélectionner un statut",
  }),
});

// Login form schema
const loginSchema = z.object({
  email: z.string().email({ message: "Veuillez entrer une adresse email valide" }),
  password: z.string().min(6, { message: "Le mot de passe doit contenir au moins 6 caractères" }),
});

// Article management hooks
const useArticles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  
  useEffect(() => {
    // Load articles from localStorage for demo
    const savedArticles = localStorage.getItem('finance_blog_articles');
    if (savedArticles) {
      setArticles(JSON.parse(savedArticles));
    }
  }, []);

  const saveArticles = (updatedArticles: Article[]) => {
    localStorage.setItem('finance_blog_articles', JSON.stringify(updatedArticles));
    setArticles(updatedArticles);
  };

  const addArticle = (article: Omit<Article, 'id' | 'date' | 'slug'>) => {
    const newArticle: Article = {
      ...article,
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' }),
      slug: article.title.toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s+/g, '-'),
    };
    
    const updatedArticles = [...articles, newArticle];
    saveArticles(updatedArticles);
    return newArticle;
  };

  const updateArticle = (id: string, articleData: Partial<Article>) => {
    const updatedArticles = articles.map(article => 
      article.id === id 
        ? { 
            ...article, 
            ...articleData,
            slug: articleData.title 
              ? articleData.title.toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s+/g, '-')
              : article.slug
          }
        : article
    );
    saveArticles(updatedArticles);
  };

  const deleteArticle = (id: string) => {
    const updatedArticles = articles.filter(article => article.id !== id);
    saveArticles(updatedArticles);
  };

  return { articles, addArticle, updateArticle, deleteArticle };
};

// Login component
const LoginForm = ({ onLogin }: { onLogin: (email: string, password: string) => boolean }) => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    const success = onLogin(values.email, values.password);
    if (success) {
      toast({
        title: "Connexion réussie",
        description: "Vous êtes maintenant connecté à votre tableau de bord.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Échec de la connexion",
        description: "Email ou mot de passe incorrect.",
      });
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Connexion</CardTitle>
        <CardDescription>
          Connectez-vous pour gérer vos articles et votre compte.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="vous@exemple.fr" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mot de passe</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="******" 
                        {...field} 
                      />
                    </FormControl>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Se connecter
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

// Article form component
const ArticleForm = ({
  defaultValues,
  onSubmit,
  onCancel,
}: {
  defaultValues?: Partial<z.infer<typeof articleSchema>>;
  onSubmit: (values: z.infer<typeof articleSchema>) => void;
  onCancel: () => void;
}) => {
  const form = useForm<z.infer<typeof articleSchema>>({
    resolver: zodResolver(articleSchema),
    defaultValues: defaultValues || {
      title: "",
      excerpt: "",
      content: "",
      category: "",
      status: "draft",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Titre</FormLabel>
              <FormControl>
                <Input placeholder="Titre de l'article" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Catégorie</FormLabel>
              <FormControl>
                <select
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  {...field}
                >
                  <option value="" disabled>Sélectionner une catégorie</option>
                  <option value="budgeting">Budgétisation</option>
                  <option value="investing">Investissement</option>
                  <option value="passive-income">Revenus Passifs</option>
                  <option value="gen-z-finance">Finance Gen Z</option>
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="excerpt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Extrait</FormLabel>
              <FormControl>
                <Input placeholder="Bref résumé de l'article" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contenu</FormLabel>
              <FormControl>
                <textarea
                  placeholder="Contenu de l'article..."
                  className="flex min-h-32 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Statut</FormLabel>
              <FormControl>
                <select
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  {...field}
                >
                  <option value="draft">Brouillon</option>
                  <option value="published">Publié</option>
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Annuler
          </Button>
          <Button type="submit">
            Enregistrer
          </Button>
        </div>
      </form>
    </Form>
  );
};

// Article list component
const ArticleList = ({
  articles,
  onEdit,
  onDelete,
}: {
  articles: Article[];
  onEdit: (article: Article) => void;
  onDelete: (id: string) => void;
}) => {
  return (
    <div className="space-y-4">
      {articles.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          Aucun article trouvé. Créez votre premier article!
        </div>
      ) : (
        <>
          {articles.map((article) => (
            <Card key={article.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{article.title}</CardTitle>
                    <CardDescription>
                      {article.date} • {article.category} • 
                      <span className={`ml-2 ${article.status === 'published' ? 'text-green-500' : 'text-amber-500'}`}>
                        {article.status === 'published' ? 'Publié' : 'Brouillon'}
                      </span>
                    </CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="icon" onClick={() => onEdit(article)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => onDelete(article.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-gray-600 line-clamp-2">{article.excerpt}</p>
              </CardContent>
            </Card>
          ))}
        </>
      )}
    </div>
  );
};

// Main dashboard page
const DashboardPage = () => {
  const { user, loading, login, logout } = useAuth();
  const { articles, addArticle, updateArticle, deleteArticle } = useArticles();
  const [isEditing, setIsEditing] = useState(false);
  const [currentArticle, setCurrentArticle] = useState<Article | null>(null);
  const navigate = useNavigate();

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 flex justify-center">
          <div>Chargement...</div>
        </div>
      </Layout>
    );
  }

  if (!user) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-8 text-center">Tableau de Bord</h1>
          <LoginForm onLogin={login} />
        </div>
      </Layout>
    );
  }

  const handleAddArticle = () => {
    setCurrentArticle(null);
    setIsEditing(true);
  };

  const handleEditArticle = (article: Article) => {
    setCurrentArticle(article);
    setIsEditing(true);
  };

  const handleSubmitArticle = (values: z.infer<typeof articleSchema>) => {
    if (currentArticle) {
      updateArticle(currentArticle.id, values);
      toast({
        title: "Article mis à jour",
        description: "Votre article a été mis à jour avec succès.",
      });
    } else {
      const newArticle = addArticle(values);
      toast({
        title: "Article créé",
        description: "Votre nouvel article a été créé avec succès.",
      });
    }
    setIsEditing(false);
    setCurrentArticle(null);
  };

  const handleDeleteArticle = (id: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) {
      deleteArticle(id);
      toast({
        title: "Article supprimé",
        description: "L'article a été supprimé avec succès.",
      });
    }
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Déconnexion réussie",
      description: "Vous avez été déconnecté avec succès.",
    });
    navigate('/');
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Tableau de Bord</h1>
          <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            Déconnexion
          </Button>
        </div>

        <Tabs defaultValue="articles" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="articles">Mes Articles</TabsTrigger>
            <TabsTrigger value="account">Mon Compte</TabsTrigger>
          </TabsList>
          
          <TabsContent value="articles">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Gestion des Articles</CardTitle>
                  {!isEditing && (
                    <Button onClick={handleAddArticle} className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      Nouvel Article
                    </Button>
                  )}
                </div>
                <CardDescription>
                  Créez, modifiez et gérez vos articles de blog ici.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <ArticleForm
                    defaultValues={currentArticle || undefined}
                    onSubmit={handleSubmitArticle}
                    onCancel={() => {
                      setIsEditing(false);
                      setCurrentArticle(null);
                    }}
                  />
                ) : (
                  <ArticleList
                    articles={articles}
                    onEdit={handleEditArticle}
                    onDelete={handleDeleteArticle}
                  />
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Informations du compte</CardTitle>
                <CardDescription>
                  Gérez vos informations personnelles et préférences.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label>Email</Label>
                    <div className="mt-1 text-gray-700">{user.email}</div>
                  </div>
                  <div className="pt-4">
                    <p className="text-sm text-gray-500">
                      Ceci est une version simplifiée pour la démonstration.
                      Dans un environnement de production, vous auriez plus d'options de gestion de compte.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default DashboardPage;
