import { useState } from "react";
import Input from "../Inputs/Input";
import EmojiPickerPopup from "../EmojiPickerPopup";

const AddIncomeForm = ({ onAddIncome }: any) => {
  const [income, setIncome] = useState({
    source: "",
    amount: "",
    date: "",
    icon: "",
  });

  const handleChange = (key: string, value: string) =>
    setIncome({ ...income, [key]: value });

  return (
    <div>
      <EmojiPickerPopup
        icon={income.icon}
        onSelect={(selectedIcon: any) => handleChange("icon", selectedIcon)}
      />
      <Input
        value={income.source}
        onChange={({ target }: any) => handleChange("source", target.value)}
        label="Income Source"
        placeholder="Freelance, Salary etc..."
        type="text"
        labelclassName="text-white font-normal text-sm tracking-wide"
        inputclassName="font-mono bg-gray-600! shadow-black shadow-xs border-none placeholder:text-white text-white!"
      />
      <br />

      <Input
        value={income.amount}
        onChange={({ target }: any) => handleChange("amount", target.value)}
        label="Amount"
        placeholder=""
        type="number"
        labelclassName="text-white font-normal text-sm tracking-wide"
        inputclassName="font-mono bg-gray-600! shadow-black shadow-xs border-none placeholder:text-white text-white!"
      />
      <br />

      <Input
        value={income.date}
        onChange={({ target }: any) => handleChange("date", target.value)}
        label="Date"
        placeholder=""
        type="date"
        labelclassName="text-white font-normal text-sm tracking-wide"
        inputclassName="font-mono bg-gray-600! shadow-black shadow-xs border-none placeholder:text-white text-white!"
      />

      <div className="flex justify-end mt-6">
        <button
          className="add-btn add-btn-fill dark:border-none"
          type="button"
          onClick={() => onAddIncome(income)}
        >
          Add Income
        </button>
      </div>
    </div>
  );
};

export default AddIncomeForm;
