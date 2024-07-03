import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Input } from "@/components/ui/input";
import { Branch, PageProps, User } from "@/types";
import { Head, router, useForm } from "@inertiajs/react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import React, { FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const CreateUser = ({
    auth,
    branches,
    employee,
}: PageProps<{ branches: Branch[]; employee: User }>) => {
    const { data, setData, patch, errors, processing } = useForm({
        name: employee?.name,
        branch_id: employee?.branch_id,
        phone: employee.phone,
        position: employee.position,
        gender: employee.gender,
        account: employee.account,
        account_number: employee.account_number,
        salary: employee.salary,
    });

    const submit = (event: FormEvent) => {
        event.preventDefault();

        patch(route("employees.update", employee.id), {
            onSuccess: () => {
                toast.success("Employee updated successfully");
            },
        });
    };

    return (
        <Authenticated user={auth.user}>
            <Head title="Edit User" />

            <div>
                <form onSubmit={submit} className="grid">
                    <div>
                        <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                            Edit Employee
                        </h2>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        <div className="space-y-2">
                            <InputLabel htmlFor="name" value="Full Name" />
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                            />
                            <InputError
                                message={errors.name}
                                className="mt-2"
                            />
                        </div>
                        <div className="space-y-2">
                            <InputLabel htmlFor="branch_id" value="Branch" />
                            <Select
                                value={data?.branch_id?.toString()}
                                name="branch_id"
                                onValueChange={(value) =>
                                    setData("branch_id", parseInt(value))
                                }
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue
                                        id="branch_id"
                                        placeholder="Select Branch"
                                    />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Branches</SelectLabel>
                                        {branches &&
                                            branches.map((branch) => (
                                                <SelectItem
                                                    key={branch.id}
                                                    value={branch.id.toString()}
                                                >
                                                    {branch.name}
                                                </SelectItem>
                                            ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <InputError
                                message={errors.branch_id}
                                className="mt-2"
                            />
                        </div>
                        <div className="space-y-2">
                            <InputLabel htmlFor="phone" value="Phone Number" />
                            <Input
                                id="phone"
                                type="number"
                                value={data.phone}
                                onChange={(e) =>
                                    setData("phone", e.target.value)
                                }
                            />
                            <InputError
                                message={errors.phone}
                                className="mt-2"
                            />
                        </div>
                        <div className="space-y-2">
                            <InputLabel htmlFor="gender" value="gender" />
                            <Select
                                value={data.gender}
                                name="gender"
                                onValueChange={(value) =>
                                    setData("gender", value)
                                }
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select gender" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Branches</SelectLabel>
                                        <SelectItem key="male" value="male">
                                            Male
                                        </SelectItem>
                                        <SelectItem key="female" value="female">
                                            Female
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <InputError
                                message={errors.gender}
                                className="mt-2"
                            />
                        </div>
                        <div className="space-y-2">
                            <InputLabel htmlFor="position" value="Position" />
                            <Select
                                value={data.position}
                                name="position"
                                onValueChange={(value) =>
                                    setData("position", value)
                                }
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Position" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Branches</SelectLabel>
                                        <SelectItem key="admin" value="admin">
                                            Admin
                                        </SelectItem>
                                        <SelectItem
                                            key="loan_officer"
                                            value="loan_officer"
                                        >
                                            Loan Officer
                                        </SelectItem>
                                        <SelectItem
                                            key="manager"
                                            value="manager"
                                        >
                                            Manager
                                        </SelectItem>
                                        <SelectItem
                                            key="general_manager"
                                            value="general_manager"
                                        >
                                            General Manager
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <InputError
                                message={errors.position}
                                className="mt-2"
                            />
                        </div>
                        <div className="space-y-2">
                            <InputLabel htmlFor="account" value="Account" />
                            <Select
                                value={data.account}
                                name="account"
                                onValueChange={(value) =>
                                    setData("account", value)
                                }
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue
                                        id="account"
                                        placeholder="Select account"
                                    />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Accounts</SelectLabel>
                                        <SelectItem key="mpesa" value="mpesa">
                                            M-Pesa
                                        </SelectItem>
                                        <SelectItem
                                            key="tigopesa"
                                            value="tigopesa"
                                        >
                                            Tigo Pesa
                                        </SelectItem>
                                        <SelectItem key="airtel" value="airtel">
                                            Airtel Money
                                        </SelectItem>
                                        <SelectItem
                                            key="halopesa"
                                            value="halopesa"
                                        >
                                            Halopesa
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <InputError
                                message={errors.account}
                                className="mt-2"
                            />
                        </div>
                        <div className="space-y-2">
                            <InputLabel
                                htmlFor="account_number"
                                value="Account Number"
                            />
                            <Input
                                type="number"
                                id="account_number"
                                name="account_number"
                                value={data.account_number}
                                onChange={(e) =>
                                    setData("account_number", e.target.value)
                                }
                            />
                            <InputError
                                message={errors.account_number}
                                className="mt-2"
                            />
                        </div>
                        <div className="space-y-2">
                            <InputLabel
                                htmlFor="slaray"
                                value="Salary Amount"
                            />
                            <Input
                                type="number"
                                id="salary"
                                name="salary"
                                value={data.salary}
                                onChange={(e) =>
                                    setData("salary", parseInt(e.target.value))
                                }
                            />
                            <InputError
                                message={errors.salary}
                                className="mt-2"
                            />
                        </div>
                    </div>
                    <div className="flex gap-4 my-4">
                        <Button disabled={processing} type="submit">
                            Update
                        </Button>
                        <Button
                            disabled={processing}
                            type="button"
                            variant={"outline"}
                            onClick={() =>
                                router.visit(route("employees.index"))
                            }
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </div>
        </Authenticated>
    );
};

export default CreateUser;
