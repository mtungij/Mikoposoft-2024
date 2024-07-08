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
import {
    BanIcon,
    BookmarkIcon,
    CheckCheck,
    Edit,
    SquareCheckBig,
} from "lucide-react";
import React from "react";
import { useDebouncedCallback } from "use-debounce";
import { DeleteUser } from "../Employees/partials/Deleteuser";
import { Branch, LoanProduct, Region } from "@/lib/schemas";
import { CreateBranch } from "./actions/CreateBranch";
import { Badge } from "@/components/ui/badge";

const Index = ({
    auth,
    branches,
    regions,
}: PageProps<{ branches: Branch[]; regions: Region[] }>) => {
    const searchBranch = useDebouncedCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            if (event.target.value === "") {
                router.visit(route("branches.index"));
            } else {
                router.visit(
                    route("branches.index", {
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
            <Head title="Branches" />

            <section className="bg-white p-5 rounded-md md:shadow-lg">
                <div>
                    <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                        Branches
                    </h2>
                </div>
                <div className="w-full grid md:grid-cols-2 items-center gap-4 pb-5">
                    <Input
                        type="search"
                        name="search"
                        className="max-w-sm"
                        placeholder="Search..."
                        onChange={searchBranch}
                    />

                    <div className="flex md:justify-end">
                        <CreateBranch regions={regions} />
                    </div>
                </div>
                <div className="border border-gray-200 dark:border-gray-700 rounded-md">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>#</TableHead>
                                <TableHead>Branch Name</TableHead>
                                <TableHead>Phone Number</TableHead>
                                <TableHead>Address</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {branches.map((branch, index) => (
                                <TableRow>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{branch.name}</TableCell>
                                    <TableCell>{branch.phone}</TableCell>
                                    <TableCell>
                                        {branch?.region?.name}
                                    </TableCell>

                                    <TableCell>
                                        {branch.status == "active" ? (
                                            <SquareCheckBig className="size-6 text-green-500" />
                                        ) : (
                                            <BanIcon className="size-6 text-red-500" />
                                        )}
                                    </TableCell>

                                    <TableCell className="flex gap-2 items-center">
                                        {/* <EditLoanProduct
                                            loanProduct={loanProduct}
                                        /> */}
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
