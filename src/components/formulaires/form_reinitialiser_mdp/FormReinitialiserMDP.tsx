import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ChampFormulaire from "../ChampFormulaire";
import Bouton from "@/components/utils/Bouton";
import { useRouter } from "next/router";
import { messageResolver } from "@/constantes/messagesFormulaires";
import SelectClients from "@/services/sql/client/sqlSelectClients";
import storeGetMail from "@/methodes/localStorage/storeGetMail";
import comparerSync from "@/methodes/cryptage/compareSync";
import crypterSync from "@/methodes/cryptage/crypterSync";
import sqlUpdateMDP from "@/services/sql/client/sqlUpdateMDP";

const FormReinitialiserMDP = () => {
  useEffect(() => {
    setValue("mail", storeGetMail() || "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const router = useRouter();

  const ReinitSchema = yup.object({
    mail: yup.string().required("Le champ est obligatoire.").email("La saisie ne correspond pas à une adresse mail."),
    cleEnvoyeAVotreAdresseMail: yup.string().required("Le champ est obligatoire."),
    motDePasse: yup
      .string()
      .required(messageResolver.champObligatoire)
      .min(5, "Mot de passe trop court")
      .max(100, "Mot de passe trop long"),
    confirmationDuMotDePasse: yup
      .string()
      .required("Vous devez confirmer votre mot de passe")
      .oneOf([yup.ref("motDePasse"), "null"], "Passwords must match"),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ReinitSchema),
    mode: "onSubmit",
  });

  async function submit(values: any) {
    if (comparerSync(values.cleEnvoyeAVotreAdresseMail, localStorage.getItem("reinit") as string)) {
      const mdpCrypter = crypterSync(values.motDePasse);
      const client = await SelectClients(`mail = '${values.mail}'`);
      const id = client[0].client_id;
      await sqlUpdateMDP(`mdp = '${mdpCrypter}'`, `client_id = ${id}`);
      localStorage.removeItem("reinit");
      return await fetch("/api/envoyerMail", {
        method: "POST",
        body: JSON.stringify({
          destinataire: ``,
          email: values.mail,
          subject: "Réinitialisation de votre mot de passe réussi",
          message: `Votre mot de passe a bien été modifié.`,
        }),
      }).then((res) => {
        if (res.status === 200) {
          router.replace("/login");
          alert("Votre mot de passe à bien été modifier");
        } else {
          alert("Une erreur est survenue veuillez réessayer plus tard");
        }
      });
    } else {
      alert(`La cle ne corespond pas à celle envoyer sur la boite mail ${values.mail}`);
    }
  }

  const listeChamps = [
    {
      label: "Cle envoyé à votre adresse mail",
      type: "text",
      optionel: false,
    },
    {
      label: "Mot de passe",
      type: "password",
      optionel: false,
    },
    {
      label: "Confirmation du mot de passe",
      optionel: false,
      type: "password",
    },
  ];
  if (localStorage.getItem("reinit")) {
    return (
      <form onSubmit={handleSubmit(submit)}>
        <ChampFormulaire label={"Mail"} register={register} typeChamp={"email"} disabled={true} />
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
        <Bouton label={"Envoyer"}></Bouton>
      </form>
    );
  } else {
    router.replace("/");
  }
};

export default FormReinitialiserMDP;
