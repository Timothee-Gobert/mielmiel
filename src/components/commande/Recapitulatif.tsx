import styles from "./Recapitulatif.module.scss";
import { article } from "@/entities/article";
import TuileProduitPanier from "../tuiles/TuileProduitPanier";
import { useEffect, useState } from "react";
import storeGetCommande from "@/methodes/localStorage/storeGetCommande";
import { sumBy } from "lodash";
import sqlInsertAdresse from "@/services/sql/client/sqlInsertAdresse";
import sqlSelectAdresse from "@/services/sql/client/sqlSelectAdresse";
import sqlSelectClients from "@/services/sql/client/sqlSelectClients";
import sqlInsertClient from "@/services/sql/client/sqlInsertClient";
import sqlSelectMoyen from "@/services/sql/moyen/sqlSelectMoyen";
import sqlInsertCommande from "@/services/sql/commande/sqlInsertCommande";
import sqlInsertCommandeArticle from "@/services/sql/commande/commande_article/sqlInsertCommandeArticle";

const Recapitulatif = ({ setActiveStep }: any) => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [recupAdresseId, setRecupAdresseId] = useState([]);
  const [recupClientId, setRecupClientId] = useState([]);
  const [recupMoyenDePayementId, setRecupMoyenDePayementId] = useState([]);
  const [recupCommandeId, setRecupCommandeId] = useState([]);
  const [recupCommandeArticleId, setRecupCommandeArticleId] = useState([]);

  useEffect(() => {
    storeGetCommande() && setData(storeGetCommande().articles);
    storeGetCommande() && setTotal(sumBy(storeGetCommande().articles, "total"));
  }, []);

  async function submit() {
    // // Adresse
    // data
    const adresseCommande = localStorage.getItem("adresseCommande");
    const complementCommande = localStorage.getItem("complementCommande");
    const codePostalCommande = localStorage.getItem("codePostalCommande");
    const communeCommande = localStorage.getItem("communeCommande");
    // selectionner l'adresse dans la base de donnée si elle existe
    setRecupAdresseId(
      await sqlSelectAdresse(
        `adresse_complete = '${adresseCommande}' AND complement_adresse = '${complementCommande}' AND code_postal = '${codePostalCommande}' AND commune = '${communeCommande}'`
      )
    );
    // si il n'y a pas de concordance : création
    if (recupAdresseId == null) {
      setRecupAdresseId(
        await sqlInsertAdresse(
          `adresse_complete, complement_adresse, code_postal, commune`,
          `'${adresseCommande}', '${complementCommande}', '${codePostalCommande}', '${communeCommande}'`
        )
      );
    }
    // recuperation de adresse_id (ancienne || nouvelle)
    setRecupAdresseId((prev: any) => prev[0].adresse_id);

    // // Client
    // data
    const mailCommande = localStorage.getItem("mailCommande");
    const nomCommande = localStorage.getItem("nomCommande");
    const prenomCommande = localStorage.getItem("prenomCommande");
    const telCommande = localStorage.getItem("telCommande");
    // selectionner le client avec l'addresse mail pour recuperer son client_id
    setRecupClientId(await sqlSelectClients(`mail = '${mailCommande}'`));
    // si il n'y a pas de concordance : création avec l'adresse_id (ancienne || nouvelle)
    if (recupClientId == null) {
      setRecupClientId(
        await sqlInsertClient(
          `nom, prenom, mail, numero_telephone, adresse_id`,
          `'${nomCommande}', '${prenomCommande}', '${mailCommande}', '${telCommande}', ${recupAdresseId}`
        )
      );
    }
    // recuperation de client_id (ancienne || nouvelle)
    setRecupClientId((prev: any) => prev[0].client_id);

    // // Payement
    // data
    const moyenDePayement = localStorage.getItem("moyenDePayement");
    // selectionner le moyen de payement avec son label pour recuperer son id
    setRecupMoyenDePayementId(((await sqlSelectMoyen(`moyen = '${moyenDePayement}'`)) as any)[0].moyen_de_paiement_id);

    // // Statut
    // data
    const statutCommande = 1;

    // // Création de la ligne dans la table commande et recuperation de commande_id créé
    setRecupCommandeId(
      (
        (await sqlInsertCommande(
          `client_id, adresse_id, moyen_de_paiement_id, statut_statut_id`,
          `${recupClientId}, ${recupAdresseId}, ${recupMoyenDePayementId}, ${statutCommande}`
        )) as any
      )[0].commande_id
    );

    // // Création des lignes dans la table commande_article
    data.map(async (article: article) => {
      await sqlInsertCommandeArticle(
        `commande_id, article_id, quantite`,
        `${recupCommandeId}, ${article.article_id}, ${article.quantite}`
      );
    });

    localStorage.removeItem("adresseCommande");
    localStorage.removeItem("complementCommande");
    localStorage.removeItem("codePostalCommande");
    localStorage.removeItem("communeCommande");
    localStorage.removeItem("mailCommande");
    localStorage.removeItem("nomCommande");
    localStorage.removeItem("prenomCommande");
    localStorage.removeItem("telCommande");
    localStorage.removeItem("moyenDePayement");

    setActiveStep((prevActiveStep: any) => prevActiveStep + 1);
  }

  return (
    <>
      <h1>Récapitulatif de votre commande</h1>
      <div className={styles.info}>
        <div>
          <h2>Adresse de livraison</h2>
          <h3>{localStorage.getItem("adresseCommande")}</h3>
          <h4>{localStorage.getItem("complementCommande")}</h4>
          <h3>
            {localStorage.getItem("codePostalCommande")} {localStorage.getItem("communeCommande")}
          </h3>
        </div>
        <div>
          <h2>Moyen de payement</h2>
          <h3>{localStorage.getItem("moyenDePayement")}</h3>
          <h3>total : {total} €</h3>
        </div>
      </div>
      <div className={styles.article}>
        <h2>Articles</h2>
        <div>
          {data.map((article: article, index) => {
            return (
              <TuileProduitPanier
                article_id={article.article_id}
                type={article.type}
                annee_production={article.annee_production}
                designation={article.designation}
                poids={article.poids}
                prix={article.prix}
                quantite={article.quantite}
                total={article.total}
                key={index}
                action={false}
              />
            );
          })}
        </div>
      </div>
      <div className={styles.remerciement}>
        <h3>remerciement</h3>
        <p className={styles.paragraphe}>
          Nous vous remercions chaleureusement pour votre commande chez Les Miels Gobert. Votre soutien nous tient
          particulièrement à cœur. Nous espérons que vous apprécierez nos délices autant que nous aimons les créer pour vous.
          Merci et à très bientôt !
        </p>
      </div>
      <button onClick={submit} hidden={true} id={"validation"}></button>
    </>
  );
};

export default Recapitulatif;
