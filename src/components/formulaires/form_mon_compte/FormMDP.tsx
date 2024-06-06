import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import ChampFormulaire from "../ChampFormulaire";
import { useEffect } from "react";
import { messageResolver } from "@/constantes/messagesFormulaires";
import Bouton from "@/components/utils/Bouton";
import comparerSync from "@/methodes/cryptage/compareSync";
import storeGetCompte from "@/methodes/localStorage/storeGetCompte";
import crypterSync from "@/methodes/cryptage/crypterSync";
import sqlUpdateMDP from "@/services/sql/client/sqlUpdateMDP";

const FormMDP = () => {
  const MDPSchema = yup.object({
    ancienMotDePasse: yup.string(),
    nouveauMotDePasse: yup
      .string()
      .required(messageResolver.champObligatoire)
      .min(5, "Mot de passe trop court")
      .max(100, "Mot de passe trop long"),
    confirmationNouveauMotDePasse: yup
      .string()
      .required("Vous devez confirmer votre mot de passe")
      .oneOf([yup.ref("nouveauMotDePasse"), "null"], "Passwords must match"),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(MDPSchema),
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function submit(values: any) {
    console.log(values);
    const compte = storeGetCompte();
    console.log(compte);
    if (comparerSync(values.ancienMotDePasse, compte.mdp)) {
      console.log("ok");
      const futureMotDePasseCrypter = crypterSync(values.nouveauMotDePasse);
      await sqlUpdateMDP(`mdp = '${futureMotDePasseCrypter}'`, `client_id = ${compte.client_id}`);
    } else {
      alert("Ancien mot de passe non valide");
    }
  }

  const listeChamps = [
    {
      label: "Ancien mot de passe",
      type: "password",
      optionel: false,
    },
    {
      label: "Nouveau mot de passe",
      type: "password",
      optionel: false,
    },
    {
      label: "Confirmation nouveau mot de passe",
      type: "password",
      optionel: false,
    },
  ];

  return (
    <form onSubmit={handleSubmit(submit)}>
      {listeChamps.map((champ) => {
        return (
          <ChampFormulaire
            key={champ.label} // demande une clé unique TODO: changer index
            label={champ.label}
            register={register}
            optionel={champ.optionel}
            typeChamp={champ.type}
            errors={errors}
          />
        );
      })}
      <Bouton label={"Changer mot de passe"}></Bouton>
    </form>
  );
};

export default FormMDP;
