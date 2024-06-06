import executerSelectRequete from "../executerSelectRequete";

async function sqlSelectAdresse(clauseWhere: string) {
  return await executerSelectRequete({
    table: "adresse",
    clauseWhere: `${clauseWhere}`,
  });
}
export default sqlSelectAdresse;
