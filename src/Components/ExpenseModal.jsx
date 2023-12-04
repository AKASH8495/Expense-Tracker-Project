import React, { useEffect, useState } from 'react'

const ExpenseModal = ({isOpen, onClose, onSave, expense}) => {

    const [editMoney, setEditMoney] = useState('');
    const [editDec, setEditDec] = useState('');
    const [editCat, setEditCat] = useState('');

    useEffect(() => {
        if(expense){
            setEditMoney(expense.moneySpent)
            setEditDec(expense.description)
            setEditCat(expense.category)
        }
    },[expense]);

    const handleSave = () => {
        onSave({
            moneySpent: editMoney,
            description: editDec,
            category: editCat
        });

        onClose();
    }

    return (
        <div className={`fixed inset-0 bg-gray-800 bg-opacity-50 ${isOpen ? '' : 'hidden'}`}>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-300 p-12 px-14 rounded-md ">
            <h2 className="text-2xl font-semibold mb-4 text-center">Edit Expense</h2>
            <div className="mb-4">
              <label htmlFor="editedMoneySpent" className="block text-sm font-medium text-gray-700">
                Money Spent
              </label>
              <input
                type="number"
                id="editedMoneySpent"
                className="mt-1 p-2 px-14 border rounded-md w-full border-slate-400"
                value={editMoney}
                onChange={(e) => setEditMoney(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="editedDescription" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <input
                type="text"
                id="editedDescription"
                className="mt-1 p-2 border rounded-md w-full border-slate-400"
                value={editDec}
                onChange={(e) => setEditDec(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="editedCategory" className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                id="editedCategory"
                className="mt-1 p-2 border rounded-md w-full border-slate-400"
                value={editCat}
                onChange={(e) => setEditCat(e.target.value)}
              >
                <option value="">Select Category</option>
                <option value="Food">Food</option>
                <option value="Petrol">Petrol</option>
                <option value="Salary">Salary</option>
              
              </select>
            </div>
            <div className="flex justify-end">
              <button
                className="bg-blue-500 text-white py-2 px-3 rounded-md mr-2"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                className="bg-gray-500 text-white py-2 px-3 rounded-md"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      );
    };
    
    export default ExpenseModal;;








