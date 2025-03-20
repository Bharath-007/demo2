import React, { useState } from "react";
import { CalendarEvent } from "./types/types";
import { formatTime, generateTimeSlots, getEventsForDate } from "./utils";
import EventPopup from "./EventPopup";
import EventCard from "./EventCard";

interface DayViewProps {
  events: CalendarEvent[];
  currentDate: Date;
}

const DayView: React.FC<DayViewProps> = ({ events, currentDate }) => {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null
  );

  const timeSlots = generateTimeSlots();
  const dayEvents = getEventsForDate(events, currentDate);

  const getEventsForTimeSlot = (timeSlot: string) => {
    // Parse the time slot format "12 A.M" or "01 P.M"
    const timeParts = timeSlot.split(" ");
    const hourStr = timeParts[0].trim();
    const period = timeParts[1].trim();

    let hour = parseInt(hourStr);

    // Convert to 24-hour format
    if (period === "P.M" && hour !== 12) {
      hour += 12;
    } else if (period === "A.M" && hour === 12) {
      hour = 0;
    }

    return dayEvents.filter((event) => {
      const eventStart = event.start;
      return eventStart.getHours() === hour;
    });
  };

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
  };

  return (
    <div className="flex flex-col h-screen overflow-auto bg-gray-200">
      <div className="flex-grow overflow-y-auto">
        {timeSlots.map((timeSlot) => {
          const slotEvents = getEventsForTimeSlot(timeSlot);
          return (
            <div key={timeSlot} className="flex border-b">
              <div className="p-2 min-h-32 w-20 text-right text-sky-500 border-r bg-white mr-px mb-px pt-24">
                {timeSlot}
              </div>
              <div className="flex-grow p-2 relative bg-white mb-px pt-20"
              // style={{ border: '1px solid red' }}
              >
                {slotEvents.length > 0 ? (
                  <EventCard events={slotEvents} />
                ) : (
                  <div className="h-full w-full"></div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {selectedEvent && (
        <EventPopup
          event={selectedEvent.event}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
};

export default DayView;
