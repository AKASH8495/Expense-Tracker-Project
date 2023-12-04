import React, { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaDownload } from "react-icons/fa";
import ExpenseModal from "./ExpenseModal";
import { getDatabase, ref, push, onValue, remove } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const ExpenseTracker = () => {
  const [moneySpent, setMoneySpent] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [selectedExpensIndex, setSelectedExpenseIndex] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);

  const database = getDatabase();
  const auth = getAuth();

  useEffect(() => {
    // Listen for changes in authentication state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // If user is authenticated, fetch their expenses
        const expensesRef = ref(database, `expenses/${user.uid}`);
        onValue(expensesRef, (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            setExpenses(Object.values(data));
          }
        });
      } else {
        // If user is not authenticated, clear expenses
        setExpenses([]);
      }
    });

    return () => unsubscribe();
  }, [auth, database]);

  useEffect(() => {
    const newTotalAmount = expenses.reduce(
      (acc, expense) => acc + parseFloat(expense.moneySpent),
      0
    );
    setTotalAmount(newTotalAmount);
  }, [expenses]);

  const handleAddExpense = () => {
    const user = auth.currentUser;

    if (user) {
      const newExpense = {
        moneySpent,
        description,
        category,
      };

      const expensesRef = ref(database, `expenses/${user.uid}`);
      push(expensesRef, newExpense)
        .then(() => {
          console.log("Expense added successfully");
        })
        .catch((error) => {
          console.error("Error adding expense:", error);
        });

      setExpenses([...expenses, newExpense]);
      setMoneySpent("");
      setDescription("");
      setCategory("");
    }
  };

  const handleDelete = (index, expenseId) => {
    const user = auth.currentUser;

    if (user) {
      const expensesRef = ref(database, `expenses/${user.uid}/${expenseId}`);
      remove(expensesRef);

      const updateExpense = [...expenses];
      updateExpense.splice(index, 1);
      setExpenses(updateExpense);
    }
  };

  const handleEdit = (index) => {
    setSelectedExpenseIndex(index);
    setModalOpen(true);
  };

  const handleSaveEditExpense = (editExpense) => {
    const user = auth.currentUser;

    if (user) {
      const updatedExpenses = [...expenses];
      updatedExpenses[selectedExpensIndex] = editExpense;

      const expensesRef = ref(database, `expenses/${user.uid}`);
      remove(expensesRef)
        .then(() => {
          // Successfully removed all expenses
          updatedExpenses.forEach((expense) => {
            push(expensesRef, expense);
          });
        })
        .catch((error) => {
          console.error("Error updating expenses:", error);
        });

      setExpenses(updatedExpenses);
    }
  };

  const handleModalClose = () => {
    setSelectedExpenseIndex(null);
    setModalOpen(false);
  };

  return (
    <div>
      <div className="mt-12 w-[50%] mx-auto bg-gray-400 p-8 rounded-md  ">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Add New Expense
        </h2>
        <div className="mb-4 ">
          <label
            htmlFor="moneySpent"
            className="block text-sm font-medium text-gray-700"
          >
            Money Spent
          </label>
          <input
            type="number"
            id="moneySpent"
            placeholder="Enter amount"
            required
            className="mt-1 p-2 border rounded-md w-full"
            value={moneySpent}
            onChange={(e) => setMoneySpent(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <input
            type="text"
            id="description"
            placeholder="Enter description"
            required
            className="mt-1 p-2 border rounded-md w-full"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Category
          </label>
          <select
            id="category"
            className="mt-1 p-2 border rounded-md w-full"
            required
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            <option value="Food">Food</option>
            <option value="Petrol">Petrol</option>
            <option value="Salary">Salary</option>
          </select>
        </div>
        <button
          className="bg-blue-500 text-white py-2 px-3 rounded-md"
          onClick={handleAddExpense}
        >
          Add Expense
        </button>
      </div>

      <div className="mt-12 w-[50%] mx-auto bg-gray-400 p-8 rounded-md mb-1">
        <h3 className="text-2xl font-semibold mb-4 text-center">
          Expenses List
        </h3>
        <ul className="">
          {expenses.map((expense, index) => (
            <li
              key={index}
              className="mb-6 bg-slate-300 rounded-md p-5 text-[18px] relative flex items-center justify-between"
            >
              <span className="text-black font-semibold">Amount :</span>
              {expense.moneySpent},
              <span className="text-black font-semibold">Des:</span>
              {expense.description},
              <span className="text-black font-semibold">Category:</span>
              {expense.category}
              <button
                onClick={() => handleDelete(index)}
                className=" space-x-2  text-red-500 hover:text-red-700 p-2"
              >
                <FaTrash />
              </button>
              <button
                onClick={() => handleEdit(index)}
                className="text-green-500 hover:text-green-600 "
              >
                <FaEdit />
              </button>
            </li>
          ))}
        </ul>
        <div className="flex justify-between items-center ">
          <div className="text-xl font-semibold">
            Total Amount: ${totalAmount.toFixed(2)}
          </div>
          <button
            // onClick={handleDownload}
            className="bg-blue-500 text-white py-2 px-3 rounded-md flex items-center"
          >
            <FaDownload className="mr-2" /> Download
          </button>
        </div>
      </div>

      <ExpenseModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSave={handleSaveEditExpense}
        expense={expenses[selectedExpensIndex]}
      />
    </div>
  );
};

export default ExpenseTracker;
