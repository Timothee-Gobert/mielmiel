type propsType = {
  table: string;
  colonnes: string;
  valeurs: string;
};

async function executerInsertRequete({ table, colonnes, valeurs }: propsType) {
  //INSERT INTO table (nom_colonne_1, nom_colonne_2, ...VALUES ('valeur 1', 'valeur 2', ...)
  let requete = `INSERT INTO ${table} (${colonnes}) VALUES (${valeurs}) ;`;
  console.log(requete);
  return await fetch("/api/executerSQL", {
    method: "POST",
    body: requete,
  })
    .then((res) => res.json())
    .then((data) => data.message);
}
export default executerInsertRequete;
