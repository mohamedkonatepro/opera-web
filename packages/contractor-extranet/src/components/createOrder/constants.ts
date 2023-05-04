import { StepDefinition } from "../common/stepper/types";
import AppointmentForm from "./forms/appointment";
import ContactForm from "./forms/contact";
import RealEstateForm from "./forms/realEstate";
import SelectServices from "./forms/selectServices";

export const steps: StepDefinition[] = [
  {
    id: "services",
    label: "Services",
    title: "Services et options de ma commande",
    description:
      "Une fois votre sélection terminée, passez à l'étape suivante.",
    form: SelectServices,
  },
  {
    id: "contacts",
    label: "Informations de contact",
    title: "Informations de contact",
    description:
      "Une fois votre sélection terminée, passez à l’étape suivante.",
    form: ContactForm,
  },
  {
    id: "realEstate",
    label: "Informations du bien",
    title: "Informations du bien",
    description:
      "Une fois votre sélection terminée, passez à l’ étape suivante.",
    form: RealEstateForm,
  },
  {
    id: "appointment",
    label: "Rendez-vous",
    title: "Rendez-vous",
    description:
      "Une fois votre sélection terminée, passez à l’étape suivante.",
    form: AppointmentForm,
  },
];
