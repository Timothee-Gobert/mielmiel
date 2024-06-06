import { useEffect, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";

const Payement = ({ setActiveStep }: any) => {
  const [moyen, setMoyen] = useState("");
  useEffect(() => {
    if (localStorage.getItem("moyenDePayement")) {
      setMoyen(localStorage.getItem("moyenDePayement") as string);
    }
  }, []);
  const afficherContenu = () => {
    switch (moyen) {
      case "":
        return <p>Veuillez selectionner un moyen de payement</p>;
      case "Virement bancaire":
        return (
          <>
            <h3>Payement par virement bancaire</h3>
            <p>
              Pour les paiements par virement bancaire, veuillez utiliser les coordonnées bancaires fournies ci-dessous pour
              effectuer votre paiement. Assurez-vous d&apos;inclure votre numéro de commande dans la référence du virement. Votre
              commande sera réservée pendant une période maximale de 14 jours. Si nous ne recevons pas le paiement dans ce délai,
              la commande sera annulée et les articles seront remis en vente. Nous vous remercions de votre compréhension et de
              votre soutien à notre entreprise familiale.
            </p>
            <h2>IBAN</h2>
            <h3>FR 76 1100 6423 0052 1191 3968 623</h3>
            <h2>BIC / SWIFT</h2>
            <h3>AGRIFRPP810</h3>
          </>
        );
      case "Espèce":
        return (
          <>
            <h3>Payement par espèces</h3>
            <p>
              Si vous choisissez de payer en espèces, il vous suffira de venir récupérer votre commande directement chez nous.
              Vous trouverez nos coordonnées ci-dessous et dans la section &quot;Nous contacter&quot; de notre site. Veuillez
              noter que votre commande sera réservée pour une période maximale de 14 jours. Passé ce délai, si vous n&apos;avez
              pas récupéré votre commande, celle-ci sera annulée et les articles seront remis en vente. Nous vous remercions de
              votre compréhension et de votre soutien à notre entreprise familiale.
            </p>
            <h2>Adresse de la boutique</h2>
            <h3>7 rue du petit huis</h3>
            <h3>89 510 Véron</h3>
            <h3>France</h3>
          </>
        );
      default:
        return (
          <p>
            Nous tenons à vous informer que notre site est actuellement en construction et que seule les systèmes de paiement par
            virement bancaire et par espèce sont disponibles. Nous nous excusons pour tout désagrément que cela pourrait causer et
            vous remercions de votre patience et de votre compréhension. En attendant, nous vous invitons à utiliser les options
            de paiement disponibles. Merci de votre soutien à notre entreprise familiale.
          </p>
        );
    }
  };

  function submit() {
    if (moyen) {
      localStorage.setItem("moyenDePayement", moyen);
      setActiveStep((prevActiveStep: any) => prevActiveStep + 1);
    } else {
      alert("veuillez saisir un moyen de payement");
    }
  }

  const moyen_de_payement = [
    { label: "Virement bancaire" },
    { label: "Espèce" },
    { label: "Apple Pay" },
    { label: "Google Pay" },
    { label: "sumup" },
  ];

  return (
    <>
      <Autocomplete
        value={moyen as any}
        disablePortal
        onChange={(e) => setMoyen((e.target as HTMLElement).innerText)}
        id="combo-box-moyen_de_payement"
        selectOnFocus
        options={moyen_de_payement}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Moyen de payement" />}
      />
      <button onClick={submit} hidden={true} id={"payement"}></button>
      {afficherContenu()}
    </>
  );
};

export default Payement;
