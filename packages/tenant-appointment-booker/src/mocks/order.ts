import Order from "../types/order";
import RealEstate from "../types/realEstate";
import Tenant from "../types/tenant";

export const bien: RealEstate = {
  Address: "20 QUAI AUGAGNEUR",
  Suite: "LE FRAGORYNOM IMMEUBLE",
  CP: "69003",
  Ville: "LYON",
  libelle: "Appartement",
  Type: "T",
  nbpiece: 1,
  superficie: "120",
  etage: "RDC ET 1ER",
  code: "1234",
  meuble: false,
  numeroImmeuble: "0001",
  numeroLot: "0001",
  numeroMandat: "",
  numeroBail: "0001",
  proprietaire: "MR HUMBERT",
  cave: true,
  grenier: false,
  parking: true,
  garage: true,
};

export const locataire: Tenant = {
  name: "MR DUCROS",
  phoneNumber: "07.78.31.83.69",
  email: "vincent.metton@thetribe.io",
  type: "Sortant",
};

const order: Order = {
  orderId: "405560",
  RDV: "585539",
  familleInitial: "EDL",
  famille: "Etat des lieux",
  familleLongue: "Etat des lieux de sortie",
  type: "S",
  services: ["Etat des lieux de sortie"],
  address: "20 QUAI AUGAGNEUR, 69003 LYON",
  bien: bien,
  commercialName: "REGIE TESTDDDD",
  commercialPhoneNumber: "04 37 65 16 16",
  desiredDateByContractor: "2023-03-23",
  minimumDate: "2023-03-18",
  maximumDate: "2023-03-23",
  locataires: [locataire],
  emails: [
    "vincent.metton@thetribe.io",
    "noemie.jarrijou@opera-groupe.fr",
    "abderrahmen.briki@opera-groupe.fr",
    "nejib.hamandi@opera-groupe.fr",
  ],
  operaGroupePhoneNumber: "commande-edl-diag@opera-groupe.fr",
  operaGroupeEmail: "04.37.65.16.16",
};

export default order;
