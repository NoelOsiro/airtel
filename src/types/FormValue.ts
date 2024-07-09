// FormValues.ts
export interface FormValues {
    name: string;
    phone_no: string;
    email: string;
    address: string;
    package: string;
    subscription_date: Date | null;
    expiry_date: Date | null;
    router?: string;
  }