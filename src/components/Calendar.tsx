import React, { useState } from "react";
import {
  Paper,
  IconButton,
  Button,
  ButtonGroup,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
// import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  format,
  addMonths,
  addWeeks,
  addDays,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameDay,
  isSameMonth,
} from "date-fns";
import { CalendarViewMode, CalendarEvent } from "../types/index";

interface CalendarProps {
  events: CalendarEvent[];
}

export default function Calendar({ events }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<CalendarViewMode>("month");
  const [selectedEvents, setSelectedEvents] = useState<CalendarEvent[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null
  );

  const handlePrevious = () => {
    switch (viewMode) {
      case "month":
        setCurrentDate(addMonths(currentDate, -1));
        break;
      case "week":
        setCurrentDate(addWeeks(currentDate, -1));
        break;
      case "day":
        setCurrentDate(addDays(currentDate, -1));
        break;
    }
  };

  const handleNext = () => {
    switch (viewMode) {
      case "month":
        setCurrentDate(addMonths(currentDate, 1));
        break;
      case "week":
        setCurrentDate(addWeeks(currentDate, 1));
        break;
      case "day":
        setCurrentDate(addDays(currentDate, 1));
        break;
    }
  };

  const getHeaderText = () => {
    switch (viewMode) {
      case "month":
        return format(currentDate, "MMMM yyyy");
      case "week":
        const weekStart = startOfWeek(currentDate);
        const weekEnd = endOfWeek(currentDate);
        return `${format(weekStart, "d MMM")} - ${format(
          weekEnd,
          "d MMM yyyy"
        )}`;
      case "day":
        return format(currentDate, "d MMMM yyyy");
    }
  };

  const getDaysToDisplay = () => {
    switch (viewMode) {
      case "month": {
        const start = startOfMonth(currentDate);
        const end = endOfMonth(currentDate);
        return eachDayOfInterval({
          start: startOfWeek(start),
          end: endOfWeek(end),
        });
      }
      case "week": {
        const start = startOfWeek(currentDate);
        const end = endOfWeek(currentDate);
        return eachDayOfInterval({ start, end });
      }
      case "day":
        return [currentDate];
    }
  };

  const getEventsForDay = (day: Date) => {
    return events.filter((event) => isSameDay(new Date(event.start), day));
  };

  const handleDayClick = (day: Date) => {
    const dayEvents = getEventsForDay(day);
    if (dayEvents.length > 0) {
      setSelectedEvents(dayEvents);
      setDialogOpen(true);
    }
  };

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
  };

  const handleJoinMeeting = () => {
    if (selectedEvent?.meetingLink) {
      window.open(selectedEvent.meetingLink, "_blank");
    }
  };

  return (
    <Paper className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <IconButton onClick={handlePrevious}>
            {/* <ChevronLeft /> */}
            {"<"}
          </IconButton>
          <IconButton onClick={handleNext}>
            {/* <ChevronRight /> */}
            {">"}
          </IconButton>
        </div>

        <Typography variant="h5" className="font-semibold">
          {getHeaderText()}
        </Typography>

        <ButtonGroup variant="outlined" size="small">
          <Button
            onClick={() => setViewMode("month")}
            variant={viewMode === "month" ? "contained" : "outlined"}
          >
            Month
          </Button>
          <Button
            onClick={() => setViewMode("week")}
            variant={viewMode === "week" ? "contained" : "outlined"}
          >
            Week
          </Button>
          <Button
            onClick={() => setViewMode("day")}
            variant={viewMode === "day" ? "contained" : "outlined"}
          >
            Day
          </Button>
        </ButtonGroup>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {viewMode !== "day" && (
          <>
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="p-2 text-center font-semibold">
                {day}
              </div>
            ))}
          </>
        )}

        {getDaysToDisplay().map((day, index) => {
          const dayEvents = getEventsForDay(day);
          const isCurrentMonth = isSameMonth(day, currentDate);

          return (
            <div
              key={day.toISOString()}
              onClick={() => handleDayClick(day)}
              className={`
                min-h-[100px] p-2 border border-gray-200 cursor-pointer
                ${
                  !isCurrentMonth && viewMode === "month"
                    ? "bg-gray-50 text-gray-400"
                    : ""
                }
                hover:bg-gray-50 transition-colors
              `}
            >
              <div className="font-semibold mb-1">{format(day, "d")}</div>
              {dayEvents.length > 0 && (
                <div className="flex items-center gap-1">
                  <div className="bg-amber-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                    {dayEvents.length}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Events</DialogTitle>
        <DialogContent>
          <List>
            {selectedEvents.map((event) => (
              <ListItem
                key={event.id}
                button
                onClick={() => handleEventClick(event)}
              >
                <ListItemText
                  primary={event.title}
                  secondary={`${format(
                    new Date(event.start),
                    "HH:mm"
                  )} - ${format(new Date(event.end), "HH:mm")}`}
                />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={Boolean(selectedEvent)}
        onClose={() => setSelectedEvent(null)}
        maxWidth="sm"
        fullWidth
      >
        {selectedEvent && (
          <>
            <DialogTitle>{selectedEvent.title}</DialogTitle>
            <DialogContent>
              <Typography variant="body1" gutterBottom>
                {selectedEvent.description}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {format(new Date(selectedEvent.start), "PPp")} -{" "}
                {format(new Date(selectedEvent.end), "PPp")}
              </Typography>
            </DialogContent>
            <DialogActions>
              {selectedEvent.meetingLink && (
                <Button onClick={handleJoinMeeting} color="primary">
                  Join Meeting
                </Button>
              )}
              <Button onClick={() => setSelectedEvent(null)}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Paper>
  );
}

// import React, { useState } from "react";
// import {
//   Paper,
//   IconButton,
//   Button,
//   Typography,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Card,
//   CardContent,
// } from "@mui/material";
// // import { ChevronLeft, ChevronRight, Eye, Download } from "lucide-react";
// import {
//   format,
//   addMonths,
//   addWeeks,
//   addDays,
//   startOfMonth,
//   endOfMonth,
//   startOfWeek,
//   endOfWeek,
//   eachDayOfInterval,
//   isSameDay,
//   isSameMonth,
//   eachHourOfInterval,
//   startOfDay,
//   endOfDay,
//   isWithinInterval,
// } from "date-fns";
// import { CalendarViewMode, CalendarEvent } from "../types/index";

// interface CalendarProps {
//   events: CalendarEvent[];
// }

// const HOURS = Array.from(
//   { length: 24 },
//   (_, i) => `${i.toString().padStart(2, "0")}:00`
// );

// export default function Calendar({ events }: CalendarProps) {
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [viewMode, setViewMode] = useState<CalendarViewMode>("week");
//   const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
//     null
//   );

//   const handlePrevious = () => {
//     switch (viewMode) {
//       case "month":
//         setCurrentDate(addMonths(currentDate, -1));
//         break;
//       case "week":
//         setCurrentDate(addWeeks(currentDate, -1));
//         break;
//       case "day":
//         setCurrentDate(addDays(currentDate, -1));
//         break;
//     }
//   };

//   const handleNext = () => {
//     switch (viewMode) {
//       case "month":
//         setCurrentDate(addMonths(currentDate, 1));
//         break;
//       case "week":
//         setCurrentDate(addWeeks(currentDate, 1));
//         break;
//       case "day":
//         setCurrentDate(addDays(currentDate, 1));
//         break;
//     }
//   };

//   const getHeaderText = () => {
//     switch (viewMode) {
//       case "month":
//         return format(currentDate, "MMMM yyyy");
//       case "week": {
//         const weekStart = startOfWeek(currentDate);
//         const weekEnd = endOfWeek(currentDate);
//         return `${format(weekStart, "dd")}${format(weekStart, "th")} ${format(
//           weekStart,
//           "MMMM"
//         )} to ${format(weekEnd, "dd")}${format(weekEnd, "th")} ${format(
//           weekEnd,
//           "MMMM"
//         )}, ${format(weekEnd, "yyyy")}`;
//       }
//       case "day":
//         return format(currentDate, "dd MMMM yyyy");
//       default:
//         return "";
//     }
//   };

//   const getDaysToDisplay = () => {
//     switch (viewMode) {
//       case "month": {
//         const start = startOfMonth(currentDate);
//         const end = endOfMonth(currentDate);
//         return eachDayOfInterval({
//           start: startOfWeek(start),
//           end: endOfWeek(end),
//         });
//       }
//       case "week": {
//         const start = startOfWeek(currentDate);
//         const end = endOfWeek(currentDate);
//         return eachDayOfInterval({ start, end });
//       }
//       case "day":
//         return [currentDate];
//       default:
//         return [];
//     }
//   };

//   const getEventsForInterval = (start: Date, end: Date) => {
//     return events.filter(
//       (event) =>
//         isWithinInterval(new Date(event.start), { start, end }) ||
//         isWithinInterval(new Date(event.end), { start, end })
//     );
//   };

//   const handleEventClick = (event: CalendarEvent) => {
//     setSelectedEvent(event);
//   };

//   const renderTimeGrid = () => {
//     const days = getDaysToDisplay();

//     return (
//       <div
//         className="grid"
//         style={{ gridTemplateColumns: `80px repeat(${days.length}, 1fr)` }}
//       >
//         {/* Header row with days */}
//         <div className="h-16 border-b"></div>
//         {days.map((day) => (
//           <div
//             key={day.toISOString()}
//             className="h-16 border-b p-2 text-center"
//           >
//             <div className="font-medium">{format(day, "dd MMM")}</div>
//             <div className="text-gray-600">{format(day, "EEEE")}</div>
//           </div>
//         ))}

//         {/* Time slots */}
//         {HOURS.map((hour) => (
//           <React.Fragment key={hour}>
//             <div className="h-20 border-b p-2 text-right text-sm text-gray-600">
//               {hour}
//             </div>
//             {days.map((day) => {
//               const timeSlotStart = new Date(day.setHours(parseInt(hour)));
//               const timeSlotEnd = new Date(timeSlotStart.getTime() + 3600000);
//               const slotEvents = getEventsForInterval(
//                 timeSlotStart,
//                 timeSlotEnd
//               );

//               return (
//                 <div
//                   key={`${day.toISOString()}-${hour}`}
//                   className="h-20 border-b border-l relative"
//                 >
//                   {slotEvents.map((event) => (
//                     <div
//                       key={event.id}
//                       onClick={() => handleEventClick(event)}
//                       className="absolute left-0 right-0 m-1 bg-blue-100 rounded p-2 cursor-pointer hover:bg-blue-200 transition-colors"
//                     >
//                       <div className="flex items-center gap-2">
//                         <div className="w-1 h-full bg-blue-600"></div>
//                         <div>
//                           <div className="font-medium">{event.title}</div>
//                           <div className="text-sm text-gray-600">
//                             {format(new Date(event.start), "HH:mm")} -{" "}
//                             {format(new Date(event.end), "HH:mm")}
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               );
//             })}
//           </React.Fragment>
//         ))}
//       </div>
//     );
//   };

//   return (
//     <Paper className="p-6 overflow-auto">
//       <div className="flex justify-between items-center mb-6">
//         <div className="flex items-center gap-4">
//           <div className="flex gap-1 items-center">
//             <IconButton
//               onClick={handlePrevious}
//               size="small"
//               className="border"
//             >
//               {/* <ChevronLeft size={16} /> */}
//               {"<"}
//             </IconButton>
//             <IconButton onClick={handleNext} size="small" className="border">
//               {/* <ChevronRight size={16} /> */}
//               {">"}
//             </IconButton>
//           </div>
//           <div className="bg-gray-100 px-4 py-2 rounded-lg">
//             {format(currentDate, "dd")}
//           </div>
//         </div>

//         <Typography variant="h6" className="font-medium">
//           {getHeaderText()}
//         </Typography>

//         <div className="flex gap-2">
//           <Button
//             variant={viewMode === "day" ? "contained" : "text"}
//             onClick={() => setViewMode("day")}
//             size="small"
//           >
//             Day
//           </Button>
//           <Button
//             variant={viewMode === "week" ? "contained" : "text"}
//             onClick={() => setViewMode("week")}
//             size="small"
//           >
//             Week
//           </Button>
//           <Button
//             variant={viewMode === "month" ? "contained" : "text"}
//             onClick={() => setViewMode("month")}
//             size="small"
//           >
//             Month
//           </Button>
//           <Button
//             variant={viewMode === "year" ? "contained" : "text"}
//             onClick={() => setViewMode("year")}
//             size="small"
//           >
//             Year
//           </Button>
//         </div>
//       </div>

//       <div className="overflow-x-auto">{renderTimeGrid()}</div>

//       <Dialog
//         open={Boolean(selectedEvent)}
//         onClose={() => setSelectedEvent(null)}
//         maxWidth="sm"
//         fullWidth
//       >
//         {selectedEvent && (
//           <>
//             <DialogTitle>
//               Interview With: {selectedEvent.interviewer}
//               <IconButton
//                 onClick={() => setSelectedEvent(null)}
//                 className="absolute right-2 top-2"
//                 size="small"
//               >
//                 {/* <ChevronRight className="rotate-45" /> */}
//                 {">"}
//               </IconButton>
//             </DialogTitle>
//             <DialogContent>
//               <div className="space-y-4">
//                 <div>
//                   <div className="text-gray-600">Position:</div>
//                   <div className="font-medium">{selectedEvent.position}</div>
//                 </div>

//                 <div>
//                   <div className="text-gray-600">Interview Date:</div>
//                   <div className="font-medium">
//                     {format(new Date(selectedEvent.start), "dd MMM yyyy")}
//                   </div>
//                 </div>

//                 <div>
//                   <div className="text-gray-600">Interview Time:</div>
//                   <div className="font-medium">
//                     {format(new Date(selectedEvent.start), "HH:mm")} -{" "}
//                     {format(new Date(selectedEvent.end), "HH:mm")}
//                   </div>
//                 </div>

//                 {selectedEvent.meetingPlatform && (
//                   <div>
//                     <div className="text-gray-600">Interview Via:</div>
//                     <div className="font-medium">
//                       {selectedEvent.meetingPlatform}
//                     </div>
//                   </div>
//                 )}

//                 <div className="flex gap-4">
//                   {selectedEvent.documents?.resume && (
//                     <Button
//                       variant="outlined"
//                       // startIcon={<Eye size={16} />}
//                       // endIcon={<Download size={16} />}
//                       size="small"
//                     >
//                       Resume.docx
//                     </Button>
//                   )}
//                   {selectedEvent.documents?.aadhar && (
//                     <Button
//                       variant="outlined"
//                       // startIcon={<Eye size={16} />}
//                       // endIcon={<Download size={16} />}
//                       size="small"
//                     >
//                       Aadharcard
//                     </Button>
//                   )}
//                 </div>

//                 {selectedEvent.meetingLink && (
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     fullWidth
//                     onClick={() =>
//                       window.open(selectedEvent.meetingLink, "_blank")
//                     }
//                   >
//                     JOIN
//                   </Button>
//                 )}
//               </div>
//             </DialogContent>
//           </>
//         )}
//       </Dialog>
//     </Paper>
//   );
// }
