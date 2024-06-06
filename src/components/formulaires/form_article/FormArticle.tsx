import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import ChampFormulaire from "../ChampFormulaire";
import Bouton from "@/components/utils/Bouton";
import CheckIcon from "@mui/icons-material/Check";
import UpdateArticle from "@/services/sql/article/sqlUpdateArticle";
import { DataType } from "@/components/admin/GestionArticle";
import sqlInsertArticle from "@/services/sql/article/sqlInsertArticle";
import { changementEtat } from "@/redux/utilsSlice";
import { useDispatch } from "react-redux";

const FormArticle = ({ article }: { article: DataType }) => {
  const dispatch = useDispatch();

  const ArticleSchema = yup.object({
    type: yup.string().required("Le champ est obligatoire."),
    designation: yup.string(),
    poids: yup.number().min(0, "Valeur positives").typeError("Valeur numérique.").integer("Pas de virgule"),
    prix: yup.number().min(0, "Valeur positives").typeError("Valeur numérique."),
    annee: yup.number().typeError("Valeur numérique.").integer("Pas de virgule").max(3000, "Ok Fouadou du future"),
    quantite: yup.number().typeError("Valeur numérique.").integer("pas de virgule").min(0, "Valeur positives"),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ArticleSchema),
    mode: "onSubmit",
  });

  setValue("type", article.type);
  setValue("designation", article.designation);
  setValue("poids", article.poids);
  setValue("prix", article.prix);
  setValue("annee", article.annee_production);
  setValue("quantite", article.quantite);

  async function submit(values: any) {
    if (article.article_id === 0) {
      await sqlInsertArticle(
        `type, designation, poids, prix, annee_production, quantite`,
        `'${values.type}' , '${values.designation}', '${values.poids}', '${values.prix}', '${values.annee}', '${values.quantite}'`
      );
    } else {
      await UpdateArticle(
        `type = '${values.type}', designation = '${values.designation}', poids = '${values.poids}', prix = '${values.prix}', annee_production = '${values.annee}', quantite = '${values.quantite}' `,
        `article_id = '${article.article_id}' `
      );
    }
    dispatch(changementEtat());
  }

  const listeChamps = [
    { label: "Type", type: "text", optionel: false },
    { label: "Désignation", type: "text", optionel: false },
    {
      label: "Poids",
      type: "number",
      optionel: true,
    },
    {
      label: "Prix",
      type: "text",
      optionel: false,
    },
    {
      label: "Année",
      type: "text",
      optionel: true,
    },
    {
      label: "Quantité",
      type: "number",
      optionel: false,
    },
  ];

  return (
    <form onSubmit={handleSubmit(submit)}>
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
      <Bouton label={"Valider"}>
        <CheckIcon />
      </Bouton>
    </form>
  );
};

export default FormArticle;
