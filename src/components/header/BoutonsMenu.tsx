import React from "react";
import styles from "./Header.module.scss";
import Link from "next/link";

const BoutonsMenu = ({ classe, children }: any) => {
  return (
    <div className={classe}>
      <Link className={styles.link} href={`/`}>
        Accueil
      </Link>
      <Link className={styles.link} href={`/miels`}>
        Miels
      </Link>
      {/* <Link className={styles.link} href={`/`}>
        Panier cadeau
      </Link> */}
      <Link className={styles.link} href={`/autres`}>
        Autres produit
      </Link>
      {children}
    </div>
  );
};
export default BoutonsMenu;
