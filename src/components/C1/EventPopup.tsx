import React from 'react';
import { Event } from './types/types';
import { formatTime, formatDate } from './utils';
import { FaTimes, FaLink } from 'react-icons/fa';

interface EventPopupProps {
  event: Event;
  onClose: () => void;
}

const EventPopup: React.FC<EventPopupProps> = ({ event, onClose }) => {
  const handleJoin = () => {
    window.open(event.link, '_blank');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{event.summary}</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200">
            <FaTimes />
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-gray-700">Description</h3>
            <p>{event.desc}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium text-gray-700">Date</h3>
              <p>{formatDate(event.start)}</p>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-700">Time</h3>
              <p>{formatTime(event.start)} - {formatTime(event.end)}</p>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-700">Candidate</h3>
            <p>{`${event.user_det.candidate.candidate_firstName} ${event.user_det.candidate.candidate_lastName}`}</p>
            <p className="text-sm text-gray-500">{event.user_det.candidate.candidate_email}</p>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-700">Handled By</h3>
            <p>{`${event.user_det.handled_by.firstName} ${event.user_det.handled_by.lastName}`}</p>
            <p className="text-sm text-gray-500">{event.user_det.handled_by.userEmail}</p>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-700">Job Details</h3>
            <p><strong>Title:</strong> {event.job_id.jobRequest_Title}</p>
            <p><strong>Role:</strong> {event.job_id.jobRequest_Role}</p>
            <p><strong>Skills:</strong> {event.job_id.jobRequest_KeySkills}</p>
          </div>
          
          {Object.keys(event.score).length > 0 && (
            <div>
              <h3 className="font-medium text-gray-700">Score</h3>
              {Object.entries(event.score).map(([key, value]) => (
                <p key={key}><strong>{key}:</strong> {value}</p>
              ))}
            </div>
          )}
          
          <button
            onClick={handleJoin}
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center justify-center space-x-2"
          >
            <FaLink />
            <span>Join Meeting</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventPopup;