import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { CalendarViewProps } from './types/types';
import { IconButton, Tab, Tabs } from '@mui/material';

interface CalendarHeaderProps extends Pick<CalendarViewProps, 'view' | 'onViewChange'> {
    currentDate: Date;
    onPrevious: () => void;
    onNext: () => void;
    onToday: () => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
    currentDate,
    view,
    onViewChange,
    onPrevious,
    onNext,
    onToday
}) => {
    const getHeaderTitle = () => {
        switch (view) {
            case 'day':
                return currentDate.toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
            case 'week':
                const startOfWeek = new Date(currentDate);
                startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
                const endOfWeek = new Date(startOfWeek);
                endOfWeek.setDate(startOfWeek.getDate() + 6);
                return `${startOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${endOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
            case 'month':
                return currentDate.toLocaleDateString('en-US', {
                    month: 'long',
                    year: 'numeric'
                });
            default:
                return '';
        }
    };

    return (
        <div className="flex justify-between items-center mb-4 px-4 py-2 bg-white rounded-t-lg">
            {/* <div className="flex items-center">
                <h2 className="text-xl font-semibold">{getHeaderTitle()}</h2>
            </div> */}
            <div className="flex items-center space-x-1">
                <IconButton
                    onClick={onPrevious}
                    className="p-2 hover:bg-gray-200 transition duration-200"
                >
                    <FaChevronLeft />
                </IconButton>
                <IconButton
                    onClick={onNext}
                    className="p-2 hover:bg-gray-200 transition duration-200"
                >
                    <FaChevronRight />
                </IconButton>
            </div>
            <div className="flex items-center space-x-2">
                {/* <button
                    onClick={onToday}
                    className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition duration-200"
                >
                    Today
                </button> */}
                {/* <div className="flex space-x-1 ml-4">
                    <button
                        onClick={() => onViewChange('day')}
                        className={`px-4 py-2 rounded-md transition duration-200 ${view === 'day' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
                            }`}
                    >
                        Day
                    </button>
                    <button
                        onClick={() => onViewChange('week')}
                        className={`px-4 py-2 rounded-md transition duration-200 ${view === 'week' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
                            }`}
                    >
                        Week
                    </button>
                    <button
                        onClick={() => onViewChange('month')}
                        className={`px-4 py-2 rounded-md transition duration-200 ${view === 'month' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
                            }`}
                    >
                        Month
                    </button>
                </div> */}
                <Tabs
                    value={view}
                    onChange={(_, newValue) => onViewChange(newValue)}
                    variant="scrollable"
                    scrollButtons="auto"
                >
                    <Tab label="Day" value="day" />
                    <Tab label="Week" value="week" />
                    <Tab label="Month" value="month" />
                </Tabs>
            </div>
        </div>
    );
};

export default CalendarHeader;