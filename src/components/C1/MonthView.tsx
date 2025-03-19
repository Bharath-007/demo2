  // MonthView.tsx
  import React, { useState } from 'react';
  import { CalendarEvent } from './types/types';
  import { generateDaysInMonth, getEventsForDate, groupEventsByTime } from './utils';
  import EventPopup from './EventPopup';
  import EventList from './EventList';
  
  interface MonthViewProps {
    events: CalendarEvent[];
    currentDate: Date;
  }
  
  const MonthView: React.FC<MonthViewProps> = ({ events, currentDate }) => {
    const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
    const [selectedDateEvents, setSelectedDateEvents] = useState<CalendarEvent[] | null>(null);
    
    const daysInMonth = generateDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
    const weekdays = ['Sunday', 'Monday', 'Tueday', 'Wednesday', 'Thuday', 'Friday', 'Saturday'];
    
    const handleDateClick = (date: Date) => {
      const dateEvents = getEventsForDate(events, date);
      if (dateEvents.length > 0) {
        setSelectedDateEvents(dateEvents);
      }
    };
    
    const handleEventClick = (event: CalendarEvent) => {
      setSelectedEvent(event);
      setSelectedDateEvents(null);
    };
  
    return (
      <div className="bg-white rounded-lg shadow">
        <div className="grid grid-cols-7 bg-white-100 border-b">
          {weekdays.map((day) => (
            <div key={day} className="p-2 text-center text-sky-700 font-medium">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-px bg-gray-200">
          {daysInMonth.map((day, index) => {
            const isCurrentMonth = day.getMonth() === currentDate.getMonth();
            const isToday = day.getDate() === new Date().getDate() && 
                            day.getMonth() === new Date().getMonth() && 
                            day.getFullYear() === new Date().getFullYear();
            
            const dayEvents = getEventsForDate(events, day);
            const hasEvents = dayEvents.length > 0;
            const groupedEvents = groupEventsByTime(dayEvents);
            
            return (
              <div
                key={index}
                className={`min-h-32 p-1 ${
                  isCurrentMonth ? 'bg-white' : 'bg-gray-50 text-gray-400'
                } ${isToday ? 'border-2 border-blue-500' : ''}`}
                onClick={() => handleDateClick(day)}
              >
                <div className="flex justify-center">
                  <span className={`font-semibold p-1 items-center ${isToday ? 'text-blue-500' : ''}`}>
                    {day.getDate()}
                  </span>
                </div>
                
                {hasEvents && (
                  <div className="mt-1 space-y-1">
                    {Object.entries(groupedEvents).map(([timeKey, timeEvents]) => (
                      <div key={timeKey} className="flex justify-between">
                        {timeEvents.length > 1 ? (
                          <div className="bg-blue-100 p-1 rounded-md w-full flex items-center justify-between">
                            <span className="text-xs truncate">{timeEvents[0].event.summary}</span>
                            <span className="bg-yellow-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                              {timeEvents.length}
                            </span>
                          </div>
                        ) : (
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEventClick(timeEvents[0]);
                            }}
                            className="bg-blue-100 p-1 rounded-md w-full hover:bg-blue-200 cursor-pointer"
                          >
                            {/* card */}
                            <div className="text-xs font-medium truncate">{timeEvents[0].title}</div>
                            <div className="text-xs text-gray-500 truncate">
                              {timeEvents[0].start.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        {selectedEvent && (
          <EventPopup event={selectedEvent.event} onClose={() => setSelectedEvent(null)} />
        )}
        
        {selectedDateEvents && (
          <EventList 
            events={selectedDateEvents} 
            onEventClick={handleEventClick} 
            onClose={() => setSelectedDateEvents(null)} 
          />
        )}
      </div>
    );
  };
  
  export default MonthView;