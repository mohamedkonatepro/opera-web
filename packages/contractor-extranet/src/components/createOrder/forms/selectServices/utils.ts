import { ServiceType } from "@/types/ServiceType"

export const getTextForEstimateDialog = (serviceType: ServiceType) => {
  if (serviceType.code === 'common_parts') {
    return 'Votre commande concerne des parties communes. Vous devez effectuer une demande de devis pour créer la commande.'
  }

  return "La surface de votre bien est supérieure à 250m². Vous devez effectuer une demande de devis pour créer la commande."
}
