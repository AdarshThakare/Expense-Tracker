import { useEffect, useState } from "react";
import {
  prepareExpenseBarChartData,
  prepareIncomeBarChartData,
} from "../../utils/helper";

import MyLineChart from "../Charts/LineChart";
import { LuTrendingDown, LuTrendingUp } from "react-icons/lu";

const Last30DaysExpenses = ({
  data,
  incomeData,
}: {
  data: any[];
  incomeData: any[];
}) => {
  const [chartData, setChartData] = useState<any[]>([]);
  const [incomeChartData, setIncomeChartData] = useState<any[]>([]);

  useEffect(() => {
    const result = prepareExpenseBarChartData(data);
    setChartData(result);

    const answer = prepareIncomeBarChartData(incomeData);
    setIncomeChartData(answer);

    return () => {};
  }, [data]);
  return (
    <div className="card col-span-1 mt-4">
      <div className="flex items-center justify-between mb-8">
        <h5 className="max-md:text-lg md:text-2xl">
          Income v/s Expense Analysis
        </h5>
      </div>
      <MyLineChart
        data={incomeChartData}
        insetColor={"#875cf5"}
        offsetColor={"#ab8df8"}
      />
      <div className="flex items-center justify-center mb-8">
        <h5 className="max-md:text-sm md:text-lg">
          Income This Month{" "}
          <LuTrendingUp className="size-8 mb-1 ml-3 inline text-green-500" />
        </h5>
      </div>
      <hr className="mb-8 text-fuchsia-500" />
      <MyLineChart
        data={chartData}
        insetColor={"#ff6900"}
        offsetColor={"#ff9900"}
      />

      <div className="flex items-center justify-center ">
        <h5 className="max-md:text-sm text-lg">Expenses This Month</h5>
        <LuTrendingDown className="size-8 mb-1 ml-3 inline text-red-500" />
      </div>
    </div>
  );
};

export default Last30DaysExpenses;
