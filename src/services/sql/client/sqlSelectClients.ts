import executerSelectRequete from "../executerSelectRequete";

export default async function sqlSelectClients(clauseWhereClient: string) {
  return await executerSelectRequete({
    table: "client",
    clauseWhere: `${clauseWhereClient}`,
  });
}
