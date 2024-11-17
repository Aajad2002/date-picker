import React from 'react';
import { useDatePicker } from "../Context/DatePickerContext";

const DateRangePicker = () => {
  const { startDate, endDate, setStartDate, setEndDate } = useDatePicker();

  // Format the date to `yyyy-MM-dd` using JavaScript
  const formatDate = (date) => {
    if (!date) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleDateChange = (type, value) => {
    const date = value ? new Date(value) : null;
    if (type === 'start') setStartDate(date);
    if (type === 'end') setEndDate(date);
  };

  return (
    <div className="flex flex-col space-y-2 mb-4">
      <div>
        <label className="block font-medium">Start Date:</label>
        <input
          type="date"
          value={startDate ? formatDate(startDate) : ''}
          onChange={(e) => handleDateChange('start', e.target.value)}
          className="border rounded w-full px-2 py-1"
        />
      </div>
      <div>
        <label className="block font-medium">End Date:</label>
        <input
          type="date"
          value={endDate ? formatDate(endDate) : ''}
          onChange={(e) => handleDateChange('end', e.target.value)}
          className="border rounded w-full px-2 py-1"
        />
      </div>
    </div>
  );
};

export default DateRangePicker;
