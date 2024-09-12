import React, { useState, useEffect } from "react";
import { RRule, rrulestr } from "rrule";
import { format, addMinutes, isPast, isToday, addDays } from "date-fns";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

type Slot = {
  rule: string;
  isAvailable: boolean;
  duration: number;
  sessionDetails: {
    name: string;
    description: string;
  };
};

type CalendarViewProps = {
  slots: Slot[];
  onSlotClick?: (slot: Slot) => void; // Event handler for clicking a slot
};

const CalendarView: React.FC<CalendarViewProps> = ({ slots, onSlotClick }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [visibleSlots, setVisibleSlots] = useState<{ [key: string]: Slot[] }>(
    {}
  );

  // Change date helper
  const changeDate = (days: number) => {
    setStartDate((prev) => {
      const newStartDate = addDays(prev, days);
      return new Date(newStartDate.setHours(0, 0, 0, 0)); // Reset time to midnight
    });
  };

  // Format date
  const formatDate = (date: Date) => format(date, "MMM d, yyyy (EEEE)");

  // Get today's status (today, tomorrow, etc.)
  const getDayStatus = (date: Date) => {
    const today = new Date();
    const diff = Math.ceil(
      (date.getTime() - today.getTime()) / (1000 * 3600 * 24)
    );

    if (isToday(date)) return "Today";
    if (diff === 1) return "Tomorrow";
    if (diff === -1) return "Yesterday";
    return format(date, "EEEE");
  };

  const getSlotsForDateRange = (startDate: Date) => {
    const endDate = addDays(startDate, 1); // Two dates: today and tomorrow

    return slots.reduce<{ [key: string]: Slot[] }>((acc, slot) => {
      const rule = rrulestr(slot.rule);
      const occurrences = rule.between(startDate, endDate, true);

      occurrences.forEach((occurrence) => {
        const dateKey = format(new Date(occurrence), "MMM d, yyyy");
        if (!acc[dateKey]) acc[dateKey] = [];
        acc[dateKey].push(slot);
      });

      return acc;
    }, {});
  };

  useEffect(() => {
    setVisibleSlots(getSlotsForDateRange(startDate));
  }, [startDate, slots]);

  return (
    <div className="min-w-96 mx-auto p-4 border rounded-lg shadow-md h-max bg-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        {/* Date Navigation */}
        <button
          className="text-blue-500 hover:text-blue-600"
          onClick={() => changeDate(-1)}
        >
          <FiChevronLeft size={24} />
        </button>

        {/* Date Info */}
        <div className="text-center">
          <div className="text-xl">{formatDate(startDate)}</div>
          {/* Time Zone Info */}
          <div className="text-sm text-gray-500 text-center mb-2">
            Timezone: {Intl.DateTimeFormat().resolvedOptions().timeZone}
          </div>
        </div>

        {/* Date Navigation */}
        <button
          className="text-blue-500 hover:text-blue-600"
          onClick={() => changeDate(1)}
        >
          <FiChevronRight size={24} />
        </button>
      </div>

      {/* Label */}
      <h2 className="text-xl font-semibold mb-4 text-center text-red-600">
        Hurry up, Slots are Available!
      </h2>

      {/* Body: Time Slots */}
      <div className="max-h-[560px] overflow-y-auto bg-white">
        {Object.keys(visibleSlots).length > 0 ? (
          Object.entries(visibleSlots).map(([date, slots]) => (
            <div key={date} className="mb-6">
              {slots.length > 0 ? (
                slots.map((slot, index) => {
                  const rule = rrulestr(slot.rule);
                  const nextOccurrence = rule.after(startDate, true);
                  if (!nextOccurrence) return null;

                  const startTime = format(new Date(nextOccurrence), "h:mm a");
                  const endTime = format(
                    addMinutes(new Date(nextOccurrence), slot.duration),
                    "h:mm a"
                  );

                  const isPastSlot = isPast(new Date(nextOccurrence));
                  const isCurrentSlot = isToday(new Date(nextOccurrence));

                  return (
                    <div
                      key={index}
                      className={`px-3 py-2 rounded-lg border cursor-pointer mb-4 ${
                        isPastSlot
                          ? "bg-gray-100 border-gray-300"
                          : slot.isAvailable
                          ? "bg-green-50 border-green-300 hover:bg-green-100"
                          : "bg-red-50 border-red-300 hover:bg-red-100"
                      }`}
                      onClick={() => onSlotClick && onSlotClick(slot)}
                    >
                      <div className="">
                        {/* Slot session name */}
                        <div className="ftext-lg">
                          {slot.sessionDetails.name}
                        </div>

                        {/* session description */}
                        <div className="text-sm text-gray-600 mb-3">
                          {slot.sessionDetails.description}
                        </div>

                        {/* Slot Time */}
                        <div className={`w-full flex justify-between`}>
                          {startTime} - {endTime}
                          <span className="font-semibold">
                            {slot.duration}m
                          </span>
                        </div>

                        {/* Slot Status */}
                        <div
                          className={`text-sm ${
                            slot.isAvailable ? "text-green-600" : "text-red-600"
                          } ${isPastSlot ? "text-gray-500" : ""}`}
                        >
                          {isPastSlot
                            ? ""
                            : slot.isAvailable
                            ? "Available"
                            : "Not Available"}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center text-gray-500 mt-4">
                  <p className="text-xl">No slots available for {date}.</p>
                  <p>Check back later or try another date.</p>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 mt-4">
            <p className="text-xl">No slots available for selected dates.</p>
            <p>Check back later or try another date range.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarView;
