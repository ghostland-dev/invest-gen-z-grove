
import * as z from 'zod';

// Article form schema
export const articleSchema = z.object({
  title: z.string().min(5, { message: "Le titre doit contenir au moins 5 caractères" }),
  excerpt: z.string().min(10, { message: "L'extrait doit contenir au moins 10 caractères" }),
  content: z.string().min(50, { message: "Le contenu doit contenir au moins 50 caractères" }),
  category: z.string().min(1, { message: "Veuillez sélectionner une catégorie" }),
  status: z.enum(["draft", "published"], {
    required_error: "Veuillez sélectionner un statut",
  }),
  exclusive: z.boolean().optional(),
});

// Login form schema
export const loginSchema = z.object({
  email: z.string().email({ message: "Veuillez entrer une adresse email valide" }),
  password: z.string().min(6, { message: "Le mot de passe doit contenir au moins 6 caractères" }),
});
