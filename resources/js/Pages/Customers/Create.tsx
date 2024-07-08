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
import { useStepper } from "@/components/stepper/use-stepper";
import { NumericFormat } from "react-number-format";
import { Step, StepItem, Stepper } from "@/components/stepper";
import UserProfile from "./partials/UserProfile";

const steps = [
    { label: "Step 1" },
    { label: "Step 2" },
    { label: "Step 3" },
] satisfies StepItem[];

const CreateCustomer = ({
    auth,
    branches,
    employees,
}: PageProps<{ branches: Branch[]; employees: User[] }>) => {
    const { data, setData, post, errors, processing, reset } = useForm({
        user_id: "",
        branch_id: "",
        c_number: "",
        first_name: "",
        middle_name: "",
        last_name: "",
        phone: "",
        ward: "",
        street: "",
        id_type: "",
        id_number: "",
        nick_name: "",
        marital_status: "",
        working_status: "",
        business_type: "",
        business_location: "",
        monthly_income: "",
        account_type: "",
        img_url: "" as any,
    });

    const submit = (event: FormEvent) => {
        event.preventDefault();
        console.log(data.img_url);

        post(route("customers.store"), {
            onSuccess: () => {
                toast.success("Customer created successfully");
                reset();
            },
        });
    };

    return (
        <Authenticated user={auth.user}>
            <Head title="Create customer" />

            <div>
                <form onSubmit={submit} className="grid">
                    <div>
                        <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                            Create Customer
                        </h2>
                    </div>
                    <div className="flex w-full flex-col gap-4">
                        <Stepper initialStep={0} steps={steps}>
                            <Step>
                                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                    <div className="space-y-2">
                                        <InputLabel
                                            htmlFor="first_name"
                                            value="First Name"
                                        />
                                        <Input
                                            id="first_name"
                                            value={data.first_name}
                                            onChange={(e) =>
                                                setData(
                                                    "first_name",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.first_name}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <InputLabel
                                            htmlFor="middle_name"
                                            value="Middle Name"
                                        />
                                        <Input
                                            id="middle_name"
                                            value={data.middle_name}
                                            onChange={(e) =>
                                                setData(
                                                    "middle_name",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.middle_name}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <InputLabel
                                            htmlFor="last_name"
                                            value="Last Name"
                                        />
                                        <Input
                                            id="last_name"
                                            value={data.last_name}
                                            onChange={(e) =>
                                                setData(
                                                    "last_name",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.last_name}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <InputLabel
                                            htmlFor="nick_name"
                                            value="Nick Name"
                                        />
                                        <NumericFormat
                                            customInput={Input}
                                            thousandSeparator=","
                                            allowNegative={false}
                                            id="nick_name"
                                            value={data.nick_name}
                                            onChange={(e) =>
                                                setData(
                                                    "nick_name",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.nick_name}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <InputLabel
                                            htmlFor="phone"
                                            value="Phone Number"
                                        />
                                        <Input
                                            id="phone"
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
                                        <InputLabel
                                            htmlFor="branch_id"
                                            value="Branch"
                                        />
                                        <Select
                                            value={data.branch_id}
                                            name="branch_id"
                                            onValueChange={(value) =>
                                                setData("branch_id", value)
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
                                                    <SelectLabel>
                                                        Branches
                                                    </SelectLabel>
                                                    {branches &&
                                                        branches.map(
                                                            (branch) => (
                                                                <SelectItem
                                                                    key={
                                                                        branch.id
                                                                    }
                                                                    value={branch.id.toString()}
                                                                >
                                                                    {
                                                                        branch.name
                                                                    }
                                                                </SelectItem>
                                                            )
                                                        )}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        <InputError
                                            message={errors.branch_id}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <InputLabel
                                            htmlFor="user_id"
                                            value="Employee"
                                        />
                                        <Select
                                            value={data.user_id}
                                            name="user_id"
                                            onValueChange={(value) =>
                                                setData("user_id", value)
                                            }
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue
                                                    id="user_id"
                                                    placeholder="Select employee"
                                                />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>
                                                        Branches
                                                    </SelectLabel>
                                                    {employees &&
                                                        employees.map(
                                                            (employee) => (
                                                                <SelectItem
                                                                    key={
                                                                        employee.id
                                                                    }
                                                                    value={employee.id.toString()}
                                                                >
                                                                    {
                                                                        employee.name
                                                                    }
                                                                </SelectItem>
                                                            )
                                                        )}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        <InputError
                                            message={errors.user_id}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <InputLabel
                                            htmlFor="ward"
                                            value="Ward"
                                        />
                                        <Input
                                            id="ward"
                                            value={data.ward}
                                            onChange={(e) =>
                                                setData("ward", e.target.value)
                                            }
                                        />
                                        <InputError
                                            message={errors.ward}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <InputLabel
                                            htmlFor="monthly_income"
                                            value="monthly income"
                                        />
                                        <NumericFormat
                                            customInput={Input}
                                            thousandSeparator=","
                                            allowNegative={false}
                                            id="monthly_income"
                                            value={data.monthly_income}
                                            onChange={(e) =>
                                                setData(
                                                    "monthly_income",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.monthly_income}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                            </Step>
                            <Step>
                                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                    <div className="space-y-2">
                                        <InputLabel
                                            htmlFor="marital_status"
                                            value="Marital Status"
                                        />
                                        <Select
                                            value={data.marital_status}
                                            name="marital_status"
                                            onValueChange={(value) =>
                                                setData("marital_status", value)
                                            }
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>
                                                        Marital Status
                                                    </SelectLabel>
                                                    <SelectItem
                                                        key="single"
                                                        value="single"
                                                    >
                                                        Single
                                                    </SelectItem>
                                                    <SelectItem
                                                        key="married"
                                                        value="married"
                                                    >
                                                        Married
                                                    </SelectItem>
                                                    <SelectItem
                                                        key="widow"
                                                        value="widow"
                                                    >
                                                        Widow
                                                    </SelectItem>
                                                    <SelectItem
                                                        key="separated"
                                                        value="separated"
                                                    >
                                                        Separated
                                                    </SelectItem>
                                                    <SelectItem
                                                        key="divorced"
                                                        value="divorced"
                                                    >
                                                        Divorced
                                                    </SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        <InputError
                                            message={errors.marital_status}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <InputLabel
                                            htmlFor="id_type"
                                            value="ID Type"
                                        />
                                        <Select
                                            value={data.id_type}
                                            name="gender"
                                            onValueChange={(value) =>
                                                setData("id_type", value)
                                            }
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select id type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>
                                                        ID Type
                                                    </SelectLabel>
                                                    <SelectItem
                                                        key="volter"
                                                        value="volter"
                                                    >
                                                        Volter ID
                                                    </SelectItem>
                                                    <SelectItem
                                                        key="national"
                                                        value="national"
                                                    >
                                                        National ID
                                                    </SelectItem>
                                                    <SelectItem
                                                        key="driving_licence"
                                                        value="driving_licence"
                                                    >
                                                        Driving Licence
                                                    </SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        <InputError
                                            message={errors.id_type}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <InputLabel
                                            htmlFor="id_number"
                                            value="id_number"
                                        />
                                        <Input
                                            id="id_number"
                                            value={data.id_number}
                                            onChange={(e) =>
                                                setData(
                                                    "id_number",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.id_number}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <InputLabel
                                            htmlFor="street"
                                            value="Street"
                                        />
                                        <Input
                                            id="street"
                                            value={data.street}
                                            onChange={(e) =>
                                                setData(
                                                    "street",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.street}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <InputLabel
                                            htmlFor="working_status"
                                            value="Working Status"
                                        />
                                        <Select
                                            value={data.working_status}
                                            name="working_status"
                                            onValueChange={(value) =>
                                                setData("working_status", value)
                                            }
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>
                                                        Working Status
                                                    </SelectLabel>
                                                    <SelectItem
                                                        key="Business Owner"
                                                        value="Business Owner"
                                                    >
                                                        Business Owner
                                                    </SelectItem>
                                                    <SelectItem
                                                        key="Private Sector"
                                                        value="Private Sector"
                                                    >
                                                        Private Sector
                                                    </SelectItem>
                                                    <SelectItem
                                                        key="Goverment Employee"
                                                        value="Goverment Employee"
                                                    >
                                                        Goverment Employee
                                                    </SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        <InputError
                                            message={errors.working_status}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <InputLabel
                                            htmlFor="business_location"
                                            value="Business Location"
                                        />
                                        <Input
                                            id="business_location"
                                            value={data.business_location}
                                            onChange={(e) =>
                                                setData(
                                                    "business_location",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.business_location}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                            </Step>
                            <Step>
                                <UserProfile
                                    value={data.img_url}
                                    onChange={(event) =>
                                        event?.target.files &&
                                        setData(
                                            "img_url",
                                            event.target.files[0]
                                        )
                                    }
                                />{" "}
                            </Step>
                            <Footer />
                        </Stepper>
                    </div>
                </form>
            </div>
        </Authenticated>
    );
};

export default CreateCustomer;

const Footer = () => {
    const {
        nextStep,
        prevStep,
        resetSteps,
        hasCompletedAllSteps,
        isLastStep,
        isOptionalStep,
        isDisabledStep,
    } = useStepper();
    return (
        <>
            {hasCompletedAllSteps && (
                <div className="h-40 flex items-center justify-center my-2 border bg-secondary text-primary rounded-md">
                    <h1 className="text-xl">
                        Customer registered successfully! 🎉{" "}
                    </h1>
                </div>
            )}
            <div className="w-full flex justify-end gap-2">
                {hasCompletedAllSteps ? (
                    <>
                        <Button size="sm" className="hidden">
                            Submit
                        </Button>
                        <Button size="sm" onClick={resetSteps}>
                            Reset
                        </Button>
                    </>
                ) : (
                    <>
                        <Button
                            disabled={isDisabledStep}
                            onClick={prevStep}
                            size="sm"
                            type="button"
                            variant="secondary"
                        >
                            Prev
                        </Button>
                        <Button size="sm" type="button" onClick={nextStep}>
                            {isLastStep
                                ? "Finish"
                                : isOptionalStep
                                ? "Skip"
                                : "Next"}
                        </Button>
                    </>
                )}
            </div>
        </>
    );
};
