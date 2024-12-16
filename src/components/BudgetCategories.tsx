import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { DollarSign, Home, ShoppingCart, PiggyBank, Heart, MoreVertical } from "lucide-react";
import { BudgetData } from "./Dashboard";

interface BudgetCategoriesProps {
  expenses: BudgetData[];
  selectedDate?: Date;
}

export const BudgetCategories = ({ expenses, selectedDate }: BudgetCategoriesProps) => {
  const calculateCategoryAmount = (categoryName: string) => {
    if (!expenses?.length) return 0;

    const currentDate = selectedDate || new Date();
    
    return expenses.reduce((total, expense) => {
      // If no category is set, count it as "other"
      const expenseCategory = expense?.category || "other";
      
      if (expenseCategory.toLowerCase() !== categoryName.toLowerCase()) {
        return total;
      }
      
      const expenseDate = expense.date ? new Date(expense.date) : null;
      if (!expenseDate) return total;
      
      // Always filter by month and year
      if (expenseDate.getMonth() === currentDate.getMonth() && 
          expenseDate.getFullYear() === currentDate.getFullYear()) {
        return total + Number(expense.amount || 0);
      }
      
      return total;
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
    {
      name: "Other",
      amount: calculateCategoryAmount('other'),
      icon: MoreVertical,
      color: "text-gray-500",
      progress: calculateProgress(calculateCategoryAmount('other')),
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