'use client';
import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { type FormValues } from '@/types/FormValue';
import { CustomerForm } from './customers-form';
import { RouterForm } from './router-select-form';
import dayjs from 'dayjs';

interface ModalProps {
  open: boolean;
  close: () => void;
}

export function CustomersModal({ open, close }: ModalProps): React.JSX.Element {
  const [isCustomerFormSubmitted, setCustomerFormSubmitted] = React.useState(false);
  const [values, setValues] = React.useState<FormValues>({
    name: '',
    phone_no: '',
    email: '',
    address: '',
    package: '',
    subscription_date: new Date(), // Default to current date
    expiry_date: dayjs().add(30, 'day').toDate(),
    router:''
  });

  const handleCustomerSubmit = (data: FormValues) => {
    console.log(data);
    setValues(data);
    setCustomerFormSubmitted(true);
  };
  const handleRouterSubmit = (data: FormValues) => {

    // Convert subscription_date to ISO 8601 format
    const subscription_date = dayjs(data.subscription_date).toISOString();

    // Calculate expiry date to be 30 days from subscription_date
    const expiry = dayjs(subscription_date).add(30, 'day').toISOString();
    const customerData = { ...values, ...data, subscription_date, expiry };

    // post form data to /api/customers
    fetch('/api/customers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customerData),
    }).then((response) => {
      if (response.status === 200) {
        if (close) close();
      }
    });
  };

  return (
    <Dialog open={open} fullWidth maxWidth="sm">
      <DialogTitle>Add Customer</DialogTitle>
      {!isCustomerFormSubmitted ? (
        <CustomerForm onSubmit={handleCustomerSubmit} close={close} />
      ) : (
        <RouterForm onSubmit={handleRouterSubmit} values={values} />
      )}
    </Dialog>
  );
}
