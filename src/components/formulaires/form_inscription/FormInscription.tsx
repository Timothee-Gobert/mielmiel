import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import ChampFormulaire from "../ChampFormulaire";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { messageResolver } from "@/constantes/messagesFormulaires";
import sqlVerifierSiEmailExiste from "@/services/sql/client/sqlVerifierSiEmailExiste";
import Bouton from "@/components/utils/Bouton";
import sqlInsertAdresse from "@/services/sql/client/sqlInsertAdresse";
import storeSetMail from "@/methodes/localStorage/storeSetMail";
import storeGetMail from "@/methodes/localStorage/storeGetMail";
import crypterSync from "@/methodes/cryptage/crypterSync";
import sqlInsertClient from "@/services/sql/client/sqlInsertClient";

const FormInscription = () => {
  const router = useRouter();
  const InscriptionSchema = yup.object({
    mail: yup.string().required(messageResolver.champObligatoire).email("La saisie ne correspond pas à une adresse mail."),
    nom: yup.string().required(messageResolver.champObligatoire),
    prenom: yup.string().required(messageResolver.champObligatoire),
    nDeTelephone: yup.string(),
    adresseComplete: yup.string().required(messageResolver.champObligatoire),
    complementDadresse: yup.string(),
    codePostal: yup.string().required(messageResolver.champObligatoire),
    commune: yup.string().required(messageResolver.champObligatoire),
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
    mode: "onSubmit",
    resolver: yupResolver(InscriptionSchema),
  });

  useEffect(() => {
    setValue("mail", storeGetMail() || "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function submit(values: any) {
    const mdpCrypted = crypterSync(values.motDePasse);
    const idAdresse = await sqlInsertAdresse(
      `adresse_complete, complement_adresse, code_postal, commune`,
      `'${values.adresseComplete}', '${values.complementDadresse}', '${values.codePostal}', '${values.commune}'`
    );

    await sqlInsertClient(
      `nom, prenom, mail, numero_telephone, mdp, adresse_id`,
      `'${values.nom}', '${values.prenom}', '${values.mail}', '${values.nDeTelephone}', '${mdpCrypted}', ${idAdresse.insertId}`
    );

    storeSetMail(values.mail);
    router.replace("/login");
  }

  const onBlurMail = async (e: any) => {
    storeSetMail(e.target.value);
    const reponse = await sqlVerifierSiEmailExiste(e.target.value);
    if (reponse) {
      alert("Un compte existe déjà avec cette adresse mail");
      router.push("/login");
    }
  };

  const listeChamps = [
    { label: "Nom", type: "text", optionel: false },
    { label: "Prénom", type: "text", optionel: false },
    {
      label: "N° de téléphone",
      type: "text",
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
      type: "text",
      optionel: false,
    },
    { label: "Commune", type: "text", optionel: false },
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

  return (
    <form onSubmit={handleSubmit(submit)}>
      <ChampFormulaire label={"Mail"} register={register} methodeOnBlur={onBlurMail} typeChamp={"email"} />
      <p>Les informations serviront à faciliter vos futurs commandes</p>
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
      <Bouton label={"S'inscrire"}></Bouton>

      <p>(*) champs obligatoire</p>
    </form>
  );
};

export default FormInscription;
