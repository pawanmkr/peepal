import React, { useState, useEffect } from "react";
import { RRule, rrulestr } from "rrule";
import { format, addMinutes } from "date-fns";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

// Define the types for the session slot
type Slot = {
  rule: string;
  isAvailable: boolean;
  duration: number; // Duration in minutes
  sessionDetails: {
    name: string;
    description: string;
  };
};

type CalendarViewProps = {
  slots: Slot[];
};

const CalendarView: React.FC<CalendarViewProps> = ({ slots }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [visibleSlots, setVisibleSlots] = useState<Slot[]>([]);

  // Change date helper
  const changeDate = (days: number) => {
    setSelectedDate((prev) => new Date(prev.setDate(prev.getDate() + days)));
  };

  // Format date
  const formatDate = (date: Date) => format(date, "MMM d, yyyy (EEEE)");

  const getSlotsForDate = (date: Date) => {
    const startOfDay = new Date(date.setHours(0, 0, 0, 0));
    const endOfDay = new Date(date.setHours(23, 59, 59, 999));

    const selectedDateSlots = slots.filter((slot) => {
      const rule = rrulestr(slot.rule);
      const occurrences = rule.between(startOfDay, endOfDay, true);
      return occurrences.length > 0;
    });

    return selectedDateSlots;
  };

  useEffect(() => {
    setVisibleSlots(getSlotsForDate(selectedDate));
  }, [selectedDate, slots]);

  return (
    <div className="max-w-lg mx-auto p-4 border rounded-lg shadow-md">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <button
          className="text-blue-500 hover:text-blue-600"
          onClick={() => changeDate(-1)}
        >
          <FiChevronLeft size={24} />
        </button>
        <div className="text-center">
          <div className="font-bold">{formatDate(selectedDate)}</div>
          <div className="text-sm text-gray-500">
            Tomorrow:{" "}
            {format(new Date(selectedDate.getTime() + 86400000), "EEEE, MMM d")}
          </div>
        </div>
        <button
          className="text-blue-500 hover:text-blue-600"
          onClick={() => changeDate(1)}
        >
          <FiChevronRight size={24} />
        </button>
      </div>

      {/* Body: Time Slots */}
      <div className="space-y-4">
        {visibleSlots.length > 0 ? (
          visibleSlots.map((slot, index) => {
            const rule = rrulestr(slot.rule);
            const nextOccurrence = rule.after(selectedDate, true);
            if (!nextOccurrence) return null;

            const startTime = format(new Date(nextOccurrence), "h:mm a");
            const endTime = format(
              addMinutes(new Date(nextOccurrence), slot.duration),
              "h:mm a"
            );

            return (
              <div
                key={index}
                className={`p-4 rounded-lg border ${
                  slot.isAvailable
                    ? "bg-green-50 border-green-300"
                    : "bg-red-50 border-red-300"
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-bold text-lg">
                      {slot.sessionDetails.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {slot.sessionDetails.description}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-blue-500 font-bold">
                      {startTime} - {endTime}
                    </div>
                    <div
                      className={`text-sm ${
                        slot.isAvailable ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {slot.isAvailable ? "Available" : "Not Available"}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center text-gray-500">
            No slots available for this date.
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarView;
