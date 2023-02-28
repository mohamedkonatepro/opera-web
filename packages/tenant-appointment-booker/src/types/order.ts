interface Order {
    orderId: string;
    RDV: string | null;
    famille: string;
    familleLongue: string;
    services: string[];
    in_out: number;
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
        meuble: number;
        cave: boolean;
        grenier: boolean;
        parking: boolean;
        garage: boolean;
    };
    commercialName: string;
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
