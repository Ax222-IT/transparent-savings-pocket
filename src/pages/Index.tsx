import { Dashboard } from "@/components/Dashboard";
import { ExpenseCalendar } from "@/components/ExpenseCalendar";
import { BudgetCategories } from "@/components/BudgetCategories";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <Dashboard />
            <BudgetCategories />
          </div>
          <ExpenseCalendar />
        </div>
      </div>
    </div>
  );
};

export default Index;