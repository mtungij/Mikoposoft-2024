import InputLabel from "@/Components/InputLabel";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Badge } from "@/components/ui/badge";
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
import { PageProps, User } from "@/types";
import { Head, router, useForm } from "@inertiajs/react";
import { PlusCircle } from "lucide-react";
import React, { FormEvent } from "react";
import { toast } from "sonner";
import { DeleteCustomer } from "./actions/DeleteCustomer";
import { useDebouncedCallback } from "use-debounce";
import { Customer } from "@/lib/schemas";

const Index = ({ auth, customers }: PageProps<{ customers: Customer[] }>) => {
    const { data, setData, post, errors, processing, reset } = useForm({
        name: "",
    });

    const submit = (event: FormEvent) => {
        event.preventDefault();

        post(route("customers.store"));

        toast.success("New Customer created successfully");
        reset();
    };

    const searchCustomer = useDebouncedCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            if (event.target.value === "") {
                router.visit(route("customers.index"));
            } else {
                router.visit(
                    route("customers.index", {
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
            <Head title="Customers" />

            <section className="bg-white p-5 rounded-md md:shadow-lg">
                <div>
                    <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                        Customers
                    </h2>
                </div>
                <div className="w-full grid md:grid-cols-2 items-center gap-4 pb-5">
                    <Input
                        type="search"
                        name="search"
                        className="max-w-sm"
                        placeholder="Search..."
                        // onChange={searchUser}
                    />

                    <div className="flex md:justify-end">
                        <Button
                            onClick={() =>
                                router.visit(route("customers.create"))
                            }
                            className="w-full md:w-fit"
                        >
                            <PlusCircle className="size-4 mr-2" />
                            Create Customer
                        </Button>
                    </div>
                </div>
                <div className="border border-gray-200 rounded-md">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>#</TableHead>
                                <TableHead>Customer Name</TableHead>
                                <TableHead>Branch</TableHead>
                                <TableHead>CustomerId</TableHead>
                                <TableHead>Phone Number</TableHead>
                                <TableHead>Nick Name</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {customers.map((customer, index) => (
                                <TableRow key={customer.id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{customer.full_name}</TableCell>
                                    <TableCell>
                                        {customer.branch?.name}
                                    </TableCell>
                                    <TableCell>{customer.c_number}</TableCell>
                                    <TableCell>{customer.phone}</TableCell>
                                    <TableCell>{customer.nick_name}</TableCell>
                                    <TableCell>
                                        {customer.status == "new" ? (
                                            <Badge variant="outline">
                                                New Customer
                                            </Badge>
                                        ) : (
                                            <Badge variant="destructive">
                                                Old Customer
                                            </Badge>
                                        )}
                                    </TableCell>
                                    <TableCell className="flex gap-2 items-center">
                                        <DeleteCustomer customer={customer} />
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
