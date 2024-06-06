import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { toNumber } from "lodash";
import Bouton from "../utils/Bouton";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import styles from "./TuileProduit.module.scss";
import { Box, Modal } from "@mui/material";
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
  url_image: string;
};

const TuileProduit = ({ article_id, type, designation, poids, prix, annee_production, quantite, url_image }: propsType) => {
  const [url, setUrl] = useState("/image/produits/" + url_image);
  const [openImage, setOpenImage] = useState(false);

  const { register, handleSubmit, setValue } = useForm({
    mode: "onSubmit",
  });

  useEffect(() => {
    setUrl("/image/produits/" + url_image);
  }, [url_image]);

  async function testURL() {
    return await fetch(url).then((e) => {
      if (e.status === 404) {
        setUrl("/image/placeholder.png");
      }
    });
  }
  testURL();
  const unite = ["Vinaigre", "Hydromel"].includes(type) ? "cl" : "g";
  const dispatch = useDispatch();
  async function submit(quantiteSelectionne: any) {
    if (quantiteSelectionne.quantite <= 0) {
      setValue("quantite", null);
    } else {
      const commande = {
        article_id: article_id,
        type: type,
        designation: designation,
        poids: poids,
        annee_production: annee_production,
        quantite: toNumber(quantiteSelectionne.quantite),
        prix: toNumber(prix),
        total: toNumber(quantiteSelectionne.quantite) * toNumber(prix),
      };
      let commandes = { articles: [] as any };
      storeGetCommande() && (commandes = storeGetCommande());

      commandes.articles.some((article: any) => {
        if (article.article_id === article_id) {
          article.quantite += toNumber(quantiteSelectionne.quantite);
          article.total += toNumber(quantiteSelectionne.quantite) * toNumber(prix);
          return true;
        } else {
          return false;
        }
      }) || commandes.articles.push(commande);
      storeSetCommande(commandes);
      setValue("quantite", null);
      dispatch(changementEtat());
    }
  }
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "white",
    boxShadow: 24,
    padding: 4,
  };

  return (
    <div className={styles.tuile}>
      <div className={styles.designation}>
        {designation} {poids}&nbsp;{unite}
      </div>
      <div className={styles.img}>
        <Image
          src={url}
          alt={`${designation} ${poids} ${unite} `}
          width={200}
          height={250}
          className={styles.png}
          onClick={() => setOpenImage(true)}
        />
        <Modal open={openImage} onClose={() => setOpenImage(false)}>
          <Box sx={style}>
            <Image src={url} alt={`${designation} ${poids} ${unite} `} height={800} width={800} className={styles.pngModal} />
          </Box>
        </Modal>
      </div>

      <div className={styles.info}>
        <form className={styles.form} onSubmit={handleSubmit(submit)}>
          <div className={styles.infoSecondaire}>
            <div>Millesimes :</div>
            <div>{annee_production}</div>
          </div>
          <div className={styles.infoSecondaire}>
            <div>En stock :</div>
            <div>{quantite}</div>
          </div>
          <div className={styles.champFormulaire}>
            <label>Quantité :</label>
            <input {...register("quantite")} type={"number"} min={0} style={{ width: "50px" }} />
          </div>
          <div className={styles.infoSecondaire}>
            <div className={styles.prix}>{prix}&nbsp;€</div>
          </div>
          <div className={styles.bouton}>
            <Bouton label={"Ajouter"}>
              <AddShoppingCartIcon />
            </Bouton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TuileProduit;
