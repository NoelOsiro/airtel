'use client';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Router } from '@/constants/data';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { columns } from './columns';

interface ProductsClientProps {
  data: Router[];
}

export const RouterClient: React.FC<ProductsClientProps> = ({ data }) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Routers (${data.length})`}
          description="Manage routers in the system"
        />
        <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/dashboard/store/new`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New Router
        </Button>
      </div>
      <Separator />
      {/* @ts-ignore */}
      <DataTable searchKey="imei" columns={columns} data={data} />
    </>
  );
};
