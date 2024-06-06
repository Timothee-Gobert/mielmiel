import executerInsertRequete from "../executerInsertRequete";

export default async function sqlInsertAdresse(colonnes: string, valeurs: string) {
  return await executerInsertRequete({
    table: "adresse",
    colonnes: `${colonnes}`,
    valeurs: `${valeurs}`,
  });
}
