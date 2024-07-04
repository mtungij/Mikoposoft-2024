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

export function EditLoanCategoryFee({ loanProduct }: { loanProduct: LoanProduct }) {
    const [open, setOpen] = useState(false);

    const { data, setData, patch, processing, errors, reset } = useForm({
        name: loanProduct.name,
        from: loanProduct.from as any,
        to: loanProduct.to as any,
        interest: loanProduct.interest as any,
        penalt_type: loanProduct.penalt_type,
        penalt_amount: loanProduct.penalt_amount as any,
        fee: loanProduct.fee as any,
    });

    const submit = (event: React.FormEvent) => {
        event.preventDefault();

        patch(route("loan-products.update", loanProduct.id), {
            onSuccess: () => {
                toast.success("Loan Product updated successfully");
                setOpen(false);
            },
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
            <DialogContent className="sm:max-w-4xl">
                <DialogHeader>
                    <DialogTitle>Edit {loanProduct.name}</DialogTitle>
                </DialogHeader>
                <form onSubmit={submit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                name="name"
                                disabled
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                            />
                            <InputError message={errors.name} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="from">Minimum loan amount</Label>
                            <NumericFormat
                                id="from"
                                customInput={Input}
                                thousandSeparator=","
                                allowNegative={false}
                                value={data.from}
                                disabled
                                onChange={(e) =>
                                    setData("from", e.target.value)
                                }
                                className="col-span-3"
                            />
                            <InputError message={errors.from} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="to">Maximum loan amount</Label>
                            <NumericFormat
                                id="to"
                                customInput={Input}
                                allowNegative={false}
                                allowLeadingZeros
                                thousandSeparator=","
                                value={data.to}
                                disabled
                                onChange={(e) => setData("to", e.target.value)}
                                className="col-span-3"
                            />
                            <InputError message={errors.to} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="interest">Interest(%)</Label>
                            <Input
                                id="interest"
                                type="number"
                                value={data.interest}
                                disabled
                                onChange={(e) =>
                                    setData("interest", e.target.value)
                                }
                                className="col-span-3"
                            />
                            <InputError message={errors.interest} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="interest">Penalt Type</Label>
                            <Select
                                name="penalt_type"
                                value={data.penalt_type}
                                disabled
                                onValueChange={(value) =>
                                    setData("penalt_type", value)
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem key="money" value="money">
                                        Money Value
                                    </SelectItem>
                                    <SelectItem
                                        key="percentage"
                                        value="percentage"
                                    >
                                        Percentage Value
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <InputError message={errors.penalt_type} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="penalt_amount">
                                Penalt Amount(%)
                            </Label>
                            <Input
                                id="penalt_amount"
                                type="number"
                                disabled
                                value={data.penalt_amount}
                                onChange={(e) =>
                                    setData("penalt_amount", e.target.value)
                                }
                                className="col-span-3"
                            />
                            <InputError message={errors.penalt_amount} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="fee">
                                Loan Fee
                            </Label>
                            <Input
                                id="fee"
                                type="number"
                                value={data.fee}
                                onChange={(e) =>
                                    setData("fee", e.target.value)
                                }
                                className="col-span-3"
                            />
                            <InputError message={errors.fee} />
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
