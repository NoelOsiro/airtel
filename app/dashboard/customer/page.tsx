import { Breadcrumbs } from '@/components/breadcrumbs';
import PageContainer from '@/components/layout/page-container';
import { CustomerClient } from '@/components/tables/customer-tables/client';
import { Customer } from '@/constants/data';
import { createClient } from '@/uitls/supabase/server';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Customer', link: '/dashboard/customer' }
];

export default async function page() {
  const supabase = createClient();
  const { data: customers = [] } = await supabase.from('customers').select('*');

  return (
    <PageContainer>
      <div className="space-y-2">
        <Breadcrumbs items={breadcrumbItems} />
        <CustomerClient data={customers as Customer[]} />
      </div>
    </PageContainer>
  );
}
