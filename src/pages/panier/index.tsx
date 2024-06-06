import Link from "next/link";
import React, { useEffect, useState } from "react";
import { article } from "@/entities/article";
import TuileProduitPanier from "@/components/tuiles/TuileProduitPanier";
import Bouton from "@/components/utils/Bouton";
import { useRouter } from "next/router";
import useTrigger from "@/hooks/useTrigger";
import storeGetCommande from "@/methodes/localStorage/storeGetCommande";
import { sumBy } from "lodash";

const Panier = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const trigger = useTrigger();

  useEffect(() => {
    storeGetCommande() && setData(storeGetCommande().articles);
  }, [trigger]);

  let totalCommande: number;
  totalCommande = storeGetCommande() ? sumBy(storeGetCommande().articles, "total") : 0;
  if (data.length > 0) {
    return (
      <>
        <div>
          <h1>Panier à {totalCommande} € TTC</h1>
          <Link href={`/panier/valider_panier`}>
            <Bouton label={"Valider panier"} />
          </Link>
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
                action={true}
              />
            );
          })}
        </div>
      </>
    );
  } else {
    return (
      <>
        <div>Vous venez de supprimer tout les articles de votre panier</div>
        <div>
          <Bouton label={"Revenir au site"} onClick={() => router.replace("/")}></Bouton>
        </div>
      </>
    );
  }
};

export default Panier;
