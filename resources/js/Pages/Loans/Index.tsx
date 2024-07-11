import { Input } from "@/components/ui/input";
import LoanApplicationLayout from "@/Layouts/LoanApplicationLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { FruitOptions } from "@/lib/data";
import Select from "react-select";
import { ComboboxDemo } from "@/components/react-select";
import { AutocompleteExample } from "@/components/autocomplete-example";
import { Customer, paginatedCustomer } from "@/lib/schemas";
import { AutoComplete } from "@/components/autocomplete";

const Index = ({ auth, customers }: PageProps<{ customers: paginatedCustomer}>) => {

    let options = customers.data.map((customer) => ({
        value: customer.id.toString(),
        label: customer.full_name
    }))

    return (
        <Authenticated user={auth.user}>
            <Head title="Loan Profile" />

            <section className="bg-white p-5 rounded-md md:shadow-lg">
                <div>
                    <AutoComplete
                        options={options}
                        emptyMessage="No resulsts."
                        placeholder="Find something"
                        // isLoading={isLoading}
                        // onValueChange={setValue}
                        // value={value}
                        // disabled={isDisabled}
                    />
                </div>

                <div></div>
            </section>
        </Authenticated>
    );
};

export default Index;
