import { LuArrowRight } from "react-icons/lu";
import moment from "moment";
import TransactionInfoCard from "../Cards/TransactionInfoCard";

interface RecentIncomeProps {
  transactions: any[];
  onSeeMore: () => void;
}

const RecentIncome = ({ transactions, onSeeMore }: RecentIncomeProps) => {
  return (
    <div className="relative right-6 md:w-full! card">
      <div className="flex items-center justify-between">
        <h5 className="text-xl">Income</h5>
        <button className="card-btn" onClick={onSeeMore}>
          See All <LuArrowRight className="text-base" />
        </button>
      </div>
      <div className="mt-6">
        {transactions?.slice(0, 5)?.map((item: any, index: number) => (
          <TransactionInfoCard
            key={index}
            title={item.source}
            icon={item.icon}
            date={moment(item.date).format("Do MMM YYYY")}
            amount={item.amount}
            type="income"
            hideDeleteBtn
          />
        ))}
      </div>
    </div>
  );
};

export default RecentIncome;
