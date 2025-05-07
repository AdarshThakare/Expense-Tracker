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
      className="group relative flex items-center gap-4 p-3 rounded-lg hover:bg-gray-100/60"
    >
      <div className="size-12 flex items-center justify-center text-xl text-gray-800 bg-fuchsia-100 rounded-full">
        {icon ? (
          <img src={icon} alt={title} className="size-6" />
        ) : (
          <LuUtensils />
        )}
      </div>
      <div className="flex-1 flex items-center justify-between">
        <div>
          <p className="text-md text-gray-700 font-medium">{title}</p>
          <p className="text-sm text-gray-500 mt-1 font-mono">{date}</p>
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
          className={`flex items-center gap-2 px-3 py-1.5 rounded-md ${getAmountStyles()}`}
        >
          <h6 className="text-md font-medium">
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
