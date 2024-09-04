import ActiveCustomers from '@/components/cards/active_customers';
import SubscriptionExpiry from '@/components/cards/due_expiry';
import TotalRevenue from '@/components/cards/total-revenue';
import TotalSales from '@/components/cards/total-sales';
import TotalSubscriptions from '@/components/cards/total-subscriptions';
import { AreaGraph } from '@/components/charts/area-graph';
import { BarGraph } from '@/components/charts/bar-graph';
import { PieGraph } from '@/components/charts/pie-graph';
import { CalendarDateRangePicker } from '@/components/date-range-picker';
import PageContainer from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Heading = () => {
  return (
    <div className="flex items-center justify-between space-y-2">
      <h2 className="text-2xl font-bold tracking-tight">Hi, Welcome back 👋</h2>
      <div className="hidden items-center space-x-2 md:flex">
        <CalendarDateRangePicker />
        <Button>Download</Button>
      </div>
    </div>
  );
};
export default function page() {
  return (
    <PageContainer scrollable={true}>
      <div className="space-y-2">
        <Heading />
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics" disabled>
              Analytics
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <TotalRevenue />
              <TotalSubscriptions />
              <TotalSales />
              <ActiveCustomers />
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
              <div className="col-span-4">
                <BarGraph />
              </div>
              <SubscriptionExpiry />
              <div className="col-span-4">
                <AreaGraph />
              </div>
              <div className="col-span-4 md:col-span-3">
                <PieGraph />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
}
