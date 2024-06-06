function storeGetCompte() {
  return JSON.parse(localStorage.getItem("compte") as string);
}
export default storeGetCompte;
