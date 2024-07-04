import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { LoanProduct } from "@/lib/schemas";
import React from "react";
import { EditLoanCategoryFee } from "./EditLoanCategoryFee";
import { formatNumber } from "@/lib/utils";

const LoanCategoryFees = ({
    loanProducts,
}: {
    loanProducts: LoanProduct[];
}) => {
    return (
        <div>
            <Table>
                <TableHeader>
                    <TableHead>#</TableHead>
                    <TableHead>Loan Category</TableHead>
                    <TableHead>Loan Fee</TableHead>
                    <TableHead></TableHead>
                </TableHeader>
                <TableBody>
                    {loanProducts.map((loanProduct, index) => (
                        <TableRow>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{loanProduct.name}</TableCell>
                            <TableCell>{formatNumber(loanProduct.fee)}</TableCell>
                            <TableCell>
                               <EditLoanCategoryFee loanProduct={loanProduct} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default LoanCategoryFees;
