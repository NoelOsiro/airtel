import { Breadcrumbs } from '@/components/breadcrumbs';
import PageContainer from '@/components/layout/page-container';
import { StaffClient } from '@/components/tables/employee-tables/client';
import { Employee } from '@/constants/data';
import { createClient } from '@/uitls/supabase/server';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Employee', link: '/dashboard/employee' }
];

export default async function page() {
  const supabase = createClient();
  const { data: staff = [] } = await supabase.from('staff').select('*');
  const employee = staff as Employee[];
  return (
    <PageContainer>
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />
        <StaffClient data={employee} />
      </div>
    </PageContainer>
  );
}
