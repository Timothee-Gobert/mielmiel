import React, { useEffect, useState } from "react";
import selectArticles from "@/services/sql/article/sqlSelectArticles";
import TuileProduit from "@/components/tuiles/TuileProduit";
import { article } from "@/entities/article";
import { camelCase } from "lodash";
import { useRouter } from "next/router";

const MielsPage = () => {
  const [data, setData] = useState([]);
  const router = useRouter();
  const typeDeProduit = router.query.produits as string;

  useEffect(() => {
    !["miels", "autres", undefined].includes(typeDeProduit) && router.replace("/");
    async function RecupererLesProduits() {
      if (typeDeProduit === "miels") {
        const reponseAPI: any = await selectArticles(`type = "Miel" AND poids <= 1000 AND quantite >0`);
        setData(reponseAPI);
      } else if (typeDeProduit === "autres") {
        const reponseAPI = await selectArticles(
          `type = "Vinaigre" or type = "Hydromel" or type = "Confiserie" or type = "Patisserie"`
        );
        setData(reponseAPI);
      }
    }
    RecupererLesProduits();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeDeProduit]);

  return (
    <div>
      <h1>{typeDeProduit === "autres" ? "Autres articles" : "Miels"}</h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {data.map((article: article, index) => (
          <TuileProduit
            article_id={article.article_id}
            type={article.type}
            annee_production={article.annee_production}
            designation={article.designation}
            poids={Math.round(article.poids)}
            prix={article.prix}
            quantite={article.quantite}
            url_image={camelCase(article.designation) + Math.round(article.poids) + ".png"}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};
export default MielsPage;
