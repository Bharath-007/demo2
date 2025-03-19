// WeekView.tsx
import React, { useState } from 'react';
import { CalendarEvent } from './types/types';
import { formatTime, generateTimeSlots, generateDaysOfWeek, getEventsForDate } from './utils';
import EventPopup from './EventPopup';

interface WeekViewProps {
    events: CalendarEvent[];
    currentDate: Date;
}

const WeekView: React.FC<WeekViewProps> = ({ events, currentDate }) => {
    const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

    const timeSlots = generateTimeSlots();
    const daysOfWeek = generateDaysOfWeek(currentDate);

    const getEventsForTimeSlot = (day: Date, timeSlot: string) => {
        const [hours, minutes] = timeSlot.split(':').map(Number);
        const dayEvents = getEventsForDate(events, day);

        return dayEvents.filter(event => {
            const eventStart = event.start;
            return eventStart.getHours() === hours && eventStart.getMinutes() === minutes;
        });
    };

    return (
        <div className="flex flex-col h-screen overflow-auto bg-white">
            {/* col name */}
            <div className="flex-none grid grid-cols-8 border-b">
                <div className="p-4 border-r"></div>
                {daysOfWeek.map((day, index) => (
                    <div
                        key={index}
                        // style={{border:'1px solid red'}}
                        className={`p-4 text-center  ${day.getDate() === new Date().getDate() &&
                            day.getMonth() === new Date().getMonth() &&
                            day.getFullYear() === new Date().getFullYear() ?
                            'bg-blue-50' : ''
                            }`}
                    >
                        <div className="text-center font-medium">{day.getDate() + ' ' + day.toLocaleDateString('en-US', { month: 'short' })}</div>
                        <div className="text-center font-medium">{day.toLocaleDateString('en-US', { weekday: 'long' })}</div>
                    </div>
                ))}
            </div>
            {/* row name */}
            <div className="flex-grow overflow-y-auto">
                {timeSlots.map((timeSlot) => (
                    <div key={timeSlot} className="grid grid-cols-8">
                        <div className="p-2 text-right text-sky-500 border-r">
                            {timeSlot}
                        </div>
                        {daysOfWeek.map((day, dayIndex) => {
                            const slotEvents = getEventsForTimeSlot(day, timeSlot);
                            return (
                                <div key={dayIndex} className="relative min-h-16 border-r">
                                    {slotEvents.length > 0 && (
                                        <div className="absolute inset-0 p-1">
                                            {slotEvents.length > 1 ? (
                                                <div className="bg-blue-100 rounded p-1 h-full flex items-center justify-center">
                                                    <div className="bg-yellow-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                                                        {slotEvents.length}
                                                    </div>
                                                </div>
                                            ) : (
                                                <div
                                                    onClick={() => setSelectedEvent(slotEvents[0])}
                                                    className="bg-blue-100 p-1 rounded hover:bg-blue-200 cursor-pointer h-full flex flex-col justify-center"
                                                >
                                                    <div className="text-xs font-medium truncate">{slotEvents[0].title}</div>
                                                    <div className="text-xs text-gray-500 truncate">
                                                        {formatTime(slotEvents[0].start.toISOString())}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>

            {selectedEvent && (
                <EventPopup event={selectedEvent.event} onClose={() => setSelectedEvent(null)} />
            )}
        </div>
        
    );
};

export default WeekView;