import { useEffect, useState } from "react";
import { prepareExpenseLineChartData } from "../../utils/helper";
import CustomBarChart from "../Charts/CustomBarChart";

const ExpenseBarGraph = ({ transactions }: any) => {
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    const result = prepareExpenseLineChartData(transactions);
    setChartData(result);
    return () => {};
  }, [transactions]);
  return (
    <div className="card h-full">
      <div className="mt-10 size-full">
        <CustomBarChart data={chartData} />
      </div>
    </div>
  );
};

export default ExpenseBarGraph;
