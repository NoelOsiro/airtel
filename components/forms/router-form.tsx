'use client';
import * as z from 'zod';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { Heading } from '@/components/ui/heading';
import { useToast } from '../ui/use-toast';

const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Product Name must be at least 3 characters' }),
  imei: z.string().length(15, { message: 'IMEI number must be 15 digits' }), // IMEI number with exact length of 15 digits
  dateInStore: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: 'Date in store must be in YYYY-MM-DD format'
    }), // Date in store in YYYY-MM-DD format
  sold: z.boolean().optional()
});

type ProductFormValues = z.infer<typeof formSchema>;

interface ProductFormProps {
  initialData: ProductFormValues | null;
}

export const RouterForm: React.FC<ProductFormProps> = ({ initialData }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const title = initialData ? 'Edit Router' : 'Add Router';
  const description = initialData ? 'Edit a Router.' : 'Add a new Router';
  const toastMessage = initialData ? 'Router updated.' : 'Router created.';
  const action = initialData ? 'Save changes' : 'Create';

  const defaultValues = initialData
    ? initialData
    : {
        name: '',
        imei: '',
        dateInStore: '',
        sold: false
      };

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const onSubmit = async (data: ProductFormValues) => {
    try {
      setLoading(true);

      if (initialData) {
        // await axios.post(`/api/products/edit-product/${initialData._id}`, data);
      } else {
        // Sending data to create a new router
        const response = await axios.post(`/api/routers/create-router`, data);

        // Show success message
        toast({
          variant: 'default',
          title: 'Success!',
          description: toastMessage
        });

        // Refresh the router and redirect
        router.refresh();
        router.push(`/dashboard/products`);
      }
    } catch (error: any) {
      // Determine the error message from the Axios error
      const errorMessage =
        error.response?.data?.error || 'There was a problem with your request.';

      // Show error message
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: errorMessage
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <div className="gap-8 md:grid md:grid-cols-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Product name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imei"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>IMEI Number</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="IMEI number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dateInStore"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date In Store</FormLabel>
                  <FormControl>
                    <Input type="date" disabled={loading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sold"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-8">
                  <FormLabel>Sold</FormLabel>
                  <FormControl>
                    <Input
                      type="checkbox"
                      disabled={loading}
                      checked={field.value}
                      onChange={field.onChange}
                      className="h-4 w-4" // Adjusted the size to be a bit smaller and consistent
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
