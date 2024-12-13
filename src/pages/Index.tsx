import { Dashboard } from "@/components/Dashboard";
import { BudgetCategories } from "@/components/BudgetCategories";
import { useState } from "react";
import { BudgetData } from "@/components/Dashboard";

const Index = () => {
  const [expenses, setExpenses] = useState<BudgetData[]>([]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <Dashboard />
            <BudgetCategories expenses={expenses} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;