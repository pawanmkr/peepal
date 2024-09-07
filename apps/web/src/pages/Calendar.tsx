import React, { useState } from 'react';
import dayjs from 'dayjs';

interface CalendarProps {
    availability: { [key: string]: { time: string; status: 'Available' | 'Booked' }[] };
}

const Calendar: React.FC<CalendarProps> = ({ availability }) => {
    const [currentDate, setCurrentDate] = useState(dayjs());
    const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);

    // Function to handle date selection
    const handleDateClick = (date: dayjs.Dayjs) => {
        setSelectedDate(date);
    };

    // Generate the next 7 days starting from the current date
    const getWeekDates = () => {
        return Array.from({ length: 7 }, (_, i) => currentDate.add(i, 'day'));
    };

    const weekDates = getWeekDates();

    // Format time slots
    const formatTimeSlots = (slots: { time: string; status: 'Available' | 'Booked' }[]) => {
        const formattedSlots = [];
        for (let i = 0; i < slots.length - 1; i++) {
            const start = slots[i];
            const end = slots[i + 1];
            if (start.status !== 'Partial' && end.status !== 'Partial') {
                formattedSlots.push({
                    from: start.time,
                    to: end.time,
                    status: start.status,
                });
            }
        }
        return formattedSlots;
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Book your session with me</h2>
            <div className="grid grid-cols-7 gap-2">
                {weekDates.map((date) => (
                    <button
                        key={date.format('YYYY-MM-DD')}
                        className={`p-2 border rounded-md text-center ${
                            selectedDate?.isSame(date, 'day') ? 'bg-blue-500 text-white' : 'bg-gray-100'
                        }`}
                        onClick={() => handleDateClick(date)}
                    >
                        <div>{date.format('ddd')}</div> {/* Day of week (e.g., Sun) */}
                        <div>{date.format('DD')}</div> {/* Date (e.g., 08) */}
                    </button>
                ))}
            </div>
            {/* Display availability for the selected date */}
            {selectedDate && (
                <div className="mt-4">
                    <h3 className="text-lg font-semibold">
                        Availability on {selectedDate.format('dddd, MMMM D')}:
                    </h3>
                    {availability[selectedDate.format('dddd')] ? (
                        <div className="grid grid-cols-1 gap-2 mt-2">
                            {formatTimeSlots(availability[selectedDate.format('dddd')]).map((slot, index) => (
                                <div
                                    key={index}
                                    className={`p-2 text-center rounded-md border ${
                                        slot.status === 'Available'
                                            ? 'bg-green-100 border-green-500 text-green-700'
                                            : 'bg-red-100 border-red-500 text-red-700'
                                    }`}
                                >
                                    <div>{slot.from} - {slot.to}</div>
                                    <div className="text-sm font-semibold">{slot.status}</div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No availability for {selectedDate.format('dddd')}</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Calendar;
