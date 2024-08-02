import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import AddCustomer from "../forms/AddCustomer";
import RenewCustomer from "../forms/RenewCustomer";
import { createClient } from "@/utils/supabase/server";
import RoutersTable from "@/components/Tables/RoutersTable";

export const metadata: Metadata = {
  title: "Q3M Wanda | Routers",
  description:
    "This is the Customers page of Q3M Wanda",
};

const TablesPage = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.from("routers").select("*");
  if (error) {
    console.error(error);
  }
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Customers" />
      <div className="flex flex-col gap-9">
        <RoutersTable router={data} />
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
