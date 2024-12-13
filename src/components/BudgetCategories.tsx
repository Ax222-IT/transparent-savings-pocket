import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { DollarSign, Home, ShoppingCart, PiggyBank, Heart } from "lucide-react";
import { BudgetData } from "./Dashboard";

interface BudgetCategoriesProps {
  expenses: BudgetData[];
  selectedDate?: Date;
}

export const BudgetCategories = ({ expenses, selectedDate }: BudgetCategoriesProps) => {
  const calculateCategoryAmount = (categoryName: string) => {
    if (!expenses.length) return 0;

    return expenses.reduce((total, expense) => {
      if (expense.category.toLowerCase() !== categoryName.toLowerCase()) return total;
      
      if (selectedDate) {
        const expenseDate = expense.date ? new Date(expense.date) : null;
        if (!expenseDate) return total;
        
        if (expenseDate.getMonth() === selectedDate.getMonth() && 
            expenseDate.getFullYear() === selectedDate.getFullYear()) {
          return total + Number(expense.amount);
        }
        return total;
      }
      
      // If no date is selected, sum all expenses for this category
      return total + Number(expense.amount);
    }, 0);
  };

  const calculateProgress = (amount: number) => {
    const totalIncome = calculateCategoryAmount('income');
    if (totalIncome === 0) return 0;
    return (amount / totalIncome) * 100;
  };

  const categories = [
    {
      name: "Income",
      amount: calculateCategoryAmount('income'),
      icon: DollarSign,
      color: "text-green-500",
      progress: 100,
    },
    {
      name: "Fixed Costs",
      amount: calculateCategoryAmount('fixed'),
      icon: Home,
      color: "text-blue-500",
      progress: calculateProgress(calculateCategoryAmount('fixed')),
    },
    {
      name: "Variable Costs",
      amount: calculateCategoryAmount('variable'),
      icon: ShoppingCart,
      color: "text-orange-500",
      progress: calculateProgress(calculateCategoryAmount('variable')),
    },
    {
      name: "Savings",
      amount: calculateCategoryAmount('savings'),
      icon: PiggyBank,
      color: "text-gold-300",
      progress: calculateProgress(calculateCategoryAmount('savings')),
    },
    {
      name: "Donations",
      amount: calculateCategoryAmount('donations'),
      icon: Heart,
      color: "text-red-500",
      progress: calculateProgress(calculateCategoryAmount('donations')),
    },
  ];

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Budget Categories</h2>
      <div className="space-y-4">
        {categories.map((category) => (
          <div key={category.name} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <category.icon className={`w-5 h-5 ${category.color}`} />
                <span className="font-medium">{category.name}</span>
              </div>
              <span className="font-semibold">CHF {category.amount.toLocaleString()}</span>
            </div>
            <Progress value={category.progress} className="h-2" />
          </div>
        ))}
      </div>
    </Card>
  );
};