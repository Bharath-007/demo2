import React, { useState } from 'react';
import { CalendarEvent } from './types/types';
import { formatTime, generateTimeSlots, getEventsForDate } from './utils';
import EventPopup from './EventPopup';

interface DayViewProps {
    events: CalendarEvent[];
    currentDate: Date;
}

const DayView: React.FC<DayViewProps> = ({ events, currentDate }) => {
    const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

    const timeSlots = generateTimeSlots();
    const dayEvents = getEventsForDate(events, currentDate);

    const getEventsForTimeSlot = (timeSlot: string) => {
        const [hours, minutes] = timeSlot.split(':').map(Number);
        return dayEvents.filter(event => {
            const eventStart = event.start;
            return eventStart.getHours() === hours && eventStart.getMinutes() === minutes;
        });
    };

    return (
        <div className="flex flex-col h-screen overflow-auto">
            <div className="flex-none p-4 border-b">
                <h2 className="text-xl font-semibold">{currentDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</h2>
            </div>

            <div className="flex-grow overflow-y-auto">
                {timeSlots.map((timeSlot) => {
                    const slotEvents = getEventsForTimeSlot(timeSlot);
                    return (
                        <div key={timeSlot} className="flex border-b">
                            <div className="p-2 w-20 text-right text-gray-500 border-r">
                                {timeSlot}
                            </div>
                            <div className="flex-grow p-2 relative min-h-16">
                                {slotEvents.length > 0 && (
                                    <div className="space-y-1">
                                        {slotEvents.map((event) => (
                                            <div
                                                key={event.id}
                                                onClick={() => setSelectedEvent(event)}
                                                className="bg-blue-100 p-2 rounded hover:bg-blue-200 cursor-pointer"
                                            >
                                                <div className="flex justify-between">
                                                    <span className="font-medium">{event.title}</span>
                                                    <span className="text-sm text-gray-500">
                                                        {formatTime(event.start.toISOString())} - {formatTime(event.end.toISOString())}
                                                    </span>
                                                </div>
                                                <div className="text-sm text-gray-600">
                                                    {event.event.user_det.candidate.candidate_firstName} {event.event.user_det.candidate.candidate_lastName}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {selectedEvent && (
                <EventPopup event={selectedEvent.event} onClose={() => setSelectedEvent(null)} />
            )}
        </div>
    );
};

export default DayView;