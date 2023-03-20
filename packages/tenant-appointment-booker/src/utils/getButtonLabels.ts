import TenantRequestProps from "@/types/tenantResquestProps";

const getButtonLabels = (tenantRequest: TenantRequestProps) => {
  let accepted = {
    primary: "Confirmation l’annulation de la commande",
    secondary: "Le locataire sera notifié et la commande, supprimée.",
  };

  let denied = {
    primary: "Refuser l’annulation de la commande",
    secondary: "Le locatiare sera notifié et la commande, conservée.",
  };

  if (tenantRequest?.desired_date) {
    accepted = {
      primary: "Confirmer le changement de date",
      secondary:
        "Le locataire recevra un lien afin de prendre RDV à la nouvelle date souhaitée.",
    };

    denied = {
      primary: "Refuser le changement de date",
      secondary: "Le locataire sera notifié de votre refus.",
    };
  }

  return { accepted, denied };
};

export { getButtonLabels };
