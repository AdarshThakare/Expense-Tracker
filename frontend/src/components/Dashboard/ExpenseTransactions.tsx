import { LuArrowRight } from "react-icons/lu";
import moment from "moment";
import TransactionInfoCard from "../Cards/TransactionInfoCard";

interface ExpenseTransactionsProps {
  transactions: any[];
  onSeeMore: () => void;
}

const ExpenseTransactions = ({
  transactions,
  onSeeMore,
}: ExpenseTransactionsProps) => {
  return (
    <div className="md:w-full! card">
      <div className="flex items-center justify-between">
        <h5 className="text-xl">Expenses</h5>
        <button className="card-btn" onClick={onSeeMore}>
          See All <LuArrowRight className="text-base" />
        </button>
      </div>
      <div className="mt-6">
        {transactions?.slice(0, 5)?.map((item: any, index: number) => (
          <TransactionInfoCard
            key={index}
            title={item.category}
            icon={item.icon}
            date={moment(item.date).format("Do MMM YYYY")}
            amount={item.amount}
            type="expense"
            hideDeleteBtn
          />
        ))}
      </div>
    </div>
  );
};

export default ExpenseTransactions;
