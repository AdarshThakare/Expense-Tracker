import { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import { prepareExpenseLineChartData } from "../../utils/helper";
import CustomLineChart from "../Charts/CustomLineChart";

const ExpenseOverview = ({
  transactions,
  onAddExpense,
}: {
  transactions: any[];
  onAddExpense: any;
}) => {
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    const result = prepareExpenseLineChartData(transactions);
    setChartData(result);
    return () => {};
  }, [transactions]);

  return (
    <div className="card">
      <div>
        <div className="flex items-center justify-between">
          <h5 className="max-md:text-lg md:text-xl">Expense Overview</h5>
          <button className="add-btn" onClick={onAddExpense}>
            <LuPlus className="text-xl" />
            Add Expense
          </button>
        </div>

        <p className="max-md:text-xs md:text-md text-gray-400 mt-3">
          Track your earnings over time and analyse your expense trends.
        </p>
      </div>

      <div className="mt-10">
        <CustomLineChart data={chartData} />
      </div>
    </div>
  );
};

export default ExpenseOverview;
