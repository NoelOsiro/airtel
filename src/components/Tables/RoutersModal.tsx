import { ROUTER } from '@/types/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface EditModalProps {
  router: ROUTER | null;
  onClose: () => void;
  onSave: (updatedCustomer: ROUTER) => void;
}

const validationSchema = Yup.object({
  odu_no: Yup.string().required('Required'),
  package: Yup.string().required('Required is required'),
  account_no: Yup.string().required('Required'),
});

const EditRouterModal = ({ router, onClose, onSave }: EditModalProps) => {
  const formik = useFormik({
    initialValues: {
      odu_no: router?.odu_no || '',
      package: router?.package || '',
      account_no: router?.account_no || '',
    },
    validationSchema,
    onSubmit: (values) => {
      if (router) {
        onSave({ ...router, ...values });
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
                name="odu_no"
                value={formik.values.odu_no}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full mt-1 rounded border ${formik.touched.odu_no && formik.errors.odu_no ? 'border-red-500' : 'border-gray-300'} dark:border-gray-600 p-2`}
              />
              {formik.touched.odu_no && formik.errors.odu_no ? (
                <div className="text-red-500 text-sm">{formik.errors.odu_no}</div>
              ) : null}
            </div>
            <div className="flex flex-col gap-4 xl:w-1/2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Package</label>
              <input
                type="text"
                name="package"
                value={formik.values.package}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full mt-1 rounded border ${formik.touched.package && formik.errors.package ? 'border-red-500' : 'border-gray-300'} dark:border-gray-600 p-2`}
              />
              {formik.touched.package && formik.errors.package ? (
                <div className="text-red-500 text-sm">{formik.errors.package}</div>
              ) : null}
            </div>
          </div>
          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="flex flex-col gap-4 xl:w-1/2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Account Number</label>
              <input
                type="text"
                name="account_no"
                value={formik.values.account_no}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full mt-1 rounded border ${formik.touched.account_no && formik.errors.account_no ? 'border-red-500' : 'border-gray-300'} dark:border-gray-600 p-2`}
              />
              {formik.touched.account_no && formik.errors.account_no ? (
                <div className="text-red-500 text-sm">{formik.errors.account_no}</div>
              ) : null}
            </div>
            
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

export default EditRouterModal;
