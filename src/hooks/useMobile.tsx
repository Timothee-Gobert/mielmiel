import { useEffect, useState } from "react";

const useMobile = () => {
  const [affichage, setAffichage] = useState(false);
  useEffect(() => {
    setAffichage(window.innerWidth < 800);
  }, []);
  return affichage;
};
export default useMobile;
