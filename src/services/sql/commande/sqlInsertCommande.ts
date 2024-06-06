import executerInsertRequete from "../executerInsertRequete";

export default async function sqlInsertCommande(colonnes: string, valeurs: string) {
  return await executerInsertRequete({
    table: "commande",
    colonnes: `${colonnes}`,
    valeurs: `${valeurs}`,
  });
}
