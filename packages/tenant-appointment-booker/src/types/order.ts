import RealEstate from "./realEstate";
import Tenant from "./tenant";

interface Order {
    orderId: string;
    RDV: string | null;
    famille: string;
    familleInitial: string;
    familleLongue: string;
    services: string[];
    type: string;
    address: string;
    bien: {
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
        cave: boolean;
        grenier: boolean;
        parking: boolean;
        garage: boolean;
    };
    commercialName: string;
    commercialPhoneNumber: string;
    desiredDateByContractor: string;
    minimumDate: string;
    maximumDate: string;
    locataires: {
        name: string;
        phoneNumber: string;
        email: string;
        type: string;
    }[];
    emails: string[];
    operaGroupePhoneNumber: string;
    operaGroupeEmail: string;
}

export default Order;
