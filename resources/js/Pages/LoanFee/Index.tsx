import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { PageProps } from "@/types";
import { Head, router } from "@inertiajs/react";
import { LoanFee, LoanProduct } from "@/lib/schemas";
import { formatNumber } from "@/lib/utils";
import CreateLoanFee from "./actions/CreateLoanFee";
import EditLoanFee from "./actions/EditLoanFee";
import { Edit, KeyRoundIcon } from "lucide-react";
import ChangeCategory from "./actions/ChangeCategory";
import LoanCategoryFees from "./actions/LoanCategoryFees";
import CreateLoanFeeByGeneral from "./actions/CreateLoanFeeByGeneral";

const Index = ({
    auth,
    loanFees,
    loanProducts,
}: PageProps<{ loanFees: LoanFee[]; loanProducts: LoanProduct[] }>) => {
    console.log(loanProducts);

    return (
        <Authenticated user={auth.user}>
            <Head title="Loan Product" />

            <section className="bg-white p-5 rounded-md md:shadow-lg">
                <div>
                    <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                        Loan Fee
                    </h2>
                </div>
                <div className="w-full flex items-center gap-4 pb-5">
                    {loanFees.length && (
                        <ChangeCategory loanFee={loanFees[0]} />
                    )}

                    {loanFees.length && loanFees[0].category == "general" && (
                        <CreateLoanFeeByGeneral />
                    )}

                    {loanFees.length < 1 && <CreateLoanFee />}
                </div>
                {loanFees.length && (
                    <div className=" rounded-md">
                        {loanFees[0].category == "general" ? (
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
                                        {loanFees.length ? (
                                            loanFees.map((loanFee, index) => (
                                                <TableRow>
                                                    <TableCell>
                                                        {index + 1}
                                                    </TableCell>
                                                    <TableCell>
                                                        {loanFee.desc}
                                                    </TableCell>
                                                    <TableCell>
                                                        {loanFee.fee_type}
                                                    </TableCell>
                                                    <TableCell>
                                                        {formatNumber(
                                                            loanFee.fee_amount
                                                        )}
                                                    </TableCell>
                                                    <TableCell>
                                                        <EditLoanFee
                                                            loanFee={loanFee}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <div className="w-full min-h-28 flex items-center justify-center">
                                                No fees available for this loan
                                                product.
                                            </div>
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        ) : (
                            <LoanCategoryFees loanProducts={loanProducts} />
                        )}
                    </div>
                )}
            </section>
        </Authenticated>
    );
};

export default Index;
