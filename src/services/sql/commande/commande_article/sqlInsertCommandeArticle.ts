import executerInsertRequete from "../../executerInsertRequete";

export default async function sqlInsertCommandeArticle(colonnes: string, valeurs: string) {
  return await executerInsertRequete({
    table: "commande_article",
    colonnes: `${colonnes}`,
    valeurs: `${valeurs}`,
  });
}
