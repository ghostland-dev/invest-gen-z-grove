
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Search } from 'lucide-react';
import { Button } from './ui/button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-growth-600 font-heading font-bold text-2xl">Grove</span>
              <span className="bg-money-500 text-white px-2 py-0.5 text-xs rounded font-semibold">FINANCE</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link to="/" className="nav-link">Accueil</Link>
            <Link to="/categories/budgeting" className="nav-link">Budgétisation</Link>
            <Link to="/categories/investing" className="nav-link">Investissement</Link>
            <Link to="/categories/passive-income" className="nav-link">Revenus Passifs</Link>
            <Link to="/categories/gen-z-finance" className="nav-link">Finance Gen Z</Link>
            <Link to="/about" className="nav-link">À Propos</Link>
            <Button variant="ghost" size="icon" className="ml-2">
              <Search className="h-5 w-5" />
            </Button>
          </div>

          {/* Mobile Navigation Button */}
          <div className="flex md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              className="inline-flex items-center justify-center rounded-md"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-md">
            <Link to="/" className="block px-3 py-2 text-base font-medium hover:bg-gray-50 rounded-md" onClick={() => setIsOpen(false)}>
              Accueil
            </Link>
            <Link to="/categories/budgeting" className="block px-3 py-2 text-base font-medium hover:bg-gray-50 rounded-md" onClick={() => setIsOpen(false)}>
              Budgétisation
            </Link>
            <Link to="/categories/investing" className="block px-3 py-2 text-base font-medium hover:bg-gray-50 rounded-md" onClick={() => setIsOpen(false)}>
              Investissement
            </Link>
            <Link to="/categories/passive-income" className="block px-3 py-2 text-base font-medium hover:bg-gray-50 rounded-md" onClick={() => setIsOpen(false)}>
              Revenus Passifs
            </Link>
            <Link to="/categories/gen-z-finance" className="block px-3 py-2 text-base font-medium hover:bg-gray-50 rounded-md" onClick={() => setIsOpen(false)}>
              Finance Gen Z
            </Link>
            <Link to="/about" className="block px-3 py-2 text-base font-medium hover:bg-gray-50 rounded-md" onClick={() => setIsOpen(false)}>
              À Propos
            </Link>
            <div className="px-3 py-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute right-0 top-0 h-full"
                >
                  <Search className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
