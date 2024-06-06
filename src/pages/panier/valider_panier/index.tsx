import FormCommande from "@/components/formulaires/form_commande/FormCommande";
import StepperCommande from "@/components/stepper/StepperCommande";
import React, { useState } from "react";
import Payement from "@/components/commande/Payement";
import Recapitulatif from "@/components/commande/Recapitulatif";

const Panier = () => {
  const [activeStep, setActiveStep] = useState(0);
  const afficherContenu = () => {
    switch (activeStep) {
      case 0:
        return <FormCommande setActiveStep={setActiveStep} />;
      case 1:
        return <Payement setActiveStep={setActiveStep} />;
      case 2:
        return <Recapitulatif />;
    }
  };
  return (
    <>
      <div>
        <h2>Validation panier</h2>
        <StepperCommande setActiveStep={setActiveStep} activeStep={activeStep} />
      </div>
      {afficherContenu()}
    </>
  );
};

export default Panier;
