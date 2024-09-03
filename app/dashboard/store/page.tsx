import { Breadcrumbs } from '@/components/breadcrumbs';
import PageContainer from '@/components/layout/page-container';
import { RouterClient } from '@/components/tables/router-tables/client';
import { Router } from '@/constants/data';
import { createClient } from '@/uitls/supabase/server';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Inventory', link: '/dashboard/store' }
];

export default async function page() {
  const supabase = createClient();
  const { data: routers = [] } = await supabase.from('routers').select('*');

  return (
    <PageContainer>
      <div className="space-y-2">
        <Breadcrumbs items={breadcrumbItems} />
        <RouterClient data={routers as Router[]} />
      </div>
    </PageContainer>
  );
}
