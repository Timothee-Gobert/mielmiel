import React from "react";
import styles from "./index.module.scss";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <h1>Accueil</h1>
      <div className={styles.container}>
        <h2>Bienvenue dans la boutique de miel des Miels Gobert</h2>
        <div className={styles.bloc}>
          <div className={styles.texte}>
            <h3>L&apos;entreprise</h3>
            <p className={styles.paragraphe}>
              Bienvenue chez Les Miels Gobert, votre source locale de délices sucrés et de passion pour l&apos;apiculture. Nichés
              au cœur du pittoresque village de Veron, dans l&apos;Yonne en Bourgogne, nous sommes une entreprise familiale
              dévouée à la préservation des traditions apicoles et à la production de miels de qualité exceptionnelle. Avec nos
              trente ruches soigneusement entretenues, nous nous engageons à offrir à nos clients des produits naturels, purs et
              délicieusement savoureux. Explorez notre site pour découvrir notre histoire, nos méthodes de production et notre
              gamme de miels exquis, cultivés avec amour et respect pour nos abeilles et pour l&apos;environnement. Bienvenue dans
              l&apos;univers des Miels Gobert, où chaque goutte de miel raconte une histoire de dévouement, de nature et de saveur
              authentique.
            </p>
          </div>
          <Image
            src={"/image/accueil/miellerie.jpg"}
            alt={"photo entreprise"}
            height={170}
            width={170}
            className={styles.photo}
          />
        </div>
        <div className={styles.bloc}>
          <Image src={"/image/accueil/miels.JPG"} alt={"photo miels"} height={170} width={170} className={styles.photo} />
          <div className={styles.texte}>
            <h3>Nos produits</h3>
            <p className={styles.paragraphe}>
              Plongez dans l&apos;expérience gustative unique des Miels Gobert avec notre gamme exclusive de produits artisanaux,
              tous fabriqués avec soin à partir de notre délicieux miel récolté dans nos ruches. Découvrez notre sélection variée,
              allant du miel pur et naturel à des créations uniques telles que l&apos;hydromel et le vinaigre de miel.
            </p>
          </div>
        </div>
        <div className={styles.bloc}>
          <div className={styles.texte}>
            <h3>Nos partenariats</h3>
            <p className={styles.paragraphe}>
              En plus de nos créations maison, nous avons le privilège de collaborer avec d&apos;autres entreprises locales pour
              vous offrir une gamme encore plus étendue de délices sucrés. Notre boulangerie partenaire, réputée pour son
              savoir-faire traditionnel, confectionne avec amour notre pain d&apos;épice moelleux, imprégné de la douceur
              ensoleillée de notre miel. De même, l&apos;entreprise Hu, spécialisée dans les confiseries artisanales, utilise
              notre miel pour créer des nougats fondants et des bonbons au miel, offrant ainsi une expérience sucrée inoubliable,
              le tout avec une touche locale et authentique.
            </p>
            <p className={styles.paragraphe}>
              Chez Les Miels Gobert avec notre communauté locale, chaque produit que nous proposons est le fruit d&apos;un travail
              acharné, d&apos;une passion pour l&apos;apiculture et d&apos;un profond respect pour nos précieuses abeilles.
              Dégustez nos créations et laissez-vous emporter par les saveurs uniques de notre terroir, pour une expérience
              gustative incomparable.
            </p>
          </div>
          <Image src={"/image/accueil/hu.jpg"} alt={"photo partenaires"} height={170} width={170} className={styles.photo} />
        </div>
      </div>
    </>
  );
}
