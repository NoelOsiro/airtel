'use client';
import * as z from 'zod';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useParams, useRouter } from 'next/navigation';
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
import { Router } from '@/constants/data';
import { AlertModal } from '../modal/alert-modal';

const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Product Name must be at least 3 characters' }),
  imei: z.string().length(15, { message: 'IMEI number must be 15 digits' }), // IMEI number with exact length of 15 digits
  dateInStore: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Date in store must be in YYYY-MM-DD format'
  }), // Date in store in YYYY-MM-DD format
  sold: z.boolean().optional()
});

type ProductFormValues = z.infer<typeof formSchema>;

interface ProductFormProps {
  initialData: Router | null;
}

export const RouterForm: React.FC<ProductFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
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
    const apiUrl =
      `${process.env.NEXT_PUBLIC_API_URL}/routers` ||
      'http://localhost:3000/api/routers';
    try {
      setLoading(true);
      if (initialData) {
        await axios.post(`${apiUrl}/edit-router?id=${initialData.id}`, data);
      } else {
        await axios.post(`${apiUrl}/create-router`, data);
      }
      router.refresh();
      router.push(`/dashboard/store`);
      toast({
        variant: 'default', // Success message
        title: 'Success!',
        description: toastMessage
      });
    } catch (error: any) {
      toast({
        variant: 'destructive', // Error message
        title: 'Uh oh! Something went wrong.',
        description:
          error?.response?.data?.message ||
          'There was a problem with your request.'
      });
    } finally {
      setLoading(false);
    }
  };
  const onDelete = async () => {
    try {
      setLoading(true);
      //   await axios.delete(`/api/${params.storeId}/products/${params.productId}`);
      router.refresh();
      router.push(`/${params.storeId}/products`);
    } catch (error: any) {
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
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
