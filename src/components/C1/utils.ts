import { Event, CalendarEvent } from './types/types';

export const formatTime = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
};

export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
};

export const parseEvents = (events: Event[]): CalendarEvent[] => {
    return events.map(event => ({
        id: event.id,
        title: event.summary,
        start: new Date(event.start),
        end: new Date(event.end),
        event: event
    }));
};

export const getEventsForDate = (events: CalendarEvent[], date: Date): CalendarEvent[] => {
    return events.filter(event =>
        event.start.getFullYear() === date.getFullYear() &&
        event.start.getMonth() === date.getMonth() &&
        event.start.getDate() === date.getDate()
    );
};

export const getEventsForWeek = (events: CalendarEvent[], date: Date): CalendarEvent[] => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay());

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    return events.filter(event =>
        event.start >= startOfWeek && event.start <= endOfWeek
    );
};

export const getEventsAtSameTime = (events: CalendarEvent[], time: Date): CalendarEvent[] => {
    return events.filter(event =>
        event.start.getHours() === time.getHours() &&
        event.start.getMinutes() === time.getMinutes()
    );
};

export const groupEventsByTime = (events: CalendarEvent[]): Record<string, CalendarEvent[]> => {
    const groupedEvents: Record<string, CalendarEvent[]> = {};

    events.forEach(event => {
        const timeKey = `${event.start.getHours()}:${event.start.getMinutes()}`;

        if (!groupedEvents[timeKey]) {
            groupedEvents[timeKey] = [];
        }

        groupedEvents[timeKey].push(event);
    });

    return groupedEvents;
};

// export const generateTimeSlots = (): string[] => {
//     const timeSlots = [];
//     for (let hour = 0; hour < 24; hour++) {
//         timeSlots.push(`${hour.toString().padStart(2, '0')}:00`);
//         timeSlots.push(`${hour.toString().padStart(2, '0')}:30`);
//     }
//     return timeSlots;
// };

export const generateTimeSlots = (): string[] => {
    const timeSlots = [];
    for (let hour = 0; hour < 24; hour++) {
        const period = hour < 12 ? 'A.M' : 'P.M';
        const formattedHour = hour % 12 === 0 ? 12 : hour % 12; // Convert 0 -> 12 for AM and 12 -> 12 for PM
        timeSlots.push(`${formattedHour.toString().padStart(2, '0')} ${period}`);
    }
    return timeSlots;
};

export const generateDaysOfWeek = (date: Date): Date[] => {
    const days = [];
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay());

    for (let i = 0; i < 7; i++) {
        const day = new Date(startOfWeek);
        day.setDate(startOfWeek.getDate() + i);
        days.push(day);
    }

    return days;
};

export const generateDaysInMonth = (year: number, month: number): Date[] => {
    const days = [];
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    // Add days from previous month to fill the first week
    const firstDayOfWeek = firstDay.getDay();
    for (let i = firstDayOfWeek; i > 0; i--) {
        const day = new Date(year, month, 1 - i);
        days.push(day);
    }

    // Add days of the current month
    for (let i = 1; i <= lastDay.getDate(); i++) {
        const day = new Date(year, month, i);
        days.push(day);
    }

    // Add days from next month to fill the last week
    const lastDayOfWeek = lastDay.getDay();
    for (let i = 1; i < 7 - lastDayOfWeek; i++) {
        const day = new Date(year, month + 1, i);
        days.push(day);
    }

    return days;
};