
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { toast } from '@/hooks/use-toast';
import { Mail, CheckCircle2 } from 'lucide-react';

// Form schema for newsletter subscription
const newsletterSchema = z.object({
  email: z.string().email({ message: "Veuillez entrer une adresse email valide" }),
  firstName: z.string().min(2, { message: "Le prénom doit contenir au moins 2 caractères" }),
  lastName: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
  interests: z.array(z.string()).min(1, { message: "Veuillez sélectionner au moins un intérêt" }),
});

const interests = [
  { id: 'budgeting', label: 'Budgétisation' },
  { id: 'investing', label: 'Investissement' },
  { id: 'passive-income', label: 'Revenus Passifs' },
  { id: 'gen-z-finance', label: 'Finance Gen Z' },
  { id: 'crypto', label: 'Crypto-monnaies' },
  { id: 'real-estate', label: 'Immobilier' },
];

const NewsletterPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  
  const form = useForm<z.infer<typeof newsletterSchema>>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      interests: [],
    },
  });

  const onSubmit = (values: z.infer<typeof newsletterSchema>) => {
    // In a real application, we would send this data to a backend API
    console.log('Newsletter subscription:', values);
    
    // Store in localStorage for demo
    const subscribers = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
    subscribers.push({
      ...values,
      date: new Date().toISOString(),
    });
    localStorage.setItem('newsletter_subscribers', JSON.stringify(subscribers));
    
    setIsSubmitted(true);
    
    toast({
      title: "Inscription réussie",
      description: "Merci pour votre inscription à notre newsletter !",
    });
  };

  if (isSubmitted) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <CheckCircle2 className="h-12 w-12 text-green-500" />
              </div>
              <CardTitle className="text-center">Inscription Réussie !</CardTitle>
              <CardDescription className="text-center">
                Merci de vous être inscrit à notre newsletter. Vous recevrez bientôt nos derniers articles et conseils financiers.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <Button className="mt-4" onClick={() => navigate('/')}>
                Retour à l'accueil
              </Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Inscrivez-vous à notre Newsletter</h1>
            <p className="text-gray-600">
              Recevez nos meilleurs conseils financiers, actualités et astuces directement dans votre boîte mail.
            </p>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Formulaire d'inscription
              </CardTitle>
              <CardDescription>
                Remplissez ce formulaire pour recevoir notre newsletter hebdomadaire.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Prénom</FormLabel>
                          <FormControl>
                            <Input placeholder="Votre prénom" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nom</FormLabel>
                          <FormControl>
                            <Input placeholder="Votre nom" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="vous@exemple.fr" type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="interests"
                    render={() => (
                      <FormItem>
                        <FormLabel>Centres d'intérêt</FormLabel>
                        <FormDescription>
                          Sélectionnez les sujets qui vous intéressent.
                        </FormDescription>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          {interests.map((interest) => (
                            <FormField
                              key={interest.id}
                              control={form.control}
                              name="interests"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={interest.id}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <input
                                        type="checkbox"
                                        className="h-4 w-4 mt-1 rounded border-gray-300 text-primary focus:ring-primary"
                                        checked={field.value?.includes(interest.id)}
                                        onChange={(e) => {
                                          const checked = e.target.checked;
                                          const updatedInterests = checked
                                            ? [...field.value, interest.id]
                                            : field.value?.filter(
                                                (value) => value !== interest.id
                                              );
                                          field.onChange(updatedInterests);
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal cursor-pointer">
                                      {interest.label}
                                    </FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="w-full">
                    S'inscrire à la newsletter
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
          
          <div className="mt-8 text-center text-gray-500 text-sm">
            <p>
              En vous inscrivant, vous acceptez de recevoir notre newsletter hebdomadaire.
              Vous pourrez vous désabonner à tout moment. Nous ne partagerons jamais vos informations.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NewsletterPage;
