import React from 'react';
import DateRangePicker from './DateRangePicker';
import RecurrenceOptions from './RecurrenceOptions';
import CustomizationPanel from './CustomizationPanel';
import MiniCalendarPreview from './MiniCalendarPreview';

const DatePicker = () => {
  return (
    <div className="max-w-full  flex gap-4 p-4 bg-white shadow-lg rounded-md">
      <div>
        <DateRangePicker />
        <RecurrenceOptions />
        <CustomizationPanel />

      </div>
      <div className='h-full'>
      <MiniCalendarPreview />

      </div>
    </div>
  );
};

export default DatePicker;
