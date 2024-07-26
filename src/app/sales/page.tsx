import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import CustomersTable from "@/components/Tables/CustomersTable";
import AddCustomer from "../forms/AddCustomer";
import RenewCustomer from "../forms/RenewCustomer";
import SalesTable from "@/components/Tables/SalesTable";
import AddSales from "../forms/AddSales";

export const metadata: Metadata = {
  title: "Next.js Tables | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Tables page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const SalesPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Sales" />
      <div className="flex flex-col gap-9">
        <SalesTable />
      </div>
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2 mt-9">
        <div className="flex flex-col gap-9">
          <AddSales />
        </div>
        <div className="flex flex-col gap-9">
          <RenewCustomer />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default SalesPage;
