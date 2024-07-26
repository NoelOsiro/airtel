
import { CUSTOMER } from "@/types/customer";

const customerData: CUSTOMER[] = [
  {
    name: "Google",
    phone: '0729732440',
    accountNo: "5,768",
    date: "2024-07-12",
    package: '3,500',
    email: 'osiroski@gmail.com'
  },
  {
    name: "Twitter",
    phone: '0729732440',
    accountNo: "4,635",
    date: "2024-07-12",
    package: '3,500',
    email: 'osiroski@gmail.com'
  },
  {
    name: "Github",
    phone: '0729732440',
    accountNo: "4,290",
    date: "2024-07-12",
    package: '3,500',
    email: 'osiroski@gmail.com'
  },
  {
    name: "Vimeo",
    phone: '0729732440',
    accountNo: "3,580",
    date: "2024-07-12",
    package: '3,500',
    email: 'osiroski@gmail.com'
  },
  {
    name: "Facebook",
    phone: '0729732440',
    accountNo: "6,768",
    date: "2024-07-12",
    package: '3,500',
    email: 'osiroski@gmail.com'
  },
];

const SalesTable = () => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Top Sales
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Name
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Phone
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Account No.
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Package
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Date
            </h5>
          </div>
        </div>

        {customerData.map((customer, key) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-5 ${key === customerData.length - 1
                ? ""
                : "border-b border-stroke dark:border-strokedark"
              }`}
            key={key}
          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <p className="hidden text-black dark:text-white sm:block">
                {customer.name}
              </p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{customer.phone}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-3">{customer.accountNo}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white">Ksh {customer.package}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-meta-5">{customer.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalesTable;
