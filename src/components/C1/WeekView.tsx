import React, { useState } from "react";
import { CalendarEvent } from "./types/types";
import {
  formatTime,
  generateTimeSlots,
  generateDaysOfWeek,
  getEventsForDate,
} from "./utils";
import EventPopup from "./EventPopup";
import EventCard from "./EventCard";

interface WeekViewProps {
  events: CalendarEvent[];
  currentDate: Date;
}

const WeekView: React.FC<WeekViewProps> = ({ events, currentDate }) => {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null
  );

  const timeSlots = generateTimeSlots();
  const daysOfWeek = generateDaysOfWeek(currentDate);

  const getEventsForTimeSlot = (day: Date, timeSlot: string) => {
    // Parse the time slot format "12 A.M" or "01 P.M"
    const timeParts = timeSlot.split(" ");
    const hour = parseInt(timeParts[0]);
    const period = timeParts[1];

    // Convert to 24-hour format
    let hours = hour;
    if (period === "P.M" && hour !== 12) hours += 12;
    if (period === "A.M" && hour === 12) hours = 0;

    const dayEvents = getEventsForDate(events, day);

    return dayEvents.filter((event) => {
      const eventStart = event.start;
      return eventStart.getHours() === hours;
    });
  };

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
  };

  return (
    <div className="flex flex-col h-screen overflow-auto bg-white rounded-lg shadow">
      {/* Week header */}
      <div className="flex-none grid grid-cols-8 border-b">
        <div className="p-4 border-r"></div>
        {daysOfWeek.map((day, index) => (
          <div
            key={index}
            className={`p-4 text-center ${
              day.getDate() === new Date().getDate() &&
              day.getMonth() === new Date().getMonth() &&
              day.getFullYear() === new Date().getFullYear()
                ? "bg-blue-50"
                : ""
            }`}
          >
            <div className="text-center font-medium">
              {day.getDate() +
                " " +
                day.toLocaleDateString("en-US", { month: "short" })}
            </div>
            <div className="text-center font-medium">
              {day.toLocaleDateString("en-US", { weekday: "long" })}
            </div>
          </div>
        ))}
      </div>

      {/* Time slots and events */}
      <div className="flex-grow overflow-y-auto bg-gray-200">
        {timeSlots.map((timeSlot) => (
          <div
            key={timeSlot}
            className="grid grid-cols-8 border-b bg-white mr-px mb-px"
          >
            <div className="min-h-32 p-2 text-right text-sky-500 border-r">
              {timeSlot}
            </div>
            {daysOfWeek.map((day, dayIndex) => {
              const slotEvents = getEventsForTimeSlot(day, timeSlot);
              return (
                <div
                  key={dayIndex}
                  className="relative min-h-32 border-r"
                  style={{ border: "1px solid red" }}
                >
                  {slotEvents.length > 0 && (
                    <div className="absolute inset-0 p-1">
                      {slotEvents.length > 2 ? (
                        <div className="bg-blue-100 rounded p-1 h-full flex items-center justify-center">
                          <div className="bg-yellow-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                            {slotEvents.length}
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-1">
                          {/* {slotEvents.map((event) => (
                            <div
                              key={event.id}
                              onClick={() => handleEventClick(event)}
                              className="bg-blue-100 p-1 rounded hover:bg-blue-200 cursor-pointer"
                            >
                              <div className="text-xs font-medium truncate">
                                {event.title}
                              </div>
                              <div className="text-xs text-gray-500 truncate">
                                {formatTime(event.start.toISOString())}
                              </div>
                              {event.event?.user_det?.candidate && (
                                <div className="text-xs text-gray-600 truncate">
                                  {
                                    event.event.user_det.candidate
                                      .candidate_firstName
                                  }{" "}
                                  {
                                    event.event.user_det.candidate
                                      .candidate_lastName
                                  }
                                </div>
                              )}
                            </div>
                          ))} */}
                          <EventCard events={slotEvents} />
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
        <EventPopup
          event={selectedEvent.event}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
};

export default WeekView;
