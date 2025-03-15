
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

const NewsletterCard = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast({
        variant: "destructive",
        title: "Adresse email invalide",
        description: "Veuillez entrer une adresse email valide.",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Store in localStorage for demo
    const subscribers = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
    subscribers.push({
      email,
      date: new Date().toISOString(),
      interests: ['all'], // Simple subscription
    });
    localStorage.setItem('newsletter_subscribers', JSON.stringify(subscribers));
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setEmail('');
      toast({
        title: "Inscription réussie",
        description: "Merci pour votre intérêt ! Consultez votre boîte mail pour confirmer votre inscription.",
      });
    }, 1000);
  };

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <div className="flex items-center space-x-3 mb-4">
        <div className="bg-primary/20 p-2 rounded-full">
          <Mail className="h-5 w-5 text-primary" />
        </div>
        <h3 className="font-bold text-lg">Contenu exclusif</h3>
      </div>
      
      <p className="text-gray-600 text-sm mb-4">
        Inscrivez-vous à notre newsletter pour recevoir les derniers conseils financiers, actualités et accéder à des articles exclusifs.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-3">
        <Input
          type="email"
          placeholder="Votre adresse e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full"
        />
        
        <Button 
          type="submit" 
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? 'En cours...' : "S'inscrire"}
        </Button>
      </form>
      
      <div className="mt-4 text-center">
        <Link to="/newsletter" className="text-sm text-primary hover:underline">
          Voir tous les avantages de notre newsletter
        </Link>
      </div>
    </div>
  );
};

export default NewsletterCard;
