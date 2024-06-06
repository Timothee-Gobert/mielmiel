import styles from "./Bouton.module.scss";
import Button from "@mui/material/Button";

type propsType = {
  label: string;
  children?: any;
  onClick?: any;
  style?: any;
};

const Bouton = ({ label, children, onClick, style }: propsType) => {
  return (
    <Button onClick={onClick && onClick} type="submit" className={styles.bouton} style={style}>
      {children} {label}
    </Button>
  );
};
export default Bouton;
