'use client';

import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

import { Skeleton } from '@/components/ui/skeleton'; // Use the existing Skeleton component
import { createClient } from '@/uitls/supabase/client';
import { Customer } from '@/constants/data';

export function RecentCustomersDue() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const today = new Date();
        const startDay = today.getDate();
        const endDay = startDay + 4;

        // Fetch all customers
        const { data, error } = await supabase
          .from('customers')
          .select('id, name, email, package, activationDate, phone');
        if (error) throw error;
        const upcomingCustomers = data.filter((customer) => {
          const activationDate = new Date(customer.activationDate);
          const activationDay = activationDate.getDate();
          return (
            activationDay >= startDay && // Start date is today
            activationDay < endDay // End date is within the next 4 days
          );
        });
        setCustomers(upcomingCustomers as Customer[]);
      } catch (error: any) {
        setError(
          error.message || 'An error occurred while fetching customers.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, [supabase]);

  if (loading) {
    return <Skeleton className="h-64 w-full" />;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="h-96 space-y-8 overflow-y-auto">
      {customers.map((customer) => (
        <div key={customer.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarFallback>{customer.name[0]}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{customer.name}</p>
            <p className="text-sm text-muted-foreground">{customer.phone}</p>
          </div>
          <div className="ml-auto font-medium">
            Date: {customer.activationDate}
          </div>
        </div>
      ))}
    </div>
  );
}
