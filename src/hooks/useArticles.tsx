
import { useState, useEffect } from 'react';

// Article type
export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  status: 'draft' | 'published';
  slug: string;
  exclusive?: boolean;
}

// Article management hooks
export const useArticles = () => {
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
