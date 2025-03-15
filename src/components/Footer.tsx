
import { Link } from 'react-router-dom';
import { Mail, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

const Footer = () => {
  return (
    <footer className="bg-secondary text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold mb-4">À propos de Grove Finance</h3>
            <p className="text-gray-300 mb-4">
              Un guide de finance personnelle et d'investissement pour la génération Z et les millennials.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-accent transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-accent transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-accent transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-accent transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Liens Rapides</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-accent transition-colors">Accueil</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-accent transition-colors">À Propos</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-accent transition-colors">Contact</Link></li>
              <li><Link to="/privacy-policy" className="text-gray-300 hover:text-accent transition-colors">Politique de Confidentialité</Link></li>
              <li><Link to="/terms" className="text-gray-300 hover:text-accent transition-colors">Conditions d'Utilisation</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-bold mb-4">Catégories</h3>
            <ul className="space-y-2">
              <li><Link to="/categories/budgeting" className="text-gray-300 hover:text-accent transition-colors">Budgétisation</Link></li>
              <li><Link to="/categories/investing" className="text-gray-300 hover:text-accent transition-colors">Investissement</Link></li>
              <li><Link to="/categories/passive-income" className="text-gray-300 hover:text-accent transition-colors">Revenus Passifs</Link></li>
              <li><Link to="/categories/gen-z-finance" className="text-gray-300 hover:text-accent transition-colors">Finance Gen Z</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-4">Newsletter</h3>
            <p className="text-gray-300 mb-4">
              Inscrivez-vous pour recevoir nos derniers articles et conseils financiers.
            </p>
            <div className="space-y-2">
              <Input 
                type="email" 
                placeholder="Votre email" 
                className="bg-gray-700 border-gray-600 text-white" 
              />
              <Button className="w-full bg-accent hover:bg-accent/90 text-secondary font-medium">
                S'inscrire <Mail className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Grove Finance. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
