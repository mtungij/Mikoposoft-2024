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
import { Edit, Fence } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { LoanFee } from "@/lib/schemas";

const EditLoanFee = ({ loanFee }: { loanFee: LoanFee }) => {
    const [open, setOpen] = useState(false);

    const { data, setData, patch, processing, errors, reset } = useForm({
        category: loanFee.category,
        fee_type: loanFee.fee_type,
        desc: loanFee.desc,
        fee_amount: loanFee.fee_amount as any,
    });

    const submit = (event: React.FormEvent) => {
        event.preventDefault();

        patch(route("loan-fees.update", loanFee.id), {
            onSuccess: () => {
                reset();
                toast.success("Loan fee updated successfully");
                setOpen(false);
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant={'primary'} size={'icon'}>
                    <Edit className="size-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-4xl">
                <DialogHeader>
                    <DialogTitle>Update Loan Fee</DialogTitle>
                </DialogHeader>
                <form onSubmit={submit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="category">Category</Label>
                            <Select
                                name="category"
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
                        <div className="space-y-2">
                            <Label htmlFor="fee_type">Fee type</Label>
                            <Select
                                name="fee_type"
                                onValueChange={(value) =>
                                    setData("fee_type", value)
                                }
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue
                                        id="fee_type"
                                        placeholder="Select fee_type"
                                    />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem key="money" value="money">
                                        Money Value
                                    </SelectItem>
                                    <SelectItem
                                        key="percentage"
                                        value="percentage"
                                    >
                                        Percentage value
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <InputError message={errors.fee_type} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="desc">Description</Label>
                            <Input
                                id="desc"
                                value={data.desc}
                                onChange={(e) =>
                                    setData("desc", e.target.value)
                                }
                                className="col-span-3"
                            />
                            <InputError message={errors.desc} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="fee_amount">Fee amount</Label>
                            <NumericFormat
                                customInput={Input}
                                thousandSeparator=","
                                allowNegative={false}
                                id="fee_amount"
                                value={data.fee_amount}
                                onChange={(e) =>
                                    setData("fee_amount", e.target.value)
                                }
                                className="col-span-3"
                            />
                            <InputError message={errors.fee_amount} />
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

export default EditLoanFee;
