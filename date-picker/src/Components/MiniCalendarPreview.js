import React, { useMemo } from 'react';
import { useDatePicker } from '../Context/DatePickerContext';

const MiniCalendarPreview = () => {
  const { startDate, endDate, recurrenceType, recurrenceOptions } = useDatePicker();

  const dates = useMemo(() => {
    if (!startDate) return [];

    const result = [];
    let currentDate = new Date(startDate);
    const endDateTime = endDate ? new Date(endDate).getTime() : null;

    const addDate = (date) => {
      if (!endDateTime || date.getTime() <= endDateTime) {
        result.push(new Date(date));
        return true;
      }
      return false;
    };

    const matchesWeeklyPattern = (date, selectedDays) => {
      return selectedDays.includes(date.getDay());
    };

    const matchesMonthlyPattern = (date, targetDay) => {
      return date.getDate() === targetDay;
    };

    const matchesYearlyPattern = (date, targetMonth, targetDay) => {
      return date.getMonth() === targetMonth && date.getDate() === targetDay;
    };

    const getNextWeeklyDate = (date, selectedDays) => {
      const currentDay = date.getDay();
      const sortedDays = [...selectedDays].sort((a, b) => a - b);
      
      const nextDay = sortedDays.find(day => day > currentDay);
      if (nextDay !== undefined) {
        const daysToAdd = nextDay - currentDay;
        const nextDate = new Date(date);
        nextDate.setDate(date.getDate() + daysToAdd);
        return nextDate;
      }
      
      const daysUntilFirstDay = 7 - currentDay + sortedDays[0];
      const nextDate = new Date(date);
      nextDate.setDate(date.getDate() + daysUntilFirstDay);
      return nextDate;
    };

    const getLastDayOfMonth = (date) => {
      return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    switch (recurrenceType) {
      case 'Daily': {
        addDate(currentDate);
        break;
      }

      case 'Weekly': {
        const selectedDays = recurrenceOptions.days?.length ? 
          recurrenceOptions.days : [currentDate.getDay()];
        
        if (matchesWeeklyPattern(currentDate, selectedDays)) {
          addDate(currentDate);
        } else {
          currentDate = getNextWeeklyDate(currentDate, selectedDays);
          addDate(currentDate);
        }
        break;
      }

      case 'Monthly': {
        const targetDay = recurrenceOptions.day || currentDate.getDate();
        
        if (matchesMonthlyPattern(currentDate, targetDay)) {
          addDate(currentDate);
        } else {
          currentDate = new Date(currentDate);
          if (currentDate.getDate() > targetDay) {
            currentDate.setMonth(currentDate.getMonth() + 1);
          }
          currentDate.setDate(targetDay);
          addDate(currentDate);
        }
        break;
      }

      case 'Yearly': {
        const targetMonth = (recurrenceOptions.month || currentDate.getMonth());
        const targetDay = recurrenceOptions.day || currentDate.getDate();
        
        if (matchesYearlyPattern(currentDate, targetMonth, targetDay)) {
          addDate(currentDate);
        } else {
          currentDate = new Date(currentDate);
          if (currentDate.getMonth() > targetMonth || 
              (currentDate.getMonth() === targetMonth && currentDate.getDate() > targetDay)) {
            currentDate.setFullYear(currentDate.getFullYear() + 1);
          }
          currentDate.setMonth(targetMonth);
          currentDate.setDate(targetDay);
          addDate(currentDate);
        }
        break;
      }

      default:
        addDate(currentDate);
        return result;
    }

    // Generate subsequent dates
    while (result.length < 1000) { // Safety limit
      switch (recurrenceType) {
        case 'Daily': {
          const interval = Math.max(1, recurrenceOptions.interval || 1);
          currentDate = new Date(currentDate);
          currentDate.setDate(currentDate.getDate() + interval);
          if (!addDate(currentDate)) return result;
          break;
        }

        case 'Weekly': {
          const interval = Math.max(1, recurrenceOptions.interval || 1);
          const selectedDays = recurrenceOptions.days?.length ? 
            recurrenceOptions.days : [currentDate.getDay()];
          
          currentDate = getNextWeeklyDate(currentDate, selectedDays);
          
          if (currentDate.getDay() <= selectedDays[0]) {
            currentDate.setDate(currentDate.getDate() + (7 * (interval - 1)));
          }
          
          if (!addDate(currentDate)) return result;
          break;
        }

        case 'Monthly': {
          const interval = Math.max(1, recurrenceOptions.interval || 1);
          const targetDay = recurrenceOptions.day || startDate.getDate();
          
          currentDate = new Date(currentDate);
          currentDate.setMonth(currentDate.getMonth() + interval);
          
          const lastDayOfMonth = getLastDayOfMonth(currentDate);
          currentDate.setDate(Math.min(targetDay, lastDayOfMonth));
          
          if (!addDate(currentDate)) return result;
          break;
        }

        case 'Yearly': {
          const interval = Math.max(1, recurrenceOptions.interval || 1);
          const targetMonth = (recurrenceOptions.month ?? startDate.getMonth());
          const targetDay = recurrenceOptions.day || startDate.getDate();
          
          currentDate = new Date(currentDate);
          currentDate.setFullYear(currentDate.getFullYear() + interval);
          currentDate.setMonth(targetMonth);
          
          const lastDayOfMonth = getLastDayOfMonth(currentDate);
          currentDate.setDate(Math.min(targetDay, lastDayOfMonth));
          
          if (!addDate(currentDate)) return result;
          break;
        }

        default:
          return result;
      }
    }

    return result;
  }, [startDate, endDate, recurrenceType, recurrenceOptions]);

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };
  return (
    <div className="border rounded p-4">
      <h4 className="font-medium mb-2">Recurring Dates Preview</h4>
      {dates.length > 0 ? (
        <div className="space-y-2">
          <p className="text-sm text-gray-600">
            {dates.length} {dates.length === 1 ? 'occurrence' : 'occurrences'}
          </p>
          <ul className="list-disc pl-4 max-h-60 overflow-auto space-y-1">
            {dates.map((date, index) => (
              <li key={index} className="text-sm">
                {formatDate(date)}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-sm text-gray-600">
          No dates available. Please select a start date and recurrence pattern.
        </p>
      )}
    </div>
  );
};

export default MiniCalendarPreview;