
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Layout from "../components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <p className="text-2xl text-gray-600 mb-8">
          Oups ! La page que vous recherchez semble introuvable.
        </p>
        <p className="text-lg text-gray-500 mb-8 max-w-lg mx-auto">
          Peut-être que cette page a été déplacée, supprimée, ou n'a jamais existé. 
          Retournez à notre page d'accueil pour continuer votre exploration.
        </p>
        <Button asChild size="lg">
          <Link to="/">
            Retour à l'accueil
          </Link>
        </Button>
      </div>
    </Layout>
  );
};

export default NotFound;
