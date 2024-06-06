import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ChampFormulaire from "../ChampFormulaire";
import { messageResolver } from "@/constantes/messagesFormulaires";
import sqlVerifierSiEmailExiste from "@/services/sql/client/sqlVerifierSiEmailExiste";
import Bouton from "@/components/utils/Bouton";
import SelectClients from "@/services/sql/client/sqlSelectClients";
import { useRouter } from "next/router";
import { changementEtat } from "@/redux/utilsSlice";
import { useDispatch } from "react-redux";
import storeSetMail from "@/methodes/localStorage/storeSetMail";
import storeGetMail from "@/methodes/localStorage/storeGetMail";
import comparerSync from "@/methodes/cryptage/compareSync";

const FormLogin = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    setValue("mail", storeGetMail() || "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const LoginSchema = yup.object({
    mail: yup.string().required(messageResolver.champObligatoire).email("La saisie ne correspond pas à une adresse mail."),
    motDePasse: yup
      .string()
      .required("Le mot de passe est obligatoire")
      .min(3, "Mot de passe trop court")
      .max(100, "Mot de passe trop long"),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginSchema),
    mode: "onSubmit",
  });

  async function submit(values: any) {
    const reponseAPI: any = await SelectClients(`mail = '${values.mail}'`);
    const validation = comparerSync(values.motDePasse, reponseAPI[0].mdp);
    if (validation) {
      localStorage.setItem("compte", JSON.stringify(reponseAPI[0]));
      alert(`Bienvenue ${reponseAPI[0].prenom} sur le site des Miels Gobert`);
      dispatch(changementEtat());
      await router.push("/");
    } else {
      alert("Mot de passe invalide");
    }
  }
  return (
    <form onSubmit={handleSubmit(submit)}>
      <ChampFormulaire
        errors={errors}
        label={"Mail"}
        optionel={false}
        register={register}
        methodeOnBlur={async (e: any) => {
          const reponse = await sqlVerifierSiEmailExiste(e.target.value);
          !reponse && alert("Auncun compte existe avec cette adresse mail");
          storeSetMail(e.target.value);
        }}
        typeChamp={"email"}
      />
      <ChampFormulaire errors={errors} label={"Mot de passe"} register={register} typeChamp={"password"} optionel={false} />
      <Bouton label={"Se connecter"}></Bouton>
    </form>
  );
};

export default FormLogin;
