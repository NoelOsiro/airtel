import { Breadcrumbs } from '@/components/breadcrumbs';
import { EmployeeForm } from '@/components/forms/employee-form';
import { ScrollArea } from '@/components/ui/scroll-area';
import React from 'react';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Employee', link: '/dashboard/employee' },
  { title: 'Create', link: '/dashboard/employee/create' }
];

export default function Page() {
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-8">
        <Breadcrumbs items={breadcrumbItems} />
        <EmployeeForm
          gender={[
            { _id: 'male', name: 'Male' },
            { _id: 'female', name: 'Female' }
          ]}
          initialData={null}
          key={null}
        />
      </div>
    </ScrollArea>
  );
}
