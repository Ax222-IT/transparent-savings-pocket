import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { DollarSign, Home, ShoppingCart, PiggyBank, Heart } from "lucide-react";

export const BudgetCategories = () => {
  const categories = [
    {
      name: "Income",
      amount: 5000,
      icon: DollarSign,
      color: "text-green-500",
      progress: 100,
    },
    {
      name: "Fixed Costs",
      amount: 2000,
      icon: Home,
      color: "text-blue-500",
      progress: 40,
    },
    {
      name: "Variable Costs",
      amount: 1000,
      icon: ShoppingCart,
      color: "text-orange-500",
      progress: 20,
    },
    {
      name: "Savings",
      amount: 1500,
      icon: PiggyBank,
      color: "text-gold-300",
      progress: 30,
    },
    {
      name: "Donations",
      amount: 500,
      icon: Heart,
      color: "text-red-500",
      progress: 10,
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