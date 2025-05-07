import CustomPieChart from "../Charts/CustomPieChart";

interface FinProps {
  totalBalance: string;
  totalExpense: string;
  totalIncome: string;
}

export const COLORS = ["#875cf5", "#00BBA7", "#ff6900"];
const FinanceOverview = ({
  totalBalance,
  totalExpense,
  totalIncome,
}: FinProps) => {
  const balanceData = [
    { name: "Total Balance", amount: totalBalance },
    { name: "Total Income", amount: totalIncome },
    { name: "Total Expense", amount: totalExpense },
  ];

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-xl">Financial Overview</h5>
      </div>

      <CustomPieChart
        data={balanceData}
        label="Total Balance"
        totalAmount={`$${totalBalance}`}
        colors={COLORS}
        showTextAnchor={true}
      />
    </div>
  );
};

export default FinanceOverview;
