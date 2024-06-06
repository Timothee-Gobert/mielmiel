type propsType = {
  table: string;
  colonneValeur: string;
  clauseWhere: string;
};

async function executerUpdateRequete({ table, colonneValeur, clauseWhere }: propsType) {
  //UPDATE table SET nom_colonne_1 = 'nouvelle valeur' WHERE condition;
  let requete = `UPDATE ${table} SET ${colonneValeur} WHERE ${clauseWhere} ;`;
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
export default executerUpdateRequete;
