import { Card } from "@/components/ui/card";
import { DollarSign, PiggyBank, Calendar, CreditCard } from "lucide-react";
import { useState } from "react";

export const Dashboard = () => {
  const [totalSavings] = useState(2500);
  const [monthlyBudget] = useState(4000);
  const [expenses] = useState(1500);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center space-x-4">
        <PiggyBank className="w-8 h-8 text-gold-300" />
        <h1 className="text-2xl font-bold">Pocket Gold</h1>
      </div>

      <Card className="p-6 bg-gradient-to-br from-gold-100 to-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Total Savings</p>
            <h2 className="text-3xl font-bold animate-number-scroll">
              ${totalSavings.toLocaleString()}
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
              <p className="text-xl font-semibold">${monthlyBudget.toLocaleString()}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <CreditCard className="w-6 h-6 text-navy-400" />
            <div>
              <p className="text-sm text-gray-600">Total Expenses</p>
              <p className="text-xl font-semibold">${expenses.toLocaleString()}</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};