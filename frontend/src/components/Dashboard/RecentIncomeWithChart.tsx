import { useEffect, useState } from "react";
import CustomPieChart from "../Charts/CustomPieChart";

const COLORS = ["#875cf5", "#fa2c47", "#ff9900", "#00BBA7"];
const RecentIncomeWithChart = ({
  data,
  totalIncome,
}: {
  data: any[];
  totalIncome: number;
}) => {
  const [chartData, setChartData] = useState<any[]>([]);

  const prepareChartData = () => {
    const dataArr = data?.map((item: any) => ({
      name: item.source,
      amount: item.amount,
    }));
    setChartData(dataArr);
  };

  useEffect(() => {
    prepareChartData();
    return () => {};
  }, [data]);

  return (
    <div className="card h-full">
      <div className="flex items-center justify-between">
        <h5 className="text-xl">Income This Month</h5>
      </div>

      <CustomPieChart
        data={chartData}
        label="Total Income"
        totalAmount={`$${totalIncome}`}
        showTextAnchor
        colors={COLORS}
      />
    </div>
  );
};

export default RecentIncomeWithChart;
