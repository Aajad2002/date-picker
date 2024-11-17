import React from 'react';
import { useDatePicker } from "../Context/DatePickerContext";

const recurrenceTypes = ['Daily', 'Weekly', 'Monthly', 'Yearly'];

const RecurrenceOptions = () => {
  const { recurrenceType, setRecurrenceType, setRecurrenceOptions } = useDatePicker();

  return (
    <div className="mb-4">
      <label className="block font-medium">Recurrence:</label>
      <div className="flex space-x-2">
        {recurrenceTypes.map((type) => (
          <button
            key={type}
            onClick={() => {
              setRecurrenceType(type)
              setRecurrenceOptions((prev) => ({ ...prev, interval: 1 }))
            }}
            className={`px-4 py-2 border rounded ${recurrenceType === type ? 'bg-blue-500 text-white' : 'bg-gray-100'
              }`}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RecurrenceOptions;
