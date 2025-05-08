import { useContext, useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import IncomeOverview from "../../components/Income/IncomeOverview";
import axiosInstance from "../../utils/axios";
import { API_PATHS } from "../../utils/api";
import { UserContext } from "../../context/userContext";
import Modal from "../../components/Income/Modal";
import AddIncomeForm from "../../components/Income/AddIncomeForm";
import toast from "react-hot-toast";
import IncomeList from "../../components/Income/IncomeList";
import DeleteAlert from "../../components/Income/DeleteAlert";
import useUserAuth from "../../hooks/useUserAuth";
import { easeInOut, motion } from "framer-motion";
import { Audio } from "react-loader-spinner";

const Income = () => {
  useUserAuth();
  const [incomeData, setIncomeData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);

  //Get All Income Details
  const fetchIncomeDetails = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `${API_PATHS.INCOME.GET_ALL_INCOME}`
      );

      if (response.data) {
        setIncomeData(response.data);
      }
    } catch (err) {
      console.log("Something went wrong. Please try again.", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncomeDetails();
    return () => {};
  }, []);

  //Handle Add Income
  const handleAddIncome = async (income: any) => {
    const { source, amount, date, icon } = income;

    if (!source.trim()) {
      toast.error("Source is required");
      return;
    }

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Amount is required and it should be greater than 0");
      return;
    }

    if (!date) {
      toast.error("Invalid Date");
      return;
    }

    try {
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
        source,
        amount,
        date,
        icon,
      });

      setOpenAddIncomeModal(false);
      toast.success("Income added successfully.");
      fetchIncomeDetails();
    } catch (error: any) {
      console.error(
        "Error adding income:",
        error.response?.data?.message || error.message
      );
    }
  };

  //Delete Income
  const deleteIncome = async (id: any) => {
    try {
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id));
      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Income details are deleted successfullly");
      fetchIncomeDetails();
    } catch (err) {
      console.error(err);
    }
  };

  // handle download income details
  const handleDownloadIncomeDetails = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.INCOME.DOWNLOAD_INCOME,
        {
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "income_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      toast.error("Failed to download the income details");
    }
  };

  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error("User Context not found!");
  }

  const { user } = userContext;

  return (
    <DashboardLayout activeMenu="Income">
      {!loading && user && (
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            delay: 0.2,
            staggerChildren: 0.2,
            ease: easeInOut,
            duration: 0.2,
          }}
          className="my-5 mx-auto"
        >
          <div className="grid grid-cols-1 gap-6">
            <div className="">
              <IncomeOverview
                transactions={incomeData}
                onAddIncome={() => {
                  setOpenAddIncomeModal(true);
                }}
              />
            </div>

            <IncomeList
              transactions={incomeData}
              onDelete={(id: any) => {
                setOpenDeleteAlert({ show: true, data: id });
              }}
              onDownload={handleDownloadIncomeDetails}
            />
          </div>
          <Modal
            isOpen={openAddIncomeModal}
            onClose={() => setOpenAddIncomeModal(false)}
            title="Add Income"
          >
            <AddIncomeForm onAddIncome={handleAddIncome} />
          </Modal>

          <Modal
            isOpen={openDeleteAlert.show}
            onClose={() => setOpenDeleteAlert({ show: false, data: null })}
            title="Delete Income"
          >
            <DeleteAlert
              content="Are you sure you want to delete this income detail?
               Note that this action cannot be undone!"
              onDelete={() => deleteIncome(openDeleteAlert.data)}
            />
          </Modal>
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

export default Income;
