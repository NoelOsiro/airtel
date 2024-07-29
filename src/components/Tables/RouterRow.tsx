import { ROUTER } from "@/types/router";


interface RouterRowProps {
  router: ROUTER;
  onEdit: (router: ROUTER) => void;
}

const RouterRow = ({ router, onEdit }: RouterRowProps) => {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-5 border-b border-stroke dark:border-strokedark">
      <div className="flex items-center gap-3 p-2.5 xl:p-5">
        <p className="hidden text-black dark:text-white sm:block">{router.account_no}</p>
      </div>
      <div className="flex items-center justify-center p-2.5 xl:p-5">
        <p className="text-black dark:text-white">{router.odu_no}</p>
      </div>
      <div className="flex items-center justify-center p-2.5 xl:p-5">
        <p className="text-meta-3">{router.package}</p>
      </div>
      <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
        <p className="text-meta-5">{router.created_at.split('T')[0]}</p>
      </div>
      <div className="flex items-center justify-center p-2.5 xl:p-5">
        <button
          onClick={() => onEdit(router)}
          className="text-blue-500 hover:underline dark:text-blue-400"
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default RouterRow;
