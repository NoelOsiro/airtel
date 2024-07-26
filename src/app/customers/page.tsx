import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableOne from "@/components/Tables/TableOne";
import TableThree from "@/components/Tables/TableThree";
import TableTwo from "@/components/Tables/TableTwo";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import CustomersTable from "@/components/Tables/CustomersTable";
import CheckboxFive from "@/components/Checkboxes/CheckboxFive";
import CheckboxFour from "@/components/Checkboxes/CheckboxFour";
import CheckboxOne from "@/components/Checkboxes/CheckboxOne";
import CheckboxThree from "@/components/Checkboxes/CheckboxThree";
import CheckboxTwo from "@/components/Checkboxes/CheckboxTwo";
import MultiSelect from "@/components/FormElements/MultiSelect";
import SelectGroupTwo from "@/components/SelectGroup/SelectGroupTwo";
import AddCustomer from "../forms/AddCustomer";
import RenewCustomer from "../forms/RenewCustomer";

export const metadata: Metadata = {
  title: "Q3M Wanda | Customers",
  description:
    "This is the Customers page of Q3M Wanda",
};

const TablesPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Customers" />
      <div className="flex flex-col gap-9">
        <CustomersTable />
      </div>
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2 mt-9">
        <div className="flex flex-col gap-9">
          <AddCustomer />
        </div>
        <div className="flex flex-col gap-9">
          <RenewCustomer />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;
