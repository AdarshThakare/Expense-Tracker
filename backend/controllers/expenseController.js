const Expense = require("../models/Expense");
const xlsx = require("xlsx");

exports.getAllExpense = async (req, res) => {
  const userId = req.user.id;
  try {
    const expense = await Expense.find({ userId }).sort({ date: -1 });
    res.json(expense);
  } catch (err) {
    res.status(500).json({ msg: "Server Error", error: err });
  }
};

exports.addExpense = async (req, res) => {
  const userId = req.user.id;
  const { icon, category, amount, date } = req.body;

  try {
    if (!category || !amount || !date) {
      res.status(400).json({ msg: "All the fields are required" });
    }

    const newExpense = new Expense({
      userId,
      icon,
      category,
      amount,
      date: new Date(date),
    });

    await newExpense.save();
    res.status(200).json({ msg: `${newExpense.category} successfully added` });
  } catch (err) {
    res.status(500).json({ msg: "Internal Server Error", error: err });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ msg: "Expense deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Internal Server Error", error: err });
  }
};

exports.downloadExpense = async (req, res) => {
  const userId = req.user.id;

  try {
    const expense = await Expense.find({ userId }).sort({ date: -1 });

    const data = expense.map((item) => ({
      Category: item.category,
      Amount: item.amount,
      Date: item.date,
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Expense");
    xlsx.writeFile(wb, "Expense_details.xlsx");
    res.download("Expense_details.xlsx");
  } catch (err) {
    res.status(500).json({ msg: "Internal Server Error", error: err });
  }
};
