"use client"

import DatePicker from "@/Components/DatePicker";
import { DatePickerProvider } from "@/Context/DatePickerContext";

export default function Home() {
  return (
    <DatePickerProvider>
      <div className="flex flex-col justify-center items-center h-[100vh]">
        <h1 className="text-2xl font-bold">Date Picker</h1>
        <DatePicker />
      </div>
    </DatePickerProvider>
  );
}
