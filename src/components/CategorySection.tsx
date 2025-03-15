
import { Link } from 'react-router-dom';
import { PiggyBank, TrendingUp, Wallet, Landmark } from 'lucide-react';
import { categoryData } from '../data/categoryData';

const CategorySection = () => {
  // Function to get icon based on category slug
  const getCategoryIcon = (slug: string) => {
    switch (slug) {
      case 'budgeting':
        return <PiggyBank className="w-8 h-8 text-money-500" />;
      case 'investing':
        return <TrendingUp className="w-8 h-8 text-growth-500" />;
      case 'passive-income':
        return <Wallet className="w-8 h-8 text-accent" />;
      case 'gen-z-finance':
        return <Landmark className="w-8 h-8 text-blue-500" />;
      default:
        return <TrendingUp className="w-8 h-8 text-primary" />;
    }
  };

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Explorer par Catégorie</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categoryData.map((category) => (
            <Link 
              key={category.id} 
              to={`/categories/${category.slug}`}
              className={`category-card border p-6 ${category.color}`}
            >
              <div className="flex flex-col h-full">
                <div className="mb-4">
                  {getCategoryIcon(category.slug)}
                </div>
                <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <div className="mt-auto">
                  <span className="text-primary font-medium">Découvrir →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
