function storeGetMail() {
  return localStorage.getItem("LastInputMail") as string;
}
export default storeGetMail;
