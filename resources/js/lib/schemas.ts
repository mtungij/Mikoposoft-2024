export interface LoanProduct {
    id: number;
    company_id: number;
    name: string;
    from: number;
    to: number;
    interest: number;
}

export interface LoanFee {
    id: number;
    company_id: number;
    category: string;
    fee_type: string;
    desc: string;
    fee_amount: number;
}
