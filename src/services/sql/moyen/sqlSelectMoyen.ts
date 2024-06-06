import executerSelectRequete from "../executerSelectRequete";

export default async function sqlSelectMoyen(clauseWhere: string) {
  return await executerSelectRequete({
    table: "moyen_de_paiement",
    clauseWhere: `${clauseWhere}`,
  });
}
