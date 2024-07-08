import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { PageProps } from "@/types";
import { Head, router } from "@inertiajs/react";
import { Edit } from "lucide-react";
import { formatNumber } from "@/lib/utils";
import { Transaction } from "@/lib/schemas";
import CreateTransanction from "./actions/CreateTransanction";
import { toast } from "sonner";
import { DeleteTransanction } from "./actions/DeleteTransanction";

const Index = ({
    auth,
    error,
    success,
    transactions,
}: PageProps<{ transactions: Transaction[] }>) => {
    if (error) toast.error(error);

    if (success) toast.success(success);

    return (
        <Authenticated user={auth.user}>
            <Head title="Transactions" />

            <section className="bg-white p-5 rounded-md md:shadow-lg">
                <div>
                    <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                        Transaction Accounts
                    </h2>
                </div>
                <div className="w-full grid md:grid-cols-2 items-center gap-4 pb-5">
                    <Input
                        type="search"
                        name="search"
                        className="max-w-sm"
                        placeholder="Search..."
                    />

                    <div className="flex md:justify-end">
                        <CreateTransanction />
                    </div>
                </div>
                <div className="border border-gray-200 rounded-md">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>#</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {transactions.map((transaction, index) => (
                                <TableRow>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{transaction.name}</TableCell>
                                    <TableCell>
                                        <DeleteTransanction
                                            transanction={transaction}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </section>
        </Authenticated>
    );
};

export default Index;
