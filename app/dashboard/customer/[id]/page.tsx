import { Breadcrumbs } from '@/components/breadcrumbs';
import { CustomerForm } from '@/components/forms/customer-form';
import PageContainer from '@/components/layout/page-container';
import { Customer } from '@/constants/data';
import axios from 'axios';
import React from 'react';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'User', link: '/dashboard/user' },
  { title: 'Create', link: '/dashboard/user/create' }
];
export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const apiUrl =
    `${process.env.NEXT_PUBLIC_API_URL}/customers?id=${id}` ||
    `http://localhost:3000/api/customers?id=${id}`;
  const customerData: Customer[] = await axios
    .get(apiUrl)
    .then((res) => res.data)
    .catch(() => null); // Handle errors if any
  return (
    <PageContainer scrollable={true}>
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />
        <CustomerForm
          categories={[
            { _id: '3500', name: '3500' },
            { _id: '5500', name: '5500' },
            { _id: '7500', name: '7500' }
          ]}
          initialData={customerData[0]}
          key={null}
        />
      </div>
    </PageContainer>
  );
}
