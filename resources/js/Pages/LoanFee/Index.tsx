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

const Index = ({
    auth,
    loanFees,
}: PageProps<{ loanFees: LoanFee[] }>) => {
   
    return (
        <Authenticated user={auth.user}>
            <Head title="Loan Product" />

            <section>
                <div>
                    <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                        Loan Products
                    </h2>
                </div>
                <div className="w-full grid md:grid-cols-2 items-center gap-4 pb-5">
                    <Input
                        type="search"
                        name="search"
                        className="max-w-sm"
                        placeholder="Search..."
                    />

                    <div className="flex md:justify-end">
                        <CreateLoanFee />
                    </div>
                </div>
                <div className="border border-gray-200 rounded-md">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>#</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Fee Type</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Fee Amount</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loanFees.map((loanFee, index) => (
                                <TableRow>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{loanFee.category}</TableCell>
                                    <TableCell>
                                        {loanFee.fee_type}
                                    </TableCell>
                                    <TableCell>
                                        {loanFee.desc}
                                    </TableCell>
                                    <TableCell>
                                        {formatNumber(loanFee.fee_amount)}
                                    </TableCell>
                                    <TableCell className="flex gap-2 items-center">
                                        <EditLoanFee loanFee={loanFee} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </section>
        </Authenticated>
    );
};

export default Index;
