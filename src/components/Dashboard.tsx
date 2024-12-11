import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, PiggyBank, Calendar, CreditCard, Plus } from "lucide-react";
import { useState } from "react";
import { BudgetForm } from "./BudgetForm";

export const Dashboard = () => {
  const [totalSavings] = useState(2500);
  const [monthlyBudget] = useState(4000);
  const [expenses] = useState(1500);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleBudgetSubmit = (data: any) => {
    console.log("Budget data submitted:", data);
    // Here you would typically update your state or make an API call
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
            <h2 className="text-3xl font-bold animate-number-scroll">
              CHF {totalSavings.toLocaleString()}
            </h2>
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
              <p className="text-xl font-semibold">CHF {expenses.toLocaleString()}</p>
            </div>
          </div>
        </Card>
      </div>

      <BudgetForm 
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSubmit={handleBudgetSubmit}
      />
    </div>
  );
};