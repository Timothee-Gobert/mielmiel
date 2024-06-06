import React, { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import Link from "next/link";
import Image from "next/image";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import BoutonsMenu from "./BoutonsMenu";
import { Box, IconButton, Menu, MenuItem, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import Badge, { BadgeProps } from "@mui/material/Badge";
import { AccountCircle } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import sumBy from "lodash/sumBy";
import { changementEtat } from "@/redux/utilsSlice";
import useTrigger from "@/hooks/useTrigger";
import storeGetCompte from "@/methodes/localStorage/storeGetCompte";
import storeGetCommande from "@/methodes/localStorage/storeGetCommande";
import comparerSync from "@/methodes/cryptage/compareSync";

const Header = () => {
  const dispatch = useDispatch();
  const [auth, setAuth] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [menuDeroulant, setMenuDeroulant] = useState(false);
  const [largeur, setLargeur] = useState(0);
  const [openModalPanierVide, setOpenModalPanierVide] = useState(false);
  const [menuCompteOuvert, setMenuCompteOuvert] = useState(false);
  const [nombreDarticles, setNombreDarticles] = useState(0);
  const trigger = useTrigger();
  const admin: string = "$2a$04$M1FfZV3lSyfvytCUpDMEiOaCmRmf8j5zYH/B2JUI4E5hwPsmvnfx.";

  useEffect(() => {
    if (storeGetCompte()) {
      setAuth(true);
      setIsAdmin(comparerSync(storeGetCompte().mail, admin));
    } else {
      setAuth(false);
      setIsAdmin(false);
    }
    setLargeur(window.innerWidth);
    setNombreDarticles(storeGetCommande() ? sumBy(storeGetCommande().articles, "quantite") : 0);
  }, [trigger]);

  const handleMenu = () => {
    setMenuCompteOuvert(true);
  };

  const handleClose = () => {
    setMenuCompteOuvert(false);
  };
  const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -3,
      top: 3,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  }));
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "white",
    boxShadow: 24,
  };

  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <Link href={isAdmin ? "/admin" : "/"}>
          <Image src={"/image/globale/logo.png"} alt={"logo miels gobert"} height={70} width={70} />
        </Link>
      </div>
      {largeur > 800 ? (
        <BoutonsMenu classe={styles.nav} />
      ) : (
        <div className={styles.menu}>
          <div className={styles.link} onClick={() => setMenuDeroulant((valeur_precedente) => !valeur_precedente)}>
            Menu
          </div>
          {menuDeroulant && (
            <BoutonsMenu classe={styles.navderoulant}>
              <Link className={styles.link} href={`/contact`}>
                Nous contacter
              </Link>
            </BoutonsMenu>
          )}
        </div>
      )}
      <div className={styles.nav}>
        {largeur > 800 && (
          <Link className={styles.link} href={`/contact`}>
            Nous contacter
          </Link>
        )}
        <Link
          className={styles.panier}
          onClick={(e) => {
            if (nombreDarticles === 0) {
              setOpenModalPanierVide(true);
              e.preventDefault();
            }
          }}
          href={`/panier`}
        >
          <IconButton size="large">
            <StyledBadge badgeContent={nombreDarticles} color="secondary">
              <ShoppingBasketIcon style={{ color: "rgb(255, 145, 0)" }} />
            </StyledBadge>
          </IconButton>
          <Modal open={openModalPanierVide} onClose={() => setOpenModalPanierVide(false)}>
            <Box sx={style}>
              <div className={styles.modalPanier}>
                <IconButton size="medium" onClick={() => setOpenModalPanierVide(false)}>
                  <CloseIcon className={styles.iconeFermeture} />
                </IconButton>
              </div>
              <div className={styles.modalTexte}>Votre panier est vide, vous devez d&apos;abord sélectionner des articles.</div>
            </Box>
          </Modal>
        </Link>

        <IconButton size="large" onClick={handleMenu} color="inherit">
          <AccountCircle />
        </IconButton>
        <Menu
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={menuCompteOuvert}
          onClose={handleClose}
          style={{ position: "fixed", top: "50px" }}
        >
          <MenuItem onClick={handleClose}>
            {auth ? (
              <div style={{ display: "flex", flexDirection: "column" }}>
                <p>{storeGetCompte().nom + " " + storeGetCompte().prenom}</p>
                <Link href={"/mon_compte"}>Mon compte</Link>
                <Link href={"/facture"}>Mes factures</Link>
                <Link
                  href={"/"}
                  onClick={() => {
                    localStorage.clear();
                    setAuth(false);
                    dispatch(changementEtat());
                  }}
                >
                  Se deconnecter
                </Link>
              </div>
            ) : (
              <>
                <Link href={"/login"}>Se connecter</Link>
              </>
            )}
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default Header;
