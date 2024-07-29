import { useFormik } from 'formik';
import * as Yup from 'yup';
import { CUSTOMER } from "@/types/customer";

interface EditModalProps {
  customer: CUSTOMER | null;
  onClose: () => void;
  onSave: (updatedCustomer: CUSTOMER) => void;
}

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  phone: Yup.string().required('Phone number is required'),
  location: Yup.string().required('Location is required'),
  email: Yup.string().email('Invalid email address'),
  payment: Yup.boolean(),
  activation_date: Yup.date().required('Activation date is required').nullable(),
});

const EditModal = ({ customer, onClose, onSave }: EditModalProps) => {
  const formik = useFormik({
    initialValues: {
      name: customer?.name || '',
      phone: customer?.phone || '',
      location: customer?.location || '',
      payment: customer?.payment || false,
      activation_date: customer?.activation_date || '',
      email: customer?.email || '',
    },
    validationSchema,
    onSubmit: (values) => {
      if (customer) {
        onSave({ ...customer, ...values });
      }
      onClose();
    },
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 shadow-lg dark:bg-gray-800">
        <h3 className="text-xl font-semibold mb-4">Edit Customer</h3>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="flex flex-col gap-4 xl:w-1/2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
              <input
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full mt-1 rounded border ${formik.touched.name && formik.errors.name ? 'border-red-500' : 'border-gray-300'} dark:border-gray-600 p-2`}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="text-red-500 text-sm">{formik.errors.name}</div>
              ) : null}
            </div>
            <div className="flex flex-col gap-4 xl:w-1/2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone</label>
              <input
                type="text"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full mt-1 rounded border ${formik.touched.phone && formik.errors.phone ? 'border-red-500' : 'border-gray-300'} dark:border-gray-600 p-2`}
              />
              {formik.touched.phone && formik.errors.phone ? (
                <div className="text-red-500 text-sm">{formik.errors.phone}</div>
              ) : null}
            </div>
          </div>
          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="flex flex-col gap-4 xl:w-1/2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
              <input
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full mt-1 rounded border ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'} dark:border-gray-600 p-2`}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500 text-sm">{formik.errors.email}</div>
              ) : null}
            </div>
            <div className="flex flex-col gap-4 xl:w-1/2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Location</label>
              <input
                type="text"
                name="location"
                value={formik.values.location}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full mt-1 rounded border ${formik.touched.location && formik.errors.location ? 'border-red-500' : 'border-gray-300'} dark:border-gray-600 p-2`}
              />
              {formik.touched.location && formik.errors.location ? (
                <div className="text-red-500 text-sm">{formik.errors.location}</div>
              ) : null}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Payment</label>
            <input
              type="checkbox"
              name="payment"
              checked={formik.values.payment}
              onChange={formik.handleChange}
              className="mt-1"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Activation Date</label>
            <input
              type="date"
              name="activation_date"
              value={formik.values.activation_date}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full mt-1 rounded border ${formik.touched.activation_date && formik.errors.activation_date ? 'border-red-500' : 'border-gray-300'} dark:border-gray-600 p-2`}
            />
            {formik.touched.activation_date && formik.errors.activation_date ? (
              <div className="text-red-500 text-sm">{formik.errors.activation_date}</div>
            ) : null}
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded dark:bg-gray-700 dark:text-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 dark:bg-blue-400 dark:hover:bg-blue-500"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
