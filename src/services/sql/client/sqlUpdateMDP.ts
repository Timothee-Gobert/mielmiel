import executerUpdateRequete from "../executerUpdateRequete";

export default async function sqlUpdateMDP(colonneValeur: string, clauseWhereId: string) {
  return await executerUpdateRequete({
    table: "client",
    colonneValeur: `${colonneValeur}`,
    clauseWhere: `${clauseWhereId}`,
  });
}
