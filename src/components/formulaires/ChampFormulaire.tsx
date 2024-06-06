import React from "react";
import { UseFormRegister } from "react-hook-form";
import { camelCase } from "lodash";
import TextField from "@mui/material/TextField";

type propsType = {
  label: string;
  register: UseFormRegister<any>;
  disabled?: boolean;
  optionel?: boolean;
  methodeOnBlur?: any;
  typeChamp?: string;
  errors?: any;
  largeur?: string;
  multiline?: boolean;
};

const ChampFormulaire = ({
  label,
  register,
  disabled,
  optionel,
  methodeOnBlur,
  typeChamp,
  errors,
  largeur,
  multiline,
}: propsType) => {
  const identifiantCritere = camelCase(label);
  return (
    <TextField
      multiline={multiline}
      error={errors && errors[identifiantCritere]}
      label={label + (optionel ? "" : "*")}
      {...register(identifiantCritere)}
      style={{ width: largeur, margin: "10px" }}
      type={typeChamp ? typeChamp : "text"}
      disabled={disabled ? true : false}
      onBlur={async (valeur) => {
        methodeOnBlur && methodeOnBlur(valeur);
      }}
      helperText={errors && errors[identifiantCritere] && errors[identifiantCritere].message}
    />
  );
};

export default ChampFormulaire;
