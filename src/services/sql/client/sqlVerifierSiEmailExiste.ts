import executerSelectRequete from "../executerSelectRequete";

export default async function sqlVerifierSiEmailExiste(email: string) {
  const reponseAPI = await executerSelectRequete({
    table: "client",
    clauseWhere: `mail = '${email}'`,
  });
  return !!reponseAPI;
}
