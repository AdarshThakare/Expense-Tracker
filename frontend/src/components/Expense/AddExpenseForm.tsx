import { useState } from "react";
import Input from "../Inputs/Input";
import EmojiPickerPopup from "../EmojiPickerPopup";

const AddExpenseForm = ({ onAddExpense }: any) => {
  const [Expense, setExpense] = useState({
    category: "",
    amount: "",
    date: "",
    icon: "",
  });

  const handleChange = (key: string, value: string) =>
    setExpense({ ...Expense, [key]: value });

  return (
    <div>
      <EmojiPickerPopup
        icon={Expense.icon}
        onSelect={(selectedIcon: any) => handleChange("icon", selectedIcon)}
      />
      <Input
        value={Expense.category}
        onChange={({ target }: any) => handleChange("category", target.value)}
        label="Expense Category"
        placeholder="Freelance, Salary etc..."
        type="text"
        labelclassName="text-white font-normal text-sm tracking-wide"
        inputclassName="font-mono bg-gray-600! shadow-black shadow-xs
         border-none placeholder:text-white text-white!"
      />
      <br />

      <Input
        value={Expense.amount}
        onChange={({ target }: any) => handleChange("amount", target.value)}
        label="Amount"
        placeholder=""
        type="number"
        labelclassName="text-white font-normal text-sm tracking-wide"
        inputclassName="font-mono bg-gray-600! shadow-black shadow-xs
         border-none placeholder:text-white text-white!"
      />
      <br />

      <Input
        value={Expense.date}
        onChange={({ target }: any) => handleChange("date", target.value)}
        label="Date"
        placeholder=""
        type="date"
        labelclassName="text-white font-normal text-sm tracking-wide"
        inputclassName="font-mono bg-gray-600! shadow-black shadow-xs
         border-none placeholder:text-white text-white!"
      />

      <div className="flex justify-end mt-6">
        <button
          className="add-btn add-btn-fill dark:border-none"
          type="button"
          onClick={() => onAddExpense(Expense)}
        >
          Add Expense
        </button>
      </div>
    </div>
  );
};

export default AddExpenseForm;
