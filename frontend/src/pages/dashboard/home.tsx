import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import useUserAuth from "../../hooks/useUserAuth";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axios";
import { API_PATHS } from "../../utils/api";
import InfoCard from "../../components/Cards/InfoCard";
import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";
import { IoMdCard } from "react-icons/io";
import { addThousandsSeparator } from "../../utils/helper";
import RecentTransactions from "../../components/Dashboard/RecentTransactions";
import FinanceOverview from "../../components/Dashboard/FinanceOverview";
import ExpenseTransactions from "../../components/Dashboard/ExpenseTransactions";
import Last30DaysExpenses from "../../components/Dashboard/Last30DaysExpenses";
import RecentIncomeWithChart from "../../components/Dashboard/RecentIncomeWithChart";
import RecentIncome from "../../components/Dashboard/RecentIncome";
import ExpenseBarGraph from "../../components/Dashboard/ExpenseBarGraph";
import { easeInOut, motion } from "framer-motion";
import { Audio } from "react-loader-spinner";

const Home = () => {
  useUserAuth();

  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    setLoading(true);

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.DASHBOARD.GET_DATA}`
      );

      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (err) {
      console.log("Something went wrong. Please try again.", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    return () => {};
  }, []);

  return (
    <DashboardLayout activeMenu="Dashboard">
      {!loading && (
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            delay: 0.2,
            staggerChildren: 0.2,
            ease: easeInOut,
            duration: 0.4,
          }}
          className="my-5 mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <InfoCard
              icon={<IoMdCard />}
              label="Total Balance"
              value={addThousandsSeparator(dashboardData?.totalBalance || 0)}
              color="bg-primary"
            />
            <InfoCard
              icon={<LuWalletMinimal />}
              label="Total Income"
              value={addThousandsSeparator(dashboardData?.totalIncome || 0)}
              color="bg-teal-500"
            />
            <InfoCard
              icon={<LuHandCoins />}
              label="Total Expense"
              value={addThousandsSeparator(dashboardData?.totalExpense || 0)}
              color="bg-orange-500"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
            <RecentTransactions
              transactions={dashboardData?.recentTransactions || []}
              onSeeMore={() => navigate("/expense")}
            />

            <FinanceOverview
              totalBalance={dashboardData?.totalBalance || 0}
              totalIncome={dashboardData?.totalIncome || 0}
              totalExpense={dashboardData?.totalExpense || 0}
            />
          </div>

          <Last30DaysExpenses
            data={dashboardData?.last30DaysExpense?.transactions || []}
            incomeData={dashboardData?.last60DaysIncome?.transactions || []}
          />

          <div className="grid grid-cols-1 md:grid-cols-15 gap-6 mt-5">
            <div className="max-md:col-span-8 md:col-span-7">
              <ExpenseTransactions
                transactions={
                  dashboardData?.last30DaysExpense?.transactions || []
                }
                onSeeMore={() => navigate("/expense")}
              />
            </div>
            <div className="col-span-8">
              <ExpenseBarGraph
                transactions={
                  dashboardData?.last30DaysExpense?.transactions || []
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-15 gap-6 mt-5">
            <div className="col-span-8">
              <RecentIncomeWithChart
                data={
                  dashboardData?.last60DaysIncome?.transactions?.slice(0, 4) ||
                  []
                }
                totalIncome={dashboardData?.totalIncome || 0}
              />
            </div>
            <div className="max-md:col-span-8 md:col-span-7">
              <RecentIncome
                transactions={
                  dashboardData?.last60DaysIncome?.transactions || []
                }
                onSeeMore={() => navigate("/income")}
              />
            </div>
          </div>
        </motion.div>
      )}
      {loading && (
        <div className="flex flex-col items-center justify-center w-full h-screen pb-30">
          <Audio height="80" width="80" color="#875cf5" ariaLabel="loading" />
          <motion.h3
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="text-xl font-mono mt-4 ml-5"
          >
            LOADING...
          </motion.h3>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Home;
