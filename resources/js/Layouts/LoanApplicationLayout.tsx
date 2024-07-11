import { Input } from "@/components/ui/input";
import React, { ChangeEvent, PropsWithChildren, ReactNode, useState } from "react";
import Authenticated from "./AuthenticatedLayout";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { PageProps, User } from "@/types";
import { Button } from "@/components/ui/button";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const LoanApplicationLayout = ({
    user,
    children,
}: PropsWithChildren<{ user: User }>) => {
    const [open, setOpen] = useState(false);

    const searchCustomer = (e: ChangeEvent) => {
        setOpen(true)
    }

    return (
        <Authenticated user={user}>
            <div>
                <Input
                    type="search"
                    name="search"
                    placeholder="Search customer"
                    onBlur={searchCustomer}
                />
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger className="w-full"></PopoverTrigger>
                    <PopoverContent className="mi max-w-2xl">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Customer Number</TableHead>
                                </TableRow>
                            </TableHeader>
                        </Table>
                    </PopoverContent>
                </Popover>

                <div>{children}</div>
            </div>
        </Authenticated>
    );
};

export default LoanApplicationLayout;
