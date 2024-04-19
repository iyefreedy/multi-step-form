export type PersonalInformation = {
    fullName: string;
    email: string;
    dateOfBirth: string;
};

export type AddressInformation = {
    streetAddress: string;
    city: string;
    state: string;
    zipCode: string;
};

export type AccountInformation = {
    username: string;
    password: string;
};

export interface FormStep {
    step: number;
    label: string;
}
