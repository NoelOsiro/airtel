'use client';
import { Button } from '@/components/ui/button';
import { EmployeeTable } from '@/components/tables/employee-tables/employee-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Employee } from '@/constants/data';
import { useRouter } from 'next/navigation';
import { columns } from '@/components/tables/employee-tables/columns';
import { Plus } from 'lucide-react';

interface ProductsClientProps {
  data: Employee[];
}

export const StaffClient: React.FC<ProductsClientProps> = ({ data }) => {
  const router = useRouter();
  const page = 1;
  const pageLimit = 10;
  const totalUsers = data.length; //1000
  const pageCount = Math.ceil(totalUsers / pageLimit);

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading title={`Staff (${data.length})`} description="Manage staff" />
        <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/dashboard/employee/new`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <EmployeeTable
        searchKey="name"
        pageNo={page}
        columns={columns}
        totalUsers={totalUsers}
        data={data}
        pageCount={pageCount}
      />
    </>
  );
};
