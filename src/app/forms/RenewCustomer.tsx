"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CUSTOMER } from "@/types/customer";
import Loader from "@/components/common/Loader";

// Validation schema
const validationSchema = Yup.object({
    search: Yup.string().required("Search term is required"),
});

const RenewCustomer: React.FC = () => {
    const [customer, setCustomer] = useState<CUSTOMER | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const formik = useFormik({
        initialValues: {
            search: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            setLoading(true);
            const foundCustomer = await mockSearchCustomer(values.search);
            setCustomer(foundCustomer);
            setLoading(false);
        },
    });

    const handleRenew = () => {
        // Handle the renew action
        console.log("Customer renewed:", customer);
    };

    // Mock search function to simulate finding a customer
    const mockSearchCustomer = async (searchTerm: string) => {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        return { name: "John Doe", email: "john.doe@example.com", location: "Malindi", phone: "1234567890", payment: true, activation_date: "2024-07-12" };
    };

    return (
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">Renew Customer</h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
                <form onSubmit={formik.handleSubmit}>
                    <div>
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                            Search for Customer
                        </label>
                        <input
                            type="text"
                            name="search"
                            placeholder="Enter customer name or email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.search}
                            className={`w-full rounded-lg border-[1.5px] ${formik.touched.search && formik.errors.search ? "border-red-500" : "border-stroke"
                                } bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                        />
                        {formik.touched.search && formik.errors.search ? (
                            <div className="text-red-500">{formik.errors.search}</div>
                        ) : null}
                    </div>

                    <div className="mt-4">
                        <button
                            type="submit"
                            className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                        >
                            Search
                        </button>
                    </div>
                </form>
                {loading && <div className="flex items-center justify-center bg-white dark:bg-black">
                    <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
                </div>}

                {customer && (
                    <div className="mt-6">
                        <h4 className="text-lg font-medium text-black dark:text-white">Customer Details</h4>
                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <p className="text-black dark:text-white">Name: {customer.name}</p>
                            <p className="text-black dark:text-white">Email: {customer.email}</p>
                            <p className="text-black dark:text-white">Location: {customer.location}</p>
                            <p className="text-black dark:text-white">Phone: {customer.phone}</p>
                        </div>
                        <button
                            onClick={handleRenew}
                            className="mt-4 w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                        >
                            Renew Customer
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RenewCustomer;
