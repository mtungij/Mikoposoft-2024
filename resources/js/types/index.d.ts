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

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
    ziggy: Config & { location: string };
};

