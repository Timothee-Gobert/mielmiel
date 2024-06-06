import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import ChampFormulaire from "../ChampFormulaire";
import useMobile from "@/hooks/useMobile";
import storeGetCompte from "@/methodes/localStorage/storeGetCompte";
import sqlSelectAdresse from "@/services/sql/client/sqlSelectAdresse";
import { useEffect, useState } from "react";

const FormCommande = ({ setActiveStep }: any) => {
  useEffect(() => {
    const compte = storeGetCompte();

    if (localStorage.getItem("mailCommande")) {
      setValue("mail", localStorage.getItem("mailCommande") as string);
      setValue("nom", localStorage.getItem("nomCommande") as string);
      setValue("prenom", localStorage.getItem("prenomCommande") as string);
      setValue("nDeTelephone", localStorage.getItem("telCommande") as string);
      setValue("adresseComplete", localStorage.getItem("adresseCommande") as string);
      setValue("complementDadresse", localStorage.getItem("complementCommande") as string);
      setValue("codePostal", localStorage.getItem("codePostalCommande") as any);
      setValue("commune", localStorage.getItem("communeCommande") as string);
    } else {
      if (compte) {
        setValue("mail", compte.mail);
        setValue("nom", compte.nom);
        setValue("prenom", compte.prenom);
        setValue("nDeTelephone", compte.numero_telephone);
        setValue("adresseComplete", " ");
        setValue("complementDadresse", " ");
        setValue("codePostal", 0);
        setValue("commune", " ");
        sqlSelectAdresse(`adresse_id = ${compte.adresse_id}`).then((res: any) => {
          setValue("adresseComplete", res[0].adresse_complete);
          setValue("complementDadresse", res[0].complement_adresse || "");
          setValue("codePostal", res[0].code_postal);
          setValue("commune", res[0].commune);
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const CommandeSchema = yup.object({
    mail: yup.string().email("La saisie ne correspond pas à une adresse mail.").required("Le champ est obligatoire."),
    nom: yup.string().required("Le champ est obligatoire."),
    prenom: yup.string().required("Le champ est obligatoire."),
    nDeTelephone: yup.string(),
    adresseComplete: yup.string().required("Le champ est obligatoire."),
    complementDadresse: yup.string(),
    codePostal: yup
      .number()
      .typeError("Valeur numérique.")
      .integer("Code postal non valide")
      .min(1000, "Code postal non valide")
      .max(99999, "Code postal non valide")
      .required("Le champ est obligatoire."),
    commune: yup.string().required("Le champ est obligatoire."),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(CommandeSchema),
    mode: "onSubmit",
  });

  function submit(values: any) {
    localStorage.setItem("mailCommande", values.mail);
    localStorage.setItem("nomCommande", values.nom);
    localStorage.setItem("prenomCommande", values.prenom);
    localStorage.setItem("telCommande", values.nDeTelephone);
    localStorage.setItem("adresseCommande", values.adresseComplete);
    localStorage.setItem("complementCommande", values.complementDadresse);
    localStorage.setItem("codePostalCommande", values.codePostal);
    localStorage.setItem("communeCommande", values.commune);
    setActiveStep((prevActiveStep: any) => prevActiveStep + 1);
  }
  const listeChamps = [
    { label: "Nom", type: "text", optionel: false },
    { label: "Prénom", type: "text", optionel: false },
    {
      label: "N° de téléphone",
      type: "tel",
      optionel: true,
    },
    {
      label: "Adresse complète",
      type: "text",
      optionel: false,
    },
    {
      label: "Complement d'adresse",
      type: "text",
      optionel: true,
    },
    {
      label: "Code Postal",
      type: useMobile() ? "number" : "text",
      optionel: false,
    },
    { label: "Commune", type: "text", optionel: false },
  ];

  return (
    <form onSubmit={handleSubmit(submit)}>
      <ChampFormulaire label={"Mail"} register={register} optionel={false} typeChamp={"text"} errors={errors} />
      {listeChamps.map((champ, index) => {
        return (
          <ChampFormulaire
            key={index}
            label={champ.label}
            register={register}
            optionel={champ.optionel}
            typeChamp={champ.type}
            errors={errors}
          />
        );
      })}
      <button hidden={true} id={"coordonnees"}></button>
    </form>
  );
};

export default FormCommande;
