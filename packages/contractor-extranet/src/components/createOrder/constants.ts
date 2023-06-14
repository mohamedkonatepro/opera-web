import StepFooter from "../common/stepper/StepFooter";
import StepFooterAppointment from "../common/stepper/StepFooterAppointment";
import { StepDefinition } from "../common/stepper/types";
import AppointmentForm from "./forms/appointment";
import ContactForm from "./forms/contact";
import RealEstateForm from "./forms/realEstate";
import SelectServices from "../common/form/selectServices";

export const steps: StepDefinition[] = [
  {
    id: "services",
    label: "Services",
    title: "Services et options de ma commande",
    description:
      "Une fois votre sélection terminée, passez à l'étape suivante.",
    form: SelectServices,
    footer: StepFooter,
  },
  {
    id: "contacts",
    label: "Informations de contact",
    title: "Informations de contact",
    description:
      "Une fois votre sélection terminée, passez à l’étape suivante.",
    form: ContactForm,
    footer: StepFooter,
  },
  {
    id: "realEstate",
    label: "Informations du bien",
    title: "Informations du bien",
    description:
      "Une fois votre sélection terminée, passez à l’ étape suivante.",
    form: RealEstateForm,
    footer: StepFooter,
  },
  {
    id: "appointment",
    label: "Rendez-vous",
    title: "Rendez-vous",
    description:
      "Une fois votre sélection terminée, passez à l’étape suivante.",
    form: AppointmentForm,
    footer: StepFooterAppointment,
  },
];

export const MIN_SURFACE_FOR_ESTIMATE = 250;
