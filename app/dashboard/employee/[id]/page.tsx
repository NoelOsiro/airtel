import { Breadcrumbs } from '@/components/breadcrumbs';
import { EmployeeForm } from '@/components/forms/employee-form';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Employee } from '@/constants/data';
import axios from 'axios';
import React from 'react';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Employee', link: '/dashboard/employee' },
  { title: 'Create', link: '/dashboard/employee/create' }
];

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const apiUrl =
    `${process.env.NEXT_PUBLIC_API_URL}/staff?id=${id}` ||
    `http://localhost:3000/api/staff?id=${id}`;

  if (id === 'new') {
    return (
      <ScrollArea className="h-full">
        <div className="flex-1 space-y-4 p-8">
          <Breadcrumbs items={breadcrumbItems} />
          <EmployeeForm
            gender={[
              { _id: 'Male', name: 'Male' },
              { _id: 'Female', name: 'Female' }
            ]}
            initialData={null}
            key={null}
          />
        </div>
      </ScrollArea>
    );
  } else {
    const staffData: Employee[] = await axios
      .get(apiUrl)
      .then((res) => res.data)
      .catch(() => null); // Handle errors if any
    return (
      <ScrollArea className="h-full">
        <div className="flex-1 space-y-4 p-8">
          <Breadcrumbs items={breadcrumbItems} />
          <EmployeeForm
            gender={[
              { _id: 'Male', name: 'Male' },
              { _id: 'Female', name: 'Female' }
            ]}
            initialData={staffData ? staffData[0] : null}
            key={null}
          />
        </div>
      </ScrollArea>
    );
  }
}
