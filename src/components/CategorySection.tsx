
import { Link } from 'react-router-dom';
import { PiggyBank, TrendingUp, Wallet, Landmark } from 'lucide-react';

// Mock data for categories
const categories = [
  {
    id: 1,
    title: "Budgétisation & Économies",
    description: "Astuces pour économiser rapidement et outils de budgétisation",
    icon: <PiggyBank className="w-8 h-8 text-money-500" />,
    slug: "budgeting",
    color: "bg-money-50 border-money-200"
  },
  {
    id: 2,
    title: "Stratégies d'Investissement",
    description: "Analyses du marché boursier et conseils d'investissement",
    icon: <TrendingUp className="w-8 h-8 text-growth-500" />,
    slug: "investing",
    color: "bg-growth-50 border-growth-200"
  },
  {
    id: 3,
    title: "Revenus Passifs",
    description: "Créer et diversifier vos sources de revenus passifs",
    icon: <Wallet className="w-8 h-8 text-accent" />,
    slug: "passive-income",
    color: "bg-amber-50 border-amber-200"
  },
  {
    id: 4,
    title: "Finance pour Gen Z",
    description: "Planification financière pour jeunes professionnels",
    icon: <Landmark className="w-8 h-8 text-blue-500" />,
    slug: "gen-z-finance",
    color: "bg-blue-50 border-blue-200"
  }
];

const CategorySection = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Explorer par Catégorie</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link 
              key={category.id} 
              to={`/categories/${category.slug}`}
              className={`category-card border p-6 ${category.color}`}
            >
              <div className="flex flex-col h-full">
                <div className="mb-4">
                  {category.icon}
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
