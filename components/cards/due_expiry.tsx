import React from 'react';
import { RecentCustomersDue } from '@/components/recent-sales';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
const SubscriptionExpiry = () => {
  return (
    <Card className="col-span-4 md:col-span-3">
      <CardHeader>
        <CardTitle>Due Expiry</CardTitle>
        <CardDescription>
          Remind Customers to renew their subscription
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RecentCustomersDue />
      </CardContent>
    </Card>
  );
};

export default SubscriptionExpiry;
