import { LoanProduct } from "./schemas";

export interface LoanCategoryFee {
    id: number;
    company_id: number;
    loan_fee_id: number;
    loan_category: LoanProduct;
    loan_category_id: number;
    fee_type: string;
    fee_amount: number;
    desc: string;
}