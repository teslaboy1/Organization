export interface MvCustomer {
    customerId: number;
    organizationName: string;
    city: string;
    email: string;
    phone: string;
    insertPersonId: number;
}

export interface MvAddCustomer {
    organizationName: string;
    city: string;
    email: string;
    phone: string;
    insertPersonId: number;
}
