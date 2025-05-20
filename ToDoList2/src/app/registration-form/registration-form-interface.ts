import { FormControl } from "@angular/forms";

export interface RegistrationDetails {
    firstName: string;
    lastName: string;
    emailAddress: string;
    password: string;
    repPassword: string;
    dob: Date;
}

export interface RegistrationForm {
    firstName: FormControl<string>;
    lastName: FormControl<string>;
    emailAddress: FormControl<string>;
    password: FormControl<string>;
    confirmPassword: FormControl<string>;
    dob: FormControl<string>;
}

