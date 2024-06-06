import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import ChampFormulaire from "../ChampFormulaire";
import { useEffect, useState } from "react";
import { messageResolver } from "@/constantes/messagesFormulaires";
import Bouton from "@/components/utils/Bouton";
import storeGetCompte from "@/methodes/localStorage/storeGetCompte";
import sqlSelectAdresse from "@/services/sql/client/sqlSelectAdresse";
import sqlInsertAdresse from "@/services/sql/client/sqlInsertAdresse";
import sqlUpdateClient from "@/services/sql/client/sqlUpdateClient";

const FormAdresse = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    setValue("adresseComplete", " ");
    setValue("complementDadresse", "");
    setValue("codePostal", " ");
    setValue("commune", " ");
    async function recupAdresse(info: any) {
      const reponseAPI: any = await sqlSelectAdresse(`adresse_id = ${info.adresse_id}`);

      setValue("adresseComplete", reponseAPI[0].adresse_complete);
      setValue("complementDadresse", reponseAPI[0].complement_adresse || "");
      setValue("codePostal", reponseAPI[0].code_postal);
      setValue("commune", reponseAPI[0].commune);
    }
    const info = storeGetCompte();
    recupAdresse(info);
    //
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const AdresseSchema = yup.object({
    adresseComplete: yup.string().required(messageResolver.champObligatoire),
    complementDadresse: yup.string(),
    codePostal: yup.string().required(messageResolver.champObligatoire),
    commune: yup.string().required(messageResolver.champObligatoire),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(AdresseSchema),
  });

  async function submit(values: any) {
    const compte = storeGetCompte();
    const idAdresse = await sqlInsertAdresse(
      `adresse_complete, complement_adresse, code_postal, commune`,
      `'${values.adresseComplete}', '${values.complementDadresse}', '${values.codePostal}', '${values.commune}'`
    );

    await sqlUpdateClient(`adresse_id = ${idAdresse}`, `client_id = ${compte.client_id}`);
  }

  const listeChamps = [
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
      <Bouton label={"Modifier mon adresse"}></Bouton>
    </form>
  );
};

export default FormAdresse;
