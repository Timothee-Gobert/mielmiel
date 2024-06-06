import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ChampFormulaire from "../ChampFormulaire";
import Bouton from "@/components/utils/Bouton";
import { useRouter } from "next/router";
import { randomUUID } from "crypto";
import storeGetMail from "@/methodes/localStorage/storeGetMail";
import crypterSync from "@/methodes/cryptage/crypterSync";

const FormDemandeReinitialiserMDP = () => {
  useEffect(() => {
    setValue("mail", storeGetMail() || "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const router = useRouter();

  const DemandeReinitSchema = yup.object({
    mail: yup.string().required("Le champ est obligatoire.").email("La saisie ne correspond pas à une adresse mail."),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(DemandeReinitSchema),
    mode: "onSubmit",
  });

  async function submit(values: any) {
    let cle = crypto.randomUUID();
    const cleCrypter = crypterSync(cle);

    localStorage.setItem("reinit", `${cleCrypter}`);
    return await fetch("/api/envoyerMail", {
      method: "POST",
      body: JSON.stringify({
        destinataire: ``,
        email: values.mail,
        subject: "Réinitialisation de votre mot de passe",
        message: `Vous pouvez réinitialiser votre mot de passe grâce à cette cle : ${cle}`,
      }),
    }).then((res) => {
      if (res.status === 200) {
        router.replace("http://localhost:3000/login/reinitialiser_mdp/reinitialiserMDP");
        alert("une clé vous a été transmisse dans votre boite mail");
      } else {
        alert("Commande ko");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit(submit)}>
      <ChampFormulaire label={"Mail"} register={register} typeChamp={"email"} />
      <Bouton label={"Envoyer"}></Bouton>
    </form>
  );
};

export default FormDemandeReinitialiserMDP;
