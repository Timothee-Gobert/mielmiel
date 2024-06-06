type propsType = {
  table: string;
  clauseWhere?: string;
};

async function executerSelectRequete({ table, clauseWhere }: propsType) {
  let requete = `SELECT * FROM ${table}`;

  if (clauseWhere) {
    requete = requete + ` WHERE ${clauseWhere}`;
  }
  requete = requete + `;`;
  console.log(requete);
  return await fetch("/api/executerSQL", {
    method: "POST",
    body: requete,
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.message.length > 0) {
        return data.message;
      } else {
        return null;
      }
    });
}
export default executerSelectRequete;
