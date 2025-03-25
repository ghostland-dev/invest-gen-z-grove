
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Plus, LogOut } from 'lucide-react';
import * as z from 'zod';
import { toast } from '@/hooks/use-toast';

// Import the extracted components and hooks
import { useAuth } from '@/hooks/useAuth';
import { useArticles, Article } from '@/hooks/useArticles';
import { articleSchema } from '@/schemas/articleSchemas';
import LoginForm from '@/components/dashboard/LoginForm';
import ArticleForm from '@/components/dashboard/ArticleForm';
import ArticleList from '@/components/dashboard/ArticleList';

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
      const articleData = {
        title: values.title,
        excerpt: values.excerpt,
        content: values.content,
        category: values.category,
        status: values.status,
        exclusive: values.exclusive
      };
      
      addArticle(articleData);
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
