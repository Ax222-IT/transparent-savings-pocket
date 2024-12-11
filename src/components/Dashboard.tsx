import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, PiggyBank, Calendar, CreditCard, Plus, Flag } from "lucide-react";
import { useState } from "react";
import { BudgetForm } from "./BudgetForm";
import { ExpenseCalendar } from "./ExpenseCalendar";

export type BudgetData = {
  amount: string;
  category: string;
  description: string;
  date?: Date;
};

export const Dashboard = () => {
  const [totalSavings] = useState(2500);
  const [monthlyBudget] = useState(4000);
  const [expenses, setExpenses] = useState<BudgetData[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleBudgetSubmit = (data: BudgetData) => {
    const newData = { ...data, date: new Date() };
    setExpenses(prev => [...prev, newData]);
    console.log("Budget data submitted:", newData);
  };

  const totalExpenses = expenses.reduce((sum, expense) => sum + Number(expense.amount), 0);

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
                CHF {totalSavings.toLocaleString()}
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
              <p className="text-xl font-semibold">CHF {monthlyBudget.toLocaleString()}</p>
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

      <ExpenseCalendar expenses={expenses} />
    </div>
  );
};