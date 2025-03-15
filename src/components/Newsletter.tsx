
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Mail } from 'lucide-react';

const Newsletter = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-primary/90 to-primary text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Restez Informé</h2>
          <p className="text-lg mb-8 text-white/90">
            Recevez les derniers conseils financiers, astuces d'investissement et opportunités directement dans votre boîte mail.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Input 
              type="email" 
              placeholder="Votre adresse email" 
              className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
            />
            <Button className="bg-accent hover:bg-accent/90 text-secondary font-medium whitespace-nowrap">
              S'inscrire <Mail className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm mt-4 text-white/70">
            Nous respectons votre vie privée. Désabonnez-vous à tout moment.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
