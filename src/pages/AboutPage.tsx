
import Layout from '../components/Layout';
import NewsletterCard from '../components/NewsletterCard';
import { Card, CardContent } from '../components/ui/card';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h1 className="text-4xl font-bold mb-6">À Propos de Grove Finance</h1>
            
            <div className="prose max-w-none blog-content">
              <p className="text-xl text-gray-600 mb-8">
                Bienvenue sur Grove Finance, votre guide complet pour naviguer dans le monde de la finance personnelle et de l'investissement.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Notre Mission</h2>
              <p>
                Grove Finance a été créé avec une mission claire : démystifier la finance personnelle et rendre l'éducation financière accessible à tous, particulièrement aux millennials et à la génération Z. Nous croyons que chacun mérite d'avoir les connaissances et les outils nécessaires pour prendre des décisions financières éclairées et construire un avenir financier solide.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Notre Vision</h2>
              <p>
                Nous aspirons à devenir la ressource de référence en matière d'éducation financière pour les jeunes adultes. Notre objectif est de créer une communauté où les individus peuvent apprendre, partager et grandir ensemble sur leur chemin vers l'indépendance financière.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Ce Que Nous Offrons</h2>
              <p>
                Sur Grove Finance, vous trouverez des articles informatifs, des guides pratiques, des analyses de marché et des conseils personnalisés sur une variété de sujets financiers, notamment :
              </p>
              
              <ul className="list-disc pl-6 my-4 space-y-2">
                <li>Budgétisation et économies personnelles</li>
                <li>Stratégies d'investissement pour débutants et intermédiaires</li>
                <li>Création et diversification de revenus passifs</li>
                <li>Finance personnelle adaptée aux défis uniques de la génération Z</li>
              </ul>
              
              <p>
                Tous nos contenus sont écrits par des experts financiers ou des passionnés ayant une expérience significative dans leur domaine. Nous nous engageons à fournir des informations précises, à jour et pertinentes pour vous aider à prendre des décisions financières éclairées.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Notre Équipe</h2>
              <p>
                Grove Finance est né de la passion d'une équipe de professionnels de la finance et d'éducateurs qui croient fermement que la littératie financière devrait être accessible à tous. Notre équipe diversifiée apporte une richesse de perspectives et d'expertises, garantissant que notre contenu est à la fois complet et relatable.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Transparence et Divulgation</h2>
              <p>
                Chez Grove Finance, nous valorisons la transparence. Bien que nous puissions recevoir des compensations pour certains produits ou services recommandés sur notre site, toutes nos opinions et analyses sont honnêtes et indépendantes. Nous nous engageons à divulguer clairement toute relation commerciale pouvant influencer notre contenu.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Rejoignez Notre Communauté</h2>
              <p>
                Nous vous invitons à rejoindre notre communauté croissante de personnes partageant les mêmes idées, toutes désireuses d'améliorer leur bien-être financier. Abonnez-vous à notre newsletter pour recevoir les derniers articles, conseils et ressources directement dans votre boîte de réception.
              </p>
              
              <div className="mt-8">
                <Link to="/contact" className="text-primary hover:text-primary/80 underline">
                  Contactez-nous
                </Link> si vous avez des questions, des suggestions ou si vous souhaitez collaborer avec nous.
              </div>
            </div>
          </div>
          
          <div className="md:col-span-1 space-y-6">
            <Card className="overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                alt="Financial growth" 
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2">Notre Philosophie</h3>
                <p className="text-gray-600">
                  Nous croyons que la liberté financière est accessible à tous avec les bonnes connaissances, stratégies et discipline. Notre approche combine des principes financiers éprouvés avec des perspectives innovantes adaptées à l'économie moderne.
                </p>
              </CardContent>
            </Card>
            
            <NewsletterCard />
            
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2">Suivez-nous</h3>
                <p className="text-gray-600 mb-4">
                  Restez connecté avec nous sur les réseaux sociaux pour des conseils quotidiens et des mises à jour.
                </p>
                <div className="flex space-x-4 justify-center">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                    Facebook
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600">
                    Twitter
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-800">
                    Instagram
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
