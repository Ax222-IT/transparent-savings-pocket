import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, PiggyBank, Calendar, CreditCard, Plus, Flag } from "lucide-react";
import { useState } from "react";
import { BudgetForm } from "./BudgetForm";
import { ExpenseCalendar } from "./ExpenseCalendar";
import { BudgetCategories } from "./BudgetCategories";

export type BudgetData = {
  amount: string;
  category: string;
  description: string;
  date?: Date;
};

export const Dashboard = () => {
  const [totalSavings, setTotalSavings] = useState(0);
  const [monthlyBudget, setMonthlyBudget] = useState(0);
  const [expenses, setExpenses] = useState<BudgetData[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const handleBudgetSubmit = (data: BudgetData) => {
    const newData = { ...data, date: new Date() };
    setExpenses(prev => [...prev, newData]);
    
    // Update monthly budget and total savings based on category
    const amount = Number(data.amount);
    if (data.category === 'income') {
      setMonthlyBudget(prev => prev + amount);
    } else {
      if (data.category === 'savings') {
        setTotalSavings(prev => prev + amount);
      }
    }
    
    console.log("Budget data submitted:", newData);
  };

  const calculateMonthlyTotals = (date?: Date) => {
    if (!date) return { income: 0, expenses: 0, savings: 0 };

    return expenses.reduce((acc, expense) => {
      if (!expense.date) return acc;
      
      const expenseDate = new Date(expense.date);
      if (expenseDate.getMonth() === date.getMonth() && 
          expenseDate.getFullYear() === date.getFullYear()) {
        const amount = Number(expense.amount);
        
        if (expense.category === 'income') {
          acc.income += amount;
        } else if (expense.category === 'savings') {
          acc.savings += amount;
          acc.expenses += amount;
        } else {
          acc.expenses += amount;
        }
      }
      return acc;
    }, { income: 0, expenses: 0, savings: 0 });
  };

  const monthlyTotals = calculateMonthlyTotals(selectedDate);
  const totalExpenses = monthlyTotals.expenses;

  const handleDateChange = (date: Date | undefined) => {
    setSelectedDate(date);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <PiggyBank className="w-8 h-8 text-gold-300" />
          <h1 className="text-2xl font-bold">Pocket Gold</h1>
        </div>
        <Button onClick={() => setIsFormOpen(true)} className="bg-gold-300 hover:bg-gold-400">
          <Plus className="w-4 h-4 mr-2" />
          Add Budget Data
        </Button>
      </div>

      <Card className="p-6 bg-gradient-to-br from-gold-100 to-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Total Savings</p>
            <div className="flex items-center space-x-2">
              <Flag className="w-5 h-5 text-red-500" />
              <h2 className="text-3xl font-bold animate-number-scroll">
                CHF {monthlyTotals.savings.toLocaleString()}
              </h2>
            </div>
          </div>
          <DollarSign className="w-12 h-12 text-gold-300" />
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <Calendar className="w-6 h-6 text-navy-400" />
            <div>
              <p className="text-sm text-gray-600">Monthly Budget</p>
              <p className="text-xl font-semibold">CHF {monthlyTotals.income.toLocaleString()}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <CreditCard className="w-6 h-6 text-navy-400" />
            <div>
              <p className="text-sm text-gray-600">Total Expenses</p>
              <p className="text-xl font-semibold">CHF {totalExpenses.toLocaleString()}</p>
            </div>
          </div>
        </Card>
      </div>

      <BudgetForm 
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSubmit={handleBudgetSubmit}
      />

      <ExpenseCalendar 
        expenses={expenses} 
        onDateChange={handleDateChange}
      />

      <BudgetCategories 
        expenses={expenses}
        selectedDate={selectedDate}
      />
    </div>
  );
};