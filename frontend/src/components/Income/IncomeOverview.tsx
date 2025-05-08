import { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import { prepareIncomeBarChartData } from "../../utils/helper";
import CustomBarChart from "../Charts/CustomBarChart";

const IncomeOverview = ({
  transactions,
  onAddIncome,
}: {
  transactions: any[];
  onAddIncome: any;
}) => {
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    const result = prepareIncomeBarChartData(transactions);
    setChartData(result);
    return () => {};
  }, [transactions]);

  return (
    <div className="card">
      <div>
        <div className="flex items-center justify-between">
          <h5 className="max-md:text-lg md:text-xl">Income Overview</h5>
          <button className="add-btn" onClick={onAddIncome}>
            <LuPlus className="text-xl" />
            Add Income
          </button>
        </div>

        <p className="max-md:text-xs md:text-md text-gray-400 mt-3">
          Track your earnings over time and analyse your income trends.
        </p>
      </div>

      <div className="mt-10">
        <CustomBarChart data={chartData} />
      </div>
    </div>
  );
};

export default IncomeOverview;
