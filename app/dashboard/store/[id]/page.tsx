import { Breadcrumbs } from '@/components/breadcrumbs';
import { RouterForm } from '@/components/forms/router-form';
import PageContainer from '@/components/layout/page-container';
import { Router } from '@/constants/data';
import axios from 'axios';
import React from 'react';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Router', link: '/dashboard/store' },
  { title: 'Create', link: '/dashboard/store/create' }
];
export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const apiUrl =
    `${process.env.NEXT_PUBLIC_API_URL}/routers?id=${id}` ||
    `http://localhost:3000/api/routers?id=${id}`;
  const routerData: Router[] = await axios
    .get(apiUrl)
    .then((res) => res.data)
    .catch(() => null); // Handle errors if any
  return (
    <PageContainer scrollable={true}>
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />
        <RouterForm initialData={routerData[0]} key={null} />
      </div>
    </PageContainer>
  );
}
