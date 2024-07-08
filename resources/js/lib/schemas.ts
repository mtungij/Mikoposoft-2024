import { LoanCategoryFee } from "./fee-schema";

export interface LoanProduct {
    id: number;
    company_id: number;
    loan_category_fees: LoanCategoryFee[];
    name: string;
    from: number;
    to: number;
    interest: number;
    penalt_type: string;
    penalt_amount: number;
    fee: number;
}

export interface Formula {
    id: number;
    company_id: number;
    name: string;
}

export interface LoanFee {
    id: number;
    company_id: number;
    category: string;
    fee_type: string;
    desc: string;
    fee_amount: number;
}

export interface Transaction {
    id: number;
    company_id: number;
    name: string;
    created_at: string;
}

export interface Region {
    id: number;
    name: string;
}

export interface Branch {
    id: number;
    region_id: number;
    company_id: number;
    name: string;
    region: Region;
    phone: string;
    email: string;
    status: string;
}
