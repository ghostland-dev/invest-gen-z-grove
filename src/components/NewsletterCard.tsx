
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Mail } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

const NewsletterCard = () => {
  return (
    <Card className="w-full bg-gray-50 border-gray-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Newsletter Hebdomadaire</CardTitle>
        <CardDescription>
          Conseils financiers exclusifs et opportunités d'investissement
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <Input 
            type="email" 
            placeholder="Votre adresse email" 
            className="border-gray-300"
          />
          <Button className="w-full bg-primary hover:bg-primary/90">
            S'inscrire <Mail className="ml-2 h-4 w-4" />
          </Button>
          <p className="text-xs text-gray-500 text-center">
            Nous respectons votre vie privée. Désabonnez-vous à tout moment.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default NewsletterCard;
