export interface LoanProduct {
    id: number;
    company_id: number;
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
