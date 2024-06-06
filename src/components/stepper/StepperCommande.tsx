import React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";

const StepperCommande = ({ activeStep, setActiveStep }: any) => {
  const router = useRouter();
  const steps = ["Coordonnées", "Payment", "Récapitulatif"];

  const handleNext = () => {
    switch (activeStep) {
      case 0:
        document.getElementById("coordonnees")?.click();
        break;
      case 1:
        document.getElementById("payement")?.click();
        break;
      case 2:
        document.getElementById("validation")?.click();
        break;
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep: any) => prevActiveStep - 1);
  };

  const handleRetour = () => {
    router.replace("/");
  };

  return (
    <Box sx={{ margin: "auto", padding: "20px", width: "40%" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>Commande terminée</Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleRetour}>Retour à la page d&apos;accueil</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>Etape {activeStep + 1}</Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
              Retour
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />

            <Button onClick={handleNext}>{activeStep === steps.length - 1 ? "Valider" : "Suivant"}</Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
};
export default StepperCommande;
