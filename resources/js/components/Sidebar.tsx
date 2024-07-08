import { Link } from "@inertiajs/react";
import {
    Home,
    ShoppingCart,
    Package,
    Users,
    LineChart,
    Settings,
    Minus,
    Apple,
} from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

import React from "react";
import { Badge } from "./ui/badge";

const Sidebar = () => {
    return (
        <nav className="grid items-start px-2 w-full text-sm font-medium lg:px-4">
            <Link
                href={route("dashboard")}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
                <Home className="h-4 w-4" />
                Dashboard
            </Link>
            <Link
                href={route("employees.index")}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
                <ShoppingCart className="h-4 w-4" />
                Employees
                <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                    6
                </Badge>
            </Link>

            <Accordion type="single" collapsible className="w-full px-3 py-2">
                <AccordionItem value="item-1" className="w-full">
                    <AccordionTrigger>
                        <div className="flex gap-2">
                            <Settings className="size-4" />
                            <span>Setup</span>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className="grid gap-2">
                            <Link
                                href={route("loan-products.index")}
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-primary transition-all hover:text-primary"
                            >
                                <Minus className="h-4 w-4" />
                                Loan Products
                            </Link>
                            <Link
                                href={route("loan-fees.index")}
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-primary transition-all hover:text-primary"
                            >
                                <Minus className="h-4 w-4" />
                                Loan Fees
                            </Link>
                            <Link
                                href={route("formulas.index")}
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-primary transition-all hover:text-primary"
                            >
                                <Minus className="h-4 w-4" />
                                Interest Formula
                            </Link>

                            <Link
                                href={route("transanctions.index")}
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-primary transition-all hover:text-primary"
                            >
                                <Minus className="h-4 w-4" />
                                Transanction Accounts
                            </Link>
                            <Link
                                href={route("branches.index")}
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                            >
                                <Apple className="h-4 w-4" />
                                Branches
                                <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                                    6
                                </Badge>
                            </Link>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

            <Accordion type="single" collapsible className="w-full px-3 py-2">
                <AccordionItem value="item-1" className="w-full">
                    <AccordionTrigger>
                        <div className="flex gap-2">
                            <Settings className="size-4" />
                            <span>Customer</span>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className="grid gap-2">
                            <Link
                                href={route("customers.index")}
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-primary transition-all hover:text-primary"
                            >
                                <Minus className="h-4 w-4" />
                                Register Customer
                            </Link>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

            <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
                <LineChart className="h-4 w-4" />
                Analytics
            </Link>
        </nav>
    );
};

export default Sidebar;
