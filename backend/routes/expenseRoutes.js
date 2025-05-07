const express = require("express");

const {
  addExpense,
  deleteExpense,
  getAllExpense,
  downloadExpense,
} = require("../controllers/expenseController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/get", protect, getAllExpense);
router.post("/add", protect, addExpense);
router.delete("/:id", protect, deleteExpense);
router.get("/downloadExpense", protect, downloadExpense);

module.exports = router;
