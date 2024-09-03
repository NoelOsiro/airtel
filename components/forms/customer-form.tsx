'use client';
import * as z from 'zod';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Trash } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
// import FileUpload from "@/components/FileUpload";
import { useToast } from '../ui/use-toast';
import { AlertModal } from '../modal/alert-modal';
import { Customer } from '@/constants/data';
import axios from 'axios';
// import FileUpload from '../file-upload';

const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Product Name must be at least 3 characters' }),
  email: z.string().email({ message: 'Invalid email address' }),
  phone: z.string().length(10, { message: 'Phone number must be 10 digits' }),
  county: z
    .string()
    .min(3, { message: 'Address must be at least 3 characters' }),
  city: z.string().min(3, { message: 'City must be at least 3 characters' }),
  account: z
    .string()
    .min(3, { message: 'Account must be at least 3 characters' }),
  activationDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Date activated must be in YYYY-MM-DD format'
  }), // Date activated in YYYY-MM-DD format
  package: z.string().min(1, { message: 'Please select a package' })
});

type ProductFormValues = z.infer<typeof formSchema>;

interface ProductFormProps {
  initialData: Customer | null;
  categories: any;
}

export const CustomerForm: React.FC<ProductFormProps> = ({
  initialData,
  categories
}) => {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [imgLoading, setImgLoading] = useState(false);
  const title = initialData ? 'Edit Customer' : 'Create Customer';
  const description = initialData ? 'Edit a Customer.' : 'Add a new Customer';
  const toastMessage = initialData ? 'Customer updated.' : 'Customer created.';
  const action = initialData ? 'Save changes' : 'Create';

  const defaultValues = initialData
    ? {
        name: initialData.name,
        email: initialData.email,
        phone: initialData.phone,
        county: initialData.county,
        city: initialData.city,
        account: initialData.account,
        activationDate: initialData.activationDate,
        package: initialData.package
      }
    : {
        name: '',
        email: '',
        phone: '',
        county: '',
        city: '',
        account: '',
        activationDate: '',
        package: ''
      };

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues // Explicitly assign defaultValues here
  });

  const onSubmit = async (data: ProductFormValues) => {
    const apiUrl =
      `${process.env.NEXT_PUBLIC_API_URL}/customers` ||
      'http://localhost:3000/api/customers';
    try {
      setLoading(true);
      if (initialData) {
        await axios.post(`${apiUrl}/edit-customer?${initialData.id}`, {
          ...data,
          packageName: data.package
        });
      } else {
        await axios.post(`${apiUrl}/create-customer`, {
          ...data,
          packageName: data.package
        });
      }
      router.refresh();
      router.push(`/dashboard/customers`);
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
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      disabled={loading}
                      placeholder="Email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input type="phone" disabled={loading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="county"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>County</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="City" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="account"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Account"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="activationDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date Activated</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="YYYY-MM-DD"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="package"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Package</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a package"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {/* @ts-ignore  */}
                      {categories.map((category) => (
                        <SelectItem key={category._id} value={category._id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
