
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';
import { Article } from '@/hooks/useArticles';

interface ArticleListProps {
  articles: Article[];
  onEdit: (article: Article) => void;
  onDelete: (id: string) => void;
}

const ArticleList = ({ articles, onEdit, onDelete }: ArticleListProps) => {
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
                      {article.exclusive && (
                        <span className="ml-2 text-purple-500">• Exclusif</span>
                      )}
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

export default ArticleList;
