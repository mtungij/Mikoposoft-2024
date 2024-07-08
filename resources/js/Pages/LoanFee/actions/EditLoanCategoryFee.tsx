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
import { LoanProduct } from "@/lib/schemas";
import { Edit, Edit2Icon } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { LoanCategoryFee } from "@/lib/fee-schema";

export function EditLoanCategoryFee({ loanCategoryFee }: { loanCategoryFee: LoanCategoryFee }) {
    const [open, setOpen] = useState(false);

    const { data, setData, patch, processing, errors, reset } = useForm({
        loan_category_id: loanCategoryFee.loan_category.id,
        fee_type: loanCategoryFee.fee_type,
        desc: loanCategoryFee.desc,
        fee_amount: loanCategoryFee.fee_amount as any,
    });

    const submit = (event: React.FormEvent) => {
        event.preventDefault();

        patch(route("loan-category-fees.update", loanCategoryFee.id), {
            onSuccess: () => {
                toast.success("Loan Fee updated successfully");
                setOpen(false);
            },
            preserveScroll: true,
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    size={"icon"}
                    className="text-cyan-500"
                    variant={"outline"}
                >
                    <Edit className="size-4 stroke-2" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle>
                        Edit loan fee to{" "}
                        <b className="underline">{loanCategoryFee.loan_category.name}</b>
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={submit}>
                    <div className="grid grid-cols-1 gap-4 py-4">
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
}
