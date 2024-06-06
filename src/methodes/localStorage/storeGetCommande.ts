function storeGetCommande() {
  return JSON.parse(localStorage.getItem("ListeCommandes") as string);
}
export default storeGetCommande;
