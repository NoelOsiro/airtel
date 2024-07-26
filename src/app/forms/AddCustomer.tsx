"use client";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

// Validation schema
const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    package: Yup.string().required("Package is required"),
    phone: Yup.string().matches(/^\d{10}$/, "Phone number must be 10 digits").required("Phone number is required"),
    accountNo: Yup.string().required("Account number is required"),
});

const AddCustomer: React.FC = () => {
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            package: "",
            phone: "",
            accountNo: '',
        },
        validationSchema,
        onSubmit: (values) => {
            // Handle form submission
            console.log("Form values:", values);
        },
    });

    return (
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">Add Customer</h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
                <form onSubmit={formik.handleSubmit}>
                    <div className="mt-4">
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.name}
                            className={`w-full rounded-lg border-[1.5px] ${formik.touched.name && formik.errors.name ? "border-red-500" : "border-stroke"
                                } bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                        />
                        {formik.touched.name && formik.errors.name ? (
                            <div className="text-red-500 mt-2">{formik.errors.name}</div>
                        ) : null}
                    </div>

                    <div className="mt-4">
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            className={`w-full rounded-lg border-[1.5px] ${formik.touched.email && formik.errors.email ? "border-red-500" : "border-stroke"
                                } bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <div className="text-red-500 mt-2">{formik.errors.email}</div>
                        ) : null}
                    </div>

                    <div className="mt-4">
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                            Package
                        </label>
                        <select
                            name="package"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.package}
                            className={`w-full rounded-lg border-[1.5px] ${formik.touched.package && formik.errors.package ? "border-red-500" : "border-stroke"
                                } bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                        >
                            <option value="" label="Select package" />
                            <option value="3,500" label="3,500" />
                            <option value="5,500" label="5,500" />
                            <option value="7,500" label="7,500" />
                        </select>
                        {formik.touched.package && formik.errors.package ? (
                            <div className="text-red-500 mt-2">{formik.errors.package}</div>
                        ) : null}
                    </div>
                    <div className="mt-4">
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                            Acoount Number
                        </label>
                        <input
                            type="accountNo"
                            name="accountNo"
                            placeholder="Enter your accountNo"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.accountNo}
                            className={`w-full rounded-lg border-[1.5px] ${formik.touched.accountNo && formik.errors.accountNo ? "border-red-500" : "border-stroke"
                                } bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                        />
                        {formik.touched.accountNo && formik.errors.accountNo ? (
                            <div className="text-red-500 mt-2">{formik.errors.accountNo}</div>
                        ) : null}
                    </div>
                    <div className="mt-4">
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                            Phone
                        </label>
                        <input
                            type="text"
                            name="phone"
                            placeholder="Enter your phone number"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.phone}
                            className={`w-full rounded-lg border-[1.5px] ${formik.touched.phone && formik.errors.phone ? "border-red-500" : "border-stroke"
                                } bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                        />
                        {formik.touched.phone && formik.errors.phone ? (
                            <div className="text-red-500 mt-2">{formik.errors.phone}</div>
                        ) : null}
                    </div>

                    <div className="mt-4">
                        <button
                            type="submit"
                            className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                        >
                            Add Customer
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddCustomer;
