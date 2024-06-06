import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import ChampFormulaire from "../ChampFormulaire";
import { useEffect } from "react";
import { messageResolver } from "@/constantes/messagesFormulaires";
import Bouton from "@/components/utils/Bouton";
import storeGetMail from "@/methodes/localStorage/storeGetMail";
import storeGetCompte from "@/methodes/localStorage/storeGetCompte";
import sqlUpdateClient from "@/services/sql/client/sqlUpdateClient";

const FormInformations = () => {
  const InformationsSchema = yup.object({
    mail: yup.string().required(messageResolver.champObligatoire).email("La saisie ne correspond pas à une adresse mail."),
    nom: yup.string().required(messageResolver.champObligatoire),
    prenom: yup.string().required(messageResolver.champObligatoire),
    nDeTelephone: yup.string(),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(InformationsSchema),
  });

  useEffect(() => {
    if (storeGetCompte()) {
      const info = storeGetCompte();
      setValue("nom", info.nom);
      setValue("prenom", info.prenom);
      setValue("nDeTelephone", info.numero_telephone);
    }
    setValue("mail", storeGetMail() || "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function submit(values: any) {
    const info = storeGetCompte();
    await sqlUpdateClient(
      `nom = '${values.nom}', prenom = '${values.prenom}', numero_telephone = '${values.nDeTelephone}'`,
      `client_id = ${info.client_id}`
    );
  }

  const listeChamps = [
    { label: "Nom", type: "text", optionel: false },
    { label: "Prénom", type: "text", optionel: false },
    {
      label: "N° de téléphone",
      type: "text",
      optionel: true,
    },
  ];

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
      <Bouton label={"Modifier"}></Bouton>
    </form>
  );
};

export default FormInformations;
