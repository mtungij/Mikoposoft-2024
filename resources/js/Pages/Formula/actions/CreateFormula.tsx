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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CreateFormula = () => {
    const [open, setOpen] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
    });

    const submit = (event: React.FormEvent) => {
        event.preventDefault();

        post(route("formulas.store"), {
            onSuccess: () => {
                reset();
                toast.success("Formula created successfully");
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
                            <Select
                                name="name"
                                value={data.name}
                                onValueChange={(value) =>
                                    setData("name", value)
                                }
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Formula" />
                                    <SelectContent>
                                        <SelectItem
                                            key="flatrate"
                                            value="flatrate"
                                        >
                                            Flatrate Formula
                                        </SelectItem>
                                        <SelectItem
                                            key="effectively"
                                            value="effectively"
                                        >
                                            Effectively Formula
                                        </SelectItem>
                                        <SelectItem
                                            key="reducing"
                                            value="reducing"
                                        >
                                            Reducing Formula
                                        </SelectItem>
                                    </SelectContent>
                                </SelectTrigger>
                            </Select>
                            <InputError message={errors.name} />
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

export default CreateFormula;