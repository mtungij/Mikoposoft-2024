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
import { Transaction } from "@/lib/schemas";
import { User } from "@/types";
import { router } from "@inertiajs/react";
import { Edit, Trash } from "lucide-react";
import { toast } from "sonner";

export function DeleteTransanction({ transanction }: { transanction: Transaction }) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button size={"icon"} variant={"destructive"}>
                    <Trash />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete{" "}
                        <b className="text-red-800 uppercase">
                            {transanction.name} 
                        </b>{" "}
                        and remove data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        className="bg-red-500 hover:bg-red-600"
                        onClick={() =>
                            router.delete(
                                route("transanctions.destroy", {
                                    transanction: transanction,
                                }),
                                {
                                    onSuccess: () => {
                                        toast.success(
                                            "Transnction Account deleted successfully"
                                        );
                                    },
                                }
                            )
                        }
                    >
                        Yes, delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
