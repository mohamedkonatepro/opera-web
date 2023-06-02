import StepFooter from "../common/stepper/StepFooter";
import StepFooterEstimate from "../common/stepper/StepFooterEstimate";
import { StepDefinition } from "../common/stepper/types";
import SelectServices from "../common/form/selectServices";
import InformationEstimateForm from "./form/informationEstimate";

export const steps: StepDefinition[] = [
  {
    id: "services",
    label: "Services",
    title: "Services et options de mon devis",
    description:
      "Une fois votre sélection terminée, passez à l'étape suivante.",
    form: SelectServices,
    footer: StepFooter,
  },
  {
    id: "informationEstimate",
    label: "Informations sur le devis",
    title: "Informations sur le devis",
    description:
      "Renseignez les informations suivantes pour faire la demande de devis.",
    form: InformationEstimateForm,
    footer: StepFooterEstimate,
  },
];
