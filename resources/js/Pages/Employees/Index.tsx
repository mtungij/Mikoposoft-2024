import InputLabel from "@/Components/InputLabel";
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
import { PageProps, User } from "@/types";
import { Head, router, useForm } from "@inertiajs/react";
import { Edit, PlusCircle, Trash } from "lucide-react";
import React, { FormEvent } from "react";
import { toast } from "sonner";
import { useDebouncedCallback } from "use-debounce";
import { DeleteUser } from "./partials/Deleteuser";

const Index = ({ auth, users }: PageProps<{ users: User[] }>) => {
    const { data, setData, post, errors, processing, reset } = useForm({
        name: "",
    });

    const submit = (event: FormEvent) => {
        event.preventDefault();

        post(route("employees.store"));

        toast.success("Employee created successfully");
        reset();
    };

    const searchUser = useDebouncedCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            if (event.target.value === "") {
                router.visit(route("employees.index"));
            } else {
                router.visit(
                    route("employees.index", {
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
            <Head title="Employees" />

            <section className="bg-white p-5 rounded-md md:shadow-lg">
                <div>
                    <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                        Employees
                    </h2>
                </div>
                <div className="w-full grid md:grid-cols-2 items-center gap-4 pb-5">
                    <Input
                        type="search"
                        name="search"
                        className="max-w-sm"
                        placeholder="Search..."
                        onChange={searchUser}
                    />

                    <div className="flex md:justify-end">
                        <Button
                            onClick={() =>
                                router.visit(route("employees.create"))
                            }
                            className="w-full md:w-fit"
                        >
                            <PlusCircle className="size-4 mr-2" />
                            Create Employee
                        </Button>
                    </div>
                </div>
                <div className="border border-gray-200 rounded-md">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>#</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Phone</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Branch</TableHead>
                                <TableHead>Position</TableHead>
                                <TableHead>Gender</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map((user, index) => (
                                <TableRow>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.phone}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.branch?.name}</TableCell>
                                    <TableCell>{user.position}</TableCell>
                                    <TableCell>{user.gender}</TableCell>
                                    <TableCell className="flex gap-2 items-center">
                                        {user.position !== "admin" && (
                                            <DeleteUser user={user} />
                                        )}

                                        <Button
                                            size={"icon"}
                                            variant={"outline"}
                                            className="text-cyan-500"
                                            onClick={() =>
                                                router.visit(
                                                    route("employees.edit", {
                                                        employee: user,
                                                    })
                                                )
                                            }
                                        >
                                            <Edit className="size-4 stro-2" />
                                        </Button>
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
