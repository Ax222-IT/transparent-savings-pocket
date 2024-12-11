import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

export const ExpenseCalendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [expenses] = useState<{ [key: string]: number }>({
    "2024-03-15": 120,
    "2024-03-16": 45,
    "2024-03-17": 89,
  });

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Expense Calendar</h2>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
        modifiers={{
          hasExpense: (date) => {
            const dateStr = date.toISOString().split("T")[0];
            return dateStr in expenses;
          },
        }}
        modifiersStyles={{
          hasExpense: {
            backgroundColor: "#FFD700",
            color: "#1A237E",
            fontWeight: "bold",
          },
        }}
      />
      {date && (
        <div className="mt-4">
          <p className="text-sm text-gray-600">
            Expenses for {date.toLocaleDateString()}:
          </p>
          <p className="text-lg font-semibold">
            ${expenses[date.toISOString().split("T")[0]]?.toLocaleString() || 0}
          </p>
        </div>
      )}
    </Card>
  );
};