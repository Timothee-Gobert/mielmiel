import executerUpdateRequete from "../executerUpdateRequete";

export default async function sqlUpdateArticle(colonneValeur: string, clauseWhereId: string) {
  return await executerUpdateRequete({
    table: "article",
    colonneValeur: `${colonneValeur}`,
    clauseWhere: `${clauseWhereId}`,
  });
}
