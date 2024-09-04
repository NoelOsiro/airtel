'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton'; // Import Skeleton component
import { createClient } from '@/uitls/supabase/client';

const TotalSales = () => {
  const [currentMonthSubscriptions, setCurrentMonthSubscriptions] = useState<
    number | null
  >(null);
  const [percentageChange, setPercentageChange] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // New loading state
  const [error, setError] = useState<string | null>(null); // New error state
  const supabase = createClient();

  useEffect(() => {
    const fetchSubscriptionData = async () => {
      try {
        const today = new Date();
        const currentMonthStart = new Date(
          today.getFullYear(),
          today.getMonth(),
          6
        );
        const previousMonthStart = new Date(
          today.getFullYear(),
          today.getMonth() - 1,
          6
        );

        const { data: currentData, error: currentError } = await supabase
          .from('total_revenue') // Assuming you're storing subscriptions in the same table
          .select('subscriptions')
          .eq('month_start', currentMonthStart.toISOString().split('T')[0])
          .single();

        const { data: previousData, error: previousError } = await supabase
          .from('total_revenue') // Assuming you're storing subscriptions in the same table
          .select('subscriptions')
          .eq('month_start', previousMonthStart.toISOString().split('T')[0])
          .single();

        if (currentError || previousError) {
          throw new Error(currentError?.message || previousError?.message);
        }

        const currentSubscriptions = currentData
          ? currentData.subscriptions
          : 0;
        const previousSubscriptions = previousData
          ? previousData.subscriptions
          : 0;

        setCurrentMonthSubscriptions(currentSubscriptions);

        if (previousSubscriptions !== 0) {
          const change =
            ((currentSubscriptions - previousSubscriptions) /
              previousSubscriptions) *
            100;
          setPercentageChange(change);
        } else {
          setPercentageChange(null); // or 100% increase if you want to show that
        }
      } catch (error: any) {
        setError(
          error.message || 'An error occurred while fetching subscription data.'
        );
      } finally {
        setLoading(false); // Set loading to false once the data is fetched
      }
    };

    fetchSubscriptionData();
  }, [supabase]);

  const getChangeColor = () => {
    if (percentageChange === null) return 'text-muted-foreground';
    return percentageChange > 0 ? 'text-green-500' : 'text-red-500';
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Sales</CardTitle>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="h-4 w-4 text-muted-foreground"
        >
          <rect width="20" height="14" x="2" y="5" rx="2" />
          <path d="M2 10h20" />
        </svg>
      </CardHeader>
      <CardContent>
        {loading ? (
          <Skeleton className="h-12 w-full" />
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <>
            <div className="text-2xl font-bold">
              +
              {currentMonthSubscriptions !== null
                ? currentMonthSubscriptions
                : 'N/A'}
            </div>
            <p className={`text-xs ${getChangeColor()}`}>
              {percentageChange !== null
                ? `${percentageChange > 0 ? '+' : ''}${percentageChange.toFixed(
                    1
                  )}% from last month`
                : 'No data from last month'}
            </p>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default TotalSales;
