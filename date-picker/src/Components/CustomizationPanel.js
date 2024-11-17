import React from "react";
import { useDatePicker } from "../Context/DatePickerContext";

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const CustomizationPanel = () => {
  const { recurrenceType, recurrenceOptions, setRecurrenceOptions } =
    useDatePicker();

  const handleOptionChange = (key, value) => {
    setRecurrenceOptions({ ...recurrenceOptions, [key]: value });
  };

  const renderIntervalInput = (label) => (
    <div>
      <label>{label}</label>
      <input
        type="number"
        value={recurrenceOptions.interval || ""}
        min={1}
        onChange={(e) =>
          handleOptionChange("interval", parseInt(e.target.value, 10))
        }
        className="border rounded w-full px-2 py-1 mt-1"
      />
    </div>
  );

  const renderDaysOfWeekSelector = () => (
    <div className="mt-2">
      <label>Select Days of the Week:</label>
      <div className="flex space-x-2 mt-1">
        {DAYS_OF_WEEK.map((day, index) => (
          <div key={index}>
            <input
              type="checkbox"
              id={`day-${index}`}
              checked={recurrenceOptions.days?.includes(index) || false}
              onChange={(e) => {
                const days = recurrenceOptions.days || [];
                handleOptionChange(
                  "days",
                  e.target.checked
                    ? [...days, index]
                    : days.filter((d) => d !== index)
                );
              }}
              className="hidden"
            />
            <label
              htmlFor={`day-${index}`}
              className={`flex items-center space-x-1 px-4 py-2 rounded ${
                recurrenceOptions.days?.includes(index)
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              } cursor-pointer`}
            >
              {day}
            </label>
          </div>
        ))}
      </div>
    </div>
  );

  const renderDayOfMonthInput = () => (
    <div className="mt-2">
      <label>Day of the Month:</label>
      <input
        type="number"
        value={recurrenceOptions.day || ""}
        min={1}
        max={31}
        onChange={(e) =>
          handleOptionChange("day", parseInt(e.target.value, 10))
        }
        className="border rounded w-full px-2 py-1 mt-1"
      />
    </div>
  );

  const renderMonthSelector = () => (
    <div className="mt-2">
      <label>Month:</label>
      <select
        value={recurrenceOptions.month ||""}
        onChange={(e) => handleOptionChange("month", parseInt(e.target.value))}
        className="border rounded w-full px-2 py-1 mt-1"
      >
        {MONTHS.map((month, index) => (
          <option key={month} value={index}>
            {month}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="mb-4">
      <label className="block font-medium mb-2">Customization:</label>

      {recurrenceType === "Daily" && renderIntervalInput("Repeat Every X Days:")}

      {recurrenceType === "Weekly" && (
        <>
          {renderIntervalInput("Repeat Every X Weeks:")}
          {renderDaysOfWeekSelector()}
        </>
      )}

      {recurrenceType === "Monthly" && (
        <>
          {renderIntervalInput("Repeat Every X Months:")}
          {renderDayOfMonthInput()}
        </>
      )}

      {recurrenceType === "Yearly" && (
        <>
          {renderIntervalInput("Repeat Every X Years:")}
          {renderMonthSelector()}
          {renderDayOfMonthInput()}
        </>
      )}
    </div>
  );
};

export default CustomizationPanel;
