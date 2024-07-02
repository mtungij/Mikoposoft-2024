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
import { User } from "@/types";
import { router } from "@inertiajs/react";
import { Edit, Trash } from "lucide-react";
import { toast } from "sonner";

export function DeleteUser({ user }: { user: User }) {
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
                        <b>
                            {user.name} {"`s"} account
                        </b>{" "}
                        and remove his/her data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        className="bg-red-500 hover:bg-red-600"
                        onClick={() =>
                            router.delete(
                                route("employees.destroy", {
                                    employee: user,
                                }),
                                {
                                    onSuccess: () => {
                                        toast.success(
                                            "Employee deleted successfully"
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
