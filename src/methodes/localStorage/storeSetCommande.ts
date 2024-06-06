function storeSetCommande(commande: any) {
  localStorage.setItem("ListeCommandes", JSON.stringify(commande));
}
export default storeSetCommande;
