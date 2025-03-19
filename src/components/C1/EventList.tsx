import React from 'react';
import { CalendarEvent } from './types/types';
import { formatTime } from './utils';

interface EventListProps {
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
  onClose: () => void;
}

const EventList: React.FC<EventListProps> = ({ events, onEventClick, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Events on {events[0].start.toLocaleDateString()}</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200">
            <span className="sr-only">Close</span>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {events.map((event) => (
            <div
              key={event.id}
              onClick={() => onEventClick(event)}
              className="p-3 bg-blue-50 rounded-md hover:bg-blue-100 cursor-pointer"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-medium">{event.title}</h3>
                <span className="text-sm text-gray-500">{formatTime(event.start.toISOString())}</span>
              </div>
              <p className="text-sm text-gray-600">
                {event.event.user_det.candidate.candidate_firstName} {event.event.user_det.candidate.candidate_lastName}
              </p>
              <p className="text-xs text-gray-500">
                {event.event.job_id.jobRequest_Title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventList;