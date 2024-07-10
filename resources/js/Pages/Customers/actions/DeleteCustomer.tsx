import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Customer } from "@/lib/schemas";
import { router } from "@inertiajs/react";
import { Edit, Trash, Trash2 } from "lucide-react";
import { toast } from "sonner";

export function DeleteCustomer({ customer }: { customer: Customer }) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button size={"icon"} variant={"destructive"}>
                    <Trash2 />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Je, una uhakika kabisa?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Hii hatua haiwezi kubatilishwa. Hii itafuta kabisa{" "}
                        <b>{customer.first_name} account</b> na kuondoa data
                        zote kutoka kwenye seva zetu ikiwa ni pamoja na mikopo
                        yake yote .
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Ghairi</AlertDialogCancel>
                    <AlertDialogAction
                        className="bg-red-500 hover:bg-red-600"
                        onClick={() =>
                            router.delete(
                                route("customers.destroy", {
                                    customer: customer,
                                }),
                                {
                                    onSuccess: () => {
                                        toast.success(
                                            "Customer deleted successfully"
                                        );
                                    },
                                }
                            )
                        }
                    >
                        Ndio,futa
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
