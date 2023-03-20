interface RealEstate {
  Address: string;
  Suite: string;
  CP: string;
  Ville: string;
  libelle: string;
  Type: string;
  nbpiece: number;
  superficie: string;
  etage: string;
  code: string;
  meuble: boolean;
  numeroImmeuble?: string;
  numeroLot?: string;
  numeroMandat?: string;
  numeroBail?: string;
  proprietaire?: string;
  cave: boolean;
  grenier: boolean;
  parking: boolean;
  garage: boolean;
  numeroImmeuble: string;
  numeroLot: string;
  numeroMandat: string;
  numeroBail: string;
  proprietaire: string;
}

export default RealEstate;
