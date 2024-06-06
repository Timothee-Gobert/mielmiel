import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ChampFormulaire from "../ChampFormulaire";
import SendIcon from "@mui/icons-material/Send";
import Bouton from "@/components/utils/Bouton";

const FormContact = () => {
  const ContactSchema = yup.object({
    mail: yup.string().required("Le champ est obligatoire.").email("La saisie ne correspond pas à une adresse mail."),
    nom: yup.string().required("Le champ est obligatoire."),
    prenom: yup.string().required("Le champ est obligatoire."),
    sujet: yup.string().required("Le champ est obligatoire."),
    message: yup.string().required("Le champ est obligatoire."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      mail: "",
    },
    resolver: yupResolver(ContactSchema),
    mode: "onSubmit",
  });

  function submit(values: any) {
    return;
  }
  const listeChampsNom = [
    { label: "Nom", type: "text", optionel: false, largeur: "46%" },
    { label: "Prénom", type: "text", optionel: false, largeur: "46%" },
  ];

  return (
    <form style={{ display: "flex", flexDirection: "column", width: "800px" }} onSubmit={handleSubmit(submit)}>
      <ChampFormulaire label={"Mail"} register={register} optionel={false} typeChamp={"text"} errors={errors} />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {listeChampsNom.map((champ, index) => {
          return (
            <ChampFormulaire
              key={index}
              label={champ.label}
              register={register}
              optionel={champ.optionel}
              typeChamp={champ.type}
              errors={errors}
              largeur={champ.largeur}
            />
          );
        })}
      </div>
      <ChampFormulaire label={"sujet"} register={register} optionel={false} typeChamp={"text"} errors={errors} multiline={true} />
      <ChampFormulaire
        label={"Message"}
        register={register}
        optionel={false}
        typeChamp={"text"}
        errors={errors}
        multiline={true}
      />
      <Bouton
        style={{
          width: "200px",
          display: "flex",
          flexDirection: "row-reverse",
          justifyContent: "space-evenly",
        }}
        label={"Envoyer"}
      >
        <SendIcon />
      </Bouton>
    </form>
  );
};

export default FormContact;
