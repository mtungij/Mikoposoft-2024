import React from "react";
import InputError from "@/Components/InputError";
import { Button } from "@/components/ui/button";
import { NumericFormat } from "react-number-format";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "@inertiajs/react";
import { useState } from "react";
import { toast } from "sonner";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const CreateLoanFee = () => {
    const [open, setOpen] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        category: "",
        fee_type: "",
        desc: "",
        fee_amount: "",
    });

    const submit = (event: React.FormEvent) => {
        event.preventDefault();

        post(route("loan-fees.store"), {
            onSuccess: () => {
                reset();
                toast.success("Loan fee created successfully");
                setOpen(false);
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Create Loan Fee</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle>Create Loan Fee</DialogTitle>
                </DialogHeader>
                <form onSubmit={submit}>
                    <div className="grid grid-cols-1 gap-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="category">Category</Label>
                            <Select
                                name="category"
                                value={data.category}
                                onValueChange={(value) =>
                                    setData("category", value)
                                }
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue
                                        id="category"
                                        placeholder="Select category"
                                    />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem key="general" value="general">
                                        By General
                                    </SelectItem>
                                    <SelectItem
                                        key="loan_prouct"
                                        value="loan_product"
                                    >
                                        By Loan Prouct
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <InputError message={errors.category} />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button disabled={processing} type="submit">
                            Save changes
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateLoanFee;
