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
import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";
import AddLoanCategoryFee from "./AddLoanCategoryFee";

const LoanCategoryFees = ({
    loanProducts,
}: {
    loanProducts: LoanProduct[];
}) => {
    return (
        <div className="grid gap-8">
            {loanProducts.map((loanProduct, index) => (
                <div>
                    <div className="flex justify-between gap-4 items-center">
                        <h3 className="text-xl my-3">
                            <span className="bg-green-400 text-slate-900 p-2">
                                {index + 1}.
                            </span>{" "}
                            {loanProduct.name}
                        </h3>
                        <AddLoanCategoryFee loanCategory={loanProduct} />
                    </div>
                    <div className="border border-gray-200 dark:border-gray-700 rounded-md">
                        <Table>
                            <TableHeader>
                                <TableHead>#</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Fee Type</TableHead>
                                <TableHead>Fee Amount</TableHead>
                                <TableHead></TableHead>
                            </TableHeader>
                            <TableBody>
                                {loanProduct?.loan_category_fees?.length ? (
                                    loanProduct?.loan_category_fees?.map(
                                        (loanCategoryFee, index) => (
                                            <TableRow>
                                                <TableCell>
                                                    {index + 1}
                                                </TableCell>
                                                <TableCell>
                                                    {loanCategoryFee.desc}
                                                </TableCell>
                                                <TableCell>
                                                    {loanCategoryFee.fee_type}
                                                </TableCell>
                                                <TableCell>
                                                    {formatNumber(
                                                        loanCategoryFee.fee_amount
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    <EditLoanCategoryFee
                                                        loanCategoryFee={loanCategoryFee}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        )
                                    )
                                ) : (
                                    <div className="w-full min-h-28 flex items-center justify-center">
                                        No fees available for this loan product.
                                    </div>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default LoanCategoryFees;
