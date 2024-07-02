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

export function CreateLoanProduct() {
    const [open, setOpen] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        from: "",
        to: "",
        interest: "",
    });

    const submit = (event: React.FormEvent) => {
        event.preventDefault();

        post(route("loan-products.store"), {
            onSuccess: () => {
                reset();
                toast.success("Loan Product created successfully");
                setOpen(false);
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Create Loan Product</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-4xl">
                <DialogHeader>
                    <DialogTitle>Create Loan Product</DialogTitle>
                </DialogHeader>
                <form onSubmit={submit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                name="name"
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
                                onChange={(e) =>
                                    setData("interest", e.target.value)
                                }
                                className="col-span-3"
                            />
                            <InputError message={errors.interest} />
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
