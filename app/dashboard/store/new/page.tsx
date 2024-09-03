import { Breadcrumbs } from '@/components/breadcrumbs';
import { RouterForm } from '@/components/forms/router-form';
import PageContainer from '@/components/layout/page-container';
import React from 'react';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Router', link: '/dashboard/store' },
  { title: 'Create', link: '/dashboard/store/create' }
];
export default function Page() {
  return (
    <PageContainer scrollable={true}>
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />
        <RouterForm initialData={null} key={null} />
      </div>
    </PageContainer>
  );
}
