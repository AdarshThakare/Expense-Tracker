import { useContext, useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import useUserAuth from "../../hooks/useUserAuth";
import { UserContext } from "../../context/userContext";
import axiosInstance from "../../utils/axios";
import { API_PATHS } from "../../utils/api";
import toast from "react-hot-toast";
import Modal from "../../components/Income/Modal";
import DeleteAlert from "../../components/Income/DeleteAlert";
import ExpenseOverview from "../../components/Expense/ExpenseOverview";
import ExpenseList from "../../components/Expense/ExpenseList";
import AddExpenseForm from "../../components/Expense/AddExpenseForm";
import { easeInOut, motion } from "framer-motion";
import { Audio } from "react-loader-spinner";

const Expense = () => {
  useUserAuth();
  const [expenseData, setExpenseData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);

  //Get All Expense Details
  const fetchExpenseDetails = async () => {
    try {
      const response = await axiosInstance.get(
        `${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`
      );

      if (response.data) {
        setExpenseData(response.data);
      }
    } catch (err) {
      console.log("Something went wrong. Please try again.", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenseDetails();
    return () => {};
  }, []);

  //Handle Add Expense
  const handleAddExpense = async (expense: any) => {
    const { category, amount, date, icon } = expense;

    if (!category.trim()) {
      toast.error("Category is required");
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
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        category,
        amount,
        date,
        icon,
      });

      setOpenAddExpenseModal(false);
      toast.success("Expense added successfully.");
      fetchExpenseDetails();
    } catch (error: any) {
      console.error(
        "Error adding expense:",
        error.response?.data?.message || error.message
      );
    }
  };

  //Delete Expense
  const deleteExpense = async (id: any) => {
    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));
      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Expense details are deleted successfullly");
      fetchExpenseDetails();
    } catch (err) {
      console.error(err);
    }
  };

  // handle download Expense details
  const handleDownloadExpenseDetails = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.EXPENSE.DOWNLOAD_EXPENSE,
        {
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "expense_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      toast.error("Failed to download the expense details");
    }
  };

  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error("User Context not found!");
  }

  const { user } = userContext;

  return (
    <DashboardLayout activeMenu="Expense">
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
              <ExpenseOverview
                transactions={expenseData}
                onAddExpense={() => {
                  setOpenAddExpenseModal(true);
                }}
              />
            </div>

            <ExpenseList
              transactions={expenseData}
              onDelete={(id: any) => {
                setOpenDeleteAlert({ show: true, data: id });
              }}
              onDownload={handleDownloadExpenseDetails}
            />
          </div>
          <Modal
            isOpen={openAddExpenseModal}
            onClose={() => setOpenAddExpenseModal(false)}
            title="Add Expense"
          >
            <AddExpenseForm onAddExpense={handleAddExpense} />
          </Modal>

          <Modal
            isOpen={openDeleteAlert.show}
            onClose={() => setOpenDeleteAlert({ show: false, data: null })}
            title="Delete Expense"
          >
            <DeleteAlert
              content="Are you sure you want to delete this expense detail?
               Note that this action cannot be undone!"
              onDelete={() => deleteExpense(openDeleteAlert.data)}
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

export default Expense;
