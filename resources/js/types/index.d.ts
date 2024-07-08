import { Config } from "ziggy-js";

export interface Company {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    logo_url: string;
}

export interface Branch {
    id: number;
    company: Company;
    name: string;
    email: string;
    phone: string;
    address: string;
}

export interface User {
    id: number;
    company_id: number;
    company: Company;
    branch_id: number;
    branch: Branch;
    name: string;
    email: string;
    phone: string;
    position: string;
    gender: string;
    account: string;
    account_number: string;
    status: string;
    salary: number;
    email_verified_at: string;
}

export interface customer{
    id: number;
    user: User;
    branch: Branch;
    c_number: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    phone: string;
    ward: string;
    street: string;
    id_type: string;
    id_number:number;
    nick_name: string;
    status:string;
    marital_status: string;
    working_status: string;
    business_type: string;
    business_location:string;
    monthly_income: number;
    account_type: string;
    img_url: string;
    full_name: string;
    created_at: string;
    
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
    ziggy: Config & { location: string };
    error: string;
    success: string;
};

