import React, { createContext, useContext, useState } from 'react';

const DatePickerContext = createContext({});

export const DatePickerProvider = ({ children }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [recurrenceType, setRecurrenceType] = useState('Daily'); // 'Daily', 'Weekly', 'Monthly', 'Yearly'
  const [recurrenceOptions, setRecurrenceOptions] = useState({interval:1});

  return (
    <DatePickerContext.Provider
      value={{
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        recurrenceType,
        setRecurrenceType,
        recurrenceOptions,
        setRecurrenceOptions,
      }}
    >
      {children}
    </DatePickerContext.Provider>
  );
};

export const useDatePicker = () => useContext(DatePickerContext);
