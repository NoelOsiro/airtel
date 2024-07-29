import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import CustomersTable from "@/components/Tables/CustomersTable";
import AddCustomer from "../forms/AddCustomer";
import RenewCustomer from "../forms/RenewCustomer";
import SalesTable from "@/components/Tables/SalesTable";
import SelectGroupOne from "@/components/SelectGroup/SelectGroupOne";
import AddAgentForm from "@/components/Forms/AddAgentForm";

export const metadata: Metadata = {
  title: "Q3M Wanda | Customers",
  description:
    "This is the Customers page of Q3M Wanda",
};

const TablesPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Agents" />
      <div className="flex flex-col gap-9">
        {/* <SalesTable /> */}
      </div>
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2 mt-9">
        <div className="flex flex-col gap-9">
        <AddAgentForm />
        </div>
        <div className="flex flex-col gap-9">
          <RenewCustomer />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;
