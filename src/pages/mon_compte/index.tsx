import FormAdresse from "@/components/formulaires/form_mon_compte/FormAdresse";
import FormInformations from "@/components/formulaires/form_mon_compte/FormInformations";
import FormMDP from "@/components/formulaires/form_mon_compte/FormMDP";
import React from "react";

const Coordonnees = () => {
  return (
    <>
      <div>
        <h1>Mon compte</h1>
      </div>
      <div>
        <h2>Mes informations</h2>
        <FormInformations />
      </div>
      <div>
        <h2>Mon adresse</h2>
        <FormAdresse />
      </div>
      <div>
        <h2>Changer mon mot de passe</h2>
        <FormMDP />
      </div>
    </>
  );
};

export default Coordonnees;
