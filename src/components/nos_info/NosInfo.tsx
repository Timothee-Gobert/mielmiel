import React from "react";
import styles from "./NosInfo.module.scss";
import Image from "next/image";
import { Email, House, PhoneIphone } from "@mui/icons-material";

const NosInfo = () => {
  return (
    <div className={styles.nosInfo}>
      <div className={styles.logo}>
        <Image src={"/image/globale/logo.png"} width={90} height={90} alt={"logo"} />
      </div>
      <div className={styles.titre}>Les Miels Gobert</div>
      <div className={styles.img}>
        <Image
          src={"/image/globale/border-tricolore.png"}
          alt={"bordure tricolore"}
          width={0}
          height={5}
          style={{ width: "100%" }}
        />
      </div>
      <div className={styles.info}>
        <div>
          <PhoneIphone />
        </div>
        <div>06.62.69.84.80</div>
      </div>
      <div className={styles.info}>
        <Email />
        timothee.gobert92@gmail.com
      </div>
      <div className={styles.info}>
        <House />7 rue du petit huis 89 510 Véron
      </div>
    </div>
  );
};

export default NosInfo;
