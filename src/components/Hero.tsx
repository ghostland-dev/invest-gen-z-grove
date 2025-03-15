
import { ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-r from-growth-700 to-growth-900 text-white">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIwLjA1Ij4KICAgICAgICAgICAgPHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0yaC00djFoNHYtMXptNiAwaC00djFoNHYtMXptLTYgNGgtNHYxaDR2LTF6bTIgMGgtNHYxaDR2LTF6bTYgMGgtNHYxaDR2LTF6bS0xMiA0aC00djFoNHYtMXptMiAwaC00djFoNHYtMXptNiAwaC00djFoNHYtMXptLTEyIDRoLTR2MWg0di0xem0yIDBsLTQgMXY0bDQtMXYtNHptNiAwaC00djFoNHYtMXptLTEyIDhoLTR2MWg0di0xem0yIDBsLTQgMXY0bDQtMXYtNHptNiAwaC00djFoNHYtMXoiLz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==')]opacity-20"></div>
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Maximisez votre potentiel financier dès maintenant
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-green-50">
            Conseils d'investissement, astuces budgétaires et stratégies de revenus passifs pour la génération Z et les millennials.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-secondary font-medium">
              <Link to="/categories/investing">
                Explorer nos guides d'investissement
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-transparent border-white hover:bg-white/10 text-white">
              <Link to="/newsletter">
                S'inscrire à la newsletter
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
