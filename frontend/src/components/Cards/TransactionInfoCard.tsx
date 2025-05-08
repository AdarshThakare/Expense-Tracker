import {
  LuTrash2,
  LuTrendingDown,
  LuTrendingUp,
  LuUtensils,
} from "react-icons/lu";

const TransactionInfoCard = ({
  title,
  icon,
  date,
  amount,
  type,
  hideDeleteBtn,
  onDelete,
}: any) => {
  const getAmountStyles = () =>
    type === "income" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600";

  return (
    <div
      key={title}
      className="group relative flex items-center gap-4 max-md:pb-5 md:p-3 rounded-lg hover:bg-gray-100/60"
    >
      <div className="size-9 md:size-12 flex items-center justify-center text-xl text-gray-800 bg-fuchsia-100 rounded-full">
        {icon ? (
          <img src={icon} alt={title} className="max-md:size-4 md:size-6" />
        ) : (
          <LuUtensils className="max-md:size-4 md:size-6" />
        )}
      </div>
      <div className="flex-1 flex items-center justify-between">
        <div>
          <p className="max-md:text-sm md:text-md text-gray-700 font-medium">
            {title}
          </p>
          <p className="max-md:text-xs md:text-sm text-gray-500 mt-1 font-mono">
            {date}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {!hideDeleteBtn && (
          <button
            className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 tra sition-opacity duration-200 cursor-pointer"
            onClick={onDelete}
          >
            <LuTrash2 size={18} />
          </button>
        )}

        <div
          className={`flex items-center gap-1 md:gap-2 max-md:px-2 md:px-3 py-1.5 rounded-md ${getAmountStyles()}`}
        >
          <h6 className="max-md:text-sm md:text-md font-medium">
            {type === "income" ? "+" : "-"} ${amount}
          </h6>
          {type === "income" ? (
            <LuTrendingUp className="text-green-500" />
          ) : (
            <LuTrendingDown className="text-red-500" />
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionInfoCard;
