import executerInsertRequete from "../executerInsertRequete";

export default async function sqlInsertArticle(colonnes: string, valeurs: string) {
  return await executerInsertRequete({
    table: "article",
    colonnes: `${colonnes}`,
    valeurs: `${valeurs}`,
  });
}
