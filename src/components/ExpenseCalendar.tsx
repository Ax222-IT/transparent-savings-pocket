import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { BudgetData } from "./Dashboard";

type ExpenseCalendarProps = {
  expenses: BudgetData[];
  onDateChange: (date: Date | undefined) => void;
};

export const ExpenseCalendar = ({ expenses, onDateChange }: ExpenseCalendarProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  // Convert expenses array to a map of date strings to total amounts
  const expensesByDate = expenses.reduce((acc, expense) => {
    if (expense.date) {
      // Handle the complex date object structure
      const expenseDate = expense.date instanceof Date 
        ? expense.date 
        : new Date((expense.date as any).value?.iso || expense.date);
      
      const dateStr = expenseDate.toISOString().split('T')[0];
      acc[dateStr] = (acc[dateStr] || 0) + Number(expense.amount);
    }
    return acc;
  }, {} as { [key: string]: number });

  const handleDateSelect = (newDate: Date | undefined) => {
    setDate(newDate);
    onDateChange(newDate);
  };

  const getExpenseForDate = (selectedDate: Date | undefined) => {
    if (!selectedDate) return 0;
    
    const dateStr = selectedDate.toISOString().split("T")[0];
    
    // Filter expenses for the selected date and specified categories only
    return expenses.reduce((total, expense) => {
      if (!expense.date) return total;
      
      const expenseDate = expense.date instanceof Date 
        ? expense.date 
        : new Date((expense.date as any).value?.iso || expense.date);
      
      const expenseDateStr = expenseDate.toISOString().split("T")[0];
      
      // Only include expenses from specific categories
      const allowedCategories = ['fixed', 'variable', 'donations', 'other'];
      
      if (expenseDateStr === dateStr && allowedCategories.includes(expense.category)) {
        return total + Number(expense.amount);
      }
      return total;
    }, 0);
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Expense Calendar</h2>
      <Calendar
        mode="single"
        selected={date}
        onSelect={handleDateSelect}
        className="rounded-md border"
        modifiers={{
          hasExpense: (date) => {
            const dateStr = date.toISOString().split("T")[0];
            return dateStr in expensesByDate;
          }
        }}
        modifiersStyles={{
          hasExpense: {
            fontWeight: "bold"
          },
          selected: {
            backgroundColor: "#FFD700",
            color: "#1A237E"
          }
        }}
      />
      {date && (
        <div className="mt-4">
          <p className="text-sm text-gray-600">
            Expenses for {date.toLocaleDateString()}:
          </p>
          <p className="text-lg font-semibold">
            CHF {getExpenseForDate(date).toLocaleString()}
          </p>
        </div>
      )}
    </Card>
  );
};