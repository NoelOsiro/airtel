import { type FormValues } from '@/types/FormValue';
import * as yup from 'yup';

export const validationSchema: yup.Schema<FormValues> = yup.object({
  name: yup.string().required('Name is required'),
  phone_no: yup.string().required('Phone is required'),
  email: yup.string().email('Enter a valid email').required('Email is required'),
  address: yup.string().required('Address is required'),
  package: yup.string().required('Package is required'),
  subscription_date: yup.date().required('Subscription date is required').nullable(),
  expiry_date: yup.date().required('Subscription date is required').nullable(),
  router: yup.string().default('Account not found'),
});
