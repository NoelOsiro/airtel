'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton'; // Import Skeleton component
import { createClient } from '@/uitls/supabase/client';

const TotalRevenue = () => {
  const [currentMonthRevenue, setCurrentMonthRevenue] = useState<number | null>(
    null
  );
  const [percentageChange, setPercentageChange] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // New loading state
  const [error, setError] = useState<string | null>(null); // New error state
  const supabase = createClient();

  useEffect(() => {
    const fetchRevenueData = async () => {
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
          .from('total_revenue')
          .select('monthly_revenue')
          .eq('month_start', currentMonthStart.toISOString().split('T')[0])
          .single();

        const { data: previousData, error: previousError } = await supabase
          .from('total_revenue')
          .select('monthly_revenue')
          .eq('month_start', previousMonthStart.toISOString().split('T')[0])
          .single();

        if (currentError || previousError) {
          throw new Error(currentError?.message || previousError?.message);
        }

        const currentRevenue = currentData ? currentData.monthly_revenue : 0;
        const previousRevenue = previousData ? previousData.monthly_revenue : 0;

        setCurrentMonthRevenue(currentRevenue);

        if (previousRevenue !== 0) {
          const change =
            ((currentRevenue - previousRevenue) / previousRevenue) * 100;
          setPercentageChange(change);
        } else {
          setPercentageChange(null); // or 100% increase if you want to show that
        }
      } catch (error: any) {
        setError(
          error.message || 'An error occurred while fetching revenue data.'
        );
      } finally {
        setLoading(false); // Set loading to false once the data is fetched
      }
    };

    fetchRevenueData();
  }, [supabase]);

  const getChangeColor = () => {
    if (percentageChange === null) return 'text-muted-foreground';
    return percentageChange > 0 ? 'text-green-500' : 'text-red-500';
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
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
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
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
              Ksh {currentMonthRevenue !== null ? currentMonthRevenue : 'N/A'}
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

export default TotalRevenue;
