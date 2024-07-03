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
import { Edit } from "lucide-react";
import React from "react";
import { useDebouncedCallback } from "use-debounce";
import { DeleteUser } from "../Employees/partials/Deleteuser";
import { LoanProduct } from "@/lib/schemas";
import { CreateLoanProduct } from "./partials/CreateLoanProduct";
import { formatNumber } from "@/lib/utils";
import { EditLoanProduct } from "./partials/EditLoanProduct";

const Index = ({
    auth,
    loanProducts,
}: PageProps<{ loanProducts: LoanProduct[] }>) => {
    const searchLoanProduct = useDebouncedCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            if (event.target.value === "") {
                router.visit(route("loan-products.index"));
            } else {
                router.visit(
                    route("loan-products.index", {
                        search: event.target.value,
                    }),
                    {
                        preserveState: true,
                    }
                );
            }
        },
        1000
    );
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
                        onChange={searchLoanProduct}
                    />

                    <div className="flex md:justify-end">
                        <CreateLoanProduct />
                    </div>
                </div>
                <div className="border border-gray-200 rounded-md">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>#</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Minimum</TableHead>
                                <TableHead>Maximum</TableHead>
                                <TableHead>Interest</TableHead>
                                <TableHead>Penalt Type</TableHead>
                                <TableHead>Penalt Amount</TableHead>
                                <TableHead>Loan Fee</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loanProducts.map((loanProduct, index) => (
                                <TableRow>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{loanProduct.name}</TableCell>
                                    <TableCell>
                                        {formatNumber(loanProduct.from)}
                                    </TableCell>
                                    <TableCell>
                                        {formatNumber(loanProduct.to)}
                                    </TableCell>
                                    <TableCell>
                                        {loanProduct.interest}%
                                    </TableCell>
                                    <TableCell>{loanProduct.penalt_type}</TableCell>
                                    <TableCell>{loanProduct.penalt_amount}</TableCell>
                                    <TableCell>{loanProduct.fee}</TableCell>
                                    <TableCell className="flex gap-2 items-center">
                                        <EditLoanProduct
                                            loanProduct={loanProduct}
                                        />
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
