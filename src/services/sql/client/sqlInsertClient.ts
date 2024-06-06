import executerInsertRequete from "../executerInsertRequete";

export default async function sqlInsertClient(colonnes: string, valeurs: string) {
  return await executerInsertRequete({
    table: "client",
    colonnes: `${colonnes}`,
    valeurs: `${valeurs}`,
  });
}
