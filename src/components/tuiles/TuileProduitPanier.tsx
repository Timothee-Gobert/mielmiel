import React from "react";
import Bouton from "../utils/Bouton";
import styles from "./TuileProduitPanier.module.scss";
import { useDispatch } from "react-redux";
import { changementEtat } from "@/redux/utilsSlice";
import storeGetCommande from "@/methodes/localStorage/storeGetCommande";
import storeSetCommande from "@/methodes/localStorage/storeSetCommande";

type propsType = {
  article_id: number;
  type: string;
  designation: string;
  poids: number;
  prix: string;
  annee_production: number;
  quantite: number;
  total: number;
  action?: boolean;
};

const TuileProduitPanier = ({
  article_id,
  type,
  designation,
  poids,
  prix,
  annee_production,
  quantite,
  total,
  action,
}: propsType) => {
  const dispatch = useDispatch();
  function supprimerArticle() {
    let commandes: { articles: any[] };
    commandes = storeGetCommande();
    commandes.articles = commandes.articles.filter((article) => article.article_id !== article_id);
    storeSetCommande(commandes);
    dispatch(changementEtat());
  }
  const unite = ["Vinaigre", "Hydromel"].includes(type) ? "cl" : "g";

  return (
    <div className={styles.tuile}>
      <div className={styles.designation}>
        {designation} {poids}&nbsp;{unite}
      </div>
      <div className={styles.infoSecondaire}>{annee_production}</div>
      <div className={styles.infoSecondaire}>Prix unitaire : {prix}&nbsp;€</div>
      <div className={styles.infoSecondaire}>En commande : {quantite}</div>
      <div className={styles.champFormulaire}>Total : {total}&nbsp;€</div>
      {action ? <Bouton onClick={supprimerArticle} label={"Supprimer"} /> : ""}
    </div>
  );
};

export default TuileProduitPanier;
