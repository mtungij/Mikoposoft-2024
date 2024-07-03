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
import { LoanFee, LoanProduct } from "@/lib/schemas";
import { formatNumber } from "@/lib/utils";
import CreateLoanFee from "./actions/CreateLoanFee";
import EditLoanFee from "./actions/EditLoanFee";
import { Edit, KeyRoundIcon } from "lucide-react";

const Index = ({ auth, loanFees }: PageProps<{ loanFees: LoanFee[] }>) => {
    return (
        <Authenticated user={auth.user}>
            <Head title="Loan Product" />

            <section>
                <div>
                    <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                        Loan Fee
                    </h2>
                </div>
                <div className="w-full flex items-center gap-4 pb-5">
                    <EditLoanFee loanFee={loanFees[0]} />

                    <Button size={"sm"} variant={"outline"} className="w-fit">
                        <KeyRoundIcon className="size-5" />
                        Change category
                    </Button>

                    <div className="flex md:justify-end">
                        <CreateLoanFee />
                    </div>
                </div>
                <div className=" rounded-md">
                    <table className="w-full border-collapse border">
                        <tr>
                            <th className="border p-4 text-left bg-cyan-200">
                                CATEGORY
                            </th>
                            <td className="border p-4 text-left">
                                {loanFees[0].category}
                            </td>
                        </tr>
                        <tr>
                            <th className="border p-4 text-left">FEE TYPE</th>
                            <td className="border p-4 text-left">
                                {loanFees[0].fee_type}
                            </td>
                        </tr>
                        <tr>
                            <th className="border p-4 text-left">
                                DESCRIPTION
                            </th>
                            <td className="border p-4 text-left">
                                {loanFees[0].desc}
                            </td>
                        </tr>
                        <tr>
                            <th className="border p-4 text-left">FEE AMOUNT</th>
                            <td className="border p-4 text-left">
                                {loanFees[0].fee_amount}
                            </td>
                        </tr>
                    </table>
                </div>
            </section>
        </Authenticated>
    );
};

export default Index;
