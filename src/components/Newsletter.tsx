
import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Mail } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Newsletter = () => {
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
      interests: ['all'], // Simple subscription just has all interests
    });
    localStorage.setItem('newsletter_subscribers', JSON.stringify(subscribers));
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setEmail('');
      toast({
        title: "Inscription réussie",
        description: "Merci pour votre inscription à notre newsletter !",
      });
    }, 1000);
  };

  return (
    <section className="py-16 bg-gradient-to-r from-primary/90 to-primary text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Restez Informé</h2>
          <p className="text-lg mb-8 text-white/90">
            Recevez les derniers conseils financiers, astuces d'investissement et accédez à des articles exclusifs directement dans votre boîte mail.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <Input 
              type="email" 
              placeholder="Votre adresse email" 
              className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button 
              className="bg-accent hover:bg-accent/90 text-secondary font-medium whitespace-nowrap"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'En cours...' : "S'inscrire"} <Mail className="ml-2 h-4 w-4" />
            </Button>
          </form>
          <p className="text-sm mt-4 text-white/70">
            Recevez un accès exclusif à du contenu premium. Nous respectons votre vie privée. Désabonnez-vous à tout moment.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
