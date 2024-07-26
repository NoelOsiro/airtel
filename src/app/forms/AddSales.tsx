"use client";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import DatePickerOne from "@/components/FormElements/DatePicker/DatePickerOne";

// Validation schema
const validationSchema = Yup.object({
  agent: Yup.string().required("Agent is required"),
  accountNo: Yup.string().required("Account number is required"),
  date: Yup.string().required("Date is required"),
});

const AddSales: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      agent: "",
      accountNo: "",
      date: "",
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
        <h3 className="font-medium text-black dark:text-white">Add Sale</h3>
      </div>
      <div className="flex flex-col gap-5.5 p-6.5">
        <form onSubmit={formik.handleSubmit}>
          <div className="mt-4">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Agent
            </label>
            <select
              name="agent"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.agent}
              className={`w-full rounded-lg border-[1.5px] ${
                formik.touched.agent && formik.errors.agent ? "border-red-500" : "border-stroke"
              } bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
            >
              <option value="" label="Select agent" />
              <option value="3500" label="3,500" />
              <option value="5500" label="5,500" />
              <option value="7500" label="7,500" />
            </select>
            {formik.touched.agent && formik.errors.agent ? (
              <div className="text-red-500 mt-2">{formik.errors.agent}</div>
            ) : null}
          </div>
          <div className="mt-4">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Account Number
            </label>
            <input
              type="text"
              name="accountNo"
              placeholder="Enter your account number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.accountNo}
              className={`w-full rounded-lg border-[1.5px] ${
                formik.touched.accountNo && formik.errors.accountNo ? "border-red-500" : "border-stroke"
              } bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
            />
            {formik.touched.accountNo && formik.errors.accountNo ? (
              <div className="text-red-500 mt-2">{formik.errors.accountNo}</div>
            ) : null}
          </div>
          <div className="mt-4">
            <DatePickerOne
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.date}
            />
            {formik.touched.date && formik.errors.date ? (
              <div className="text-red-500 mt-2">{formik.errors.date}</div>
            ) : null}
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
            >
              Add Sale
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSales;
