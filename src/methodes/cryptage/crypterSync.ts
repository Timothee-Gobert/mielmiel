import { hashSync } from "bcryptjs";

export default function crypterSync(entrer: string) {
  try {
    return hashSync(entrer, 3);
  } catch (error: any) {
    // console.log(error.message);
    // TODO si je passe par une API => tranforme côté serveur
    // je peut créer un fichier pour les sauvegarder et avoir une trace
    // TODO renvoyer le message d'erreur à mon adresse mail par l'API
  }
}
