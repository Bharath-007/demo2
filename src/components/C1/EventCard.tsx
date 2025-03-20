import { Box, Divider, IconButton, Popover, Typography } from "@mui/material";
import moment from "moment";
import { FC, useState } from "react";
import { CalendarEvent } from "./types/types";
import { IoCloseCircle, IoPencil, IoTrash } from "react-icons/io5";
import EventList from "./EventList";

interface IEventCard {
  events: CalendarEvent[];
}

const EventCard: FC<IEventCard> = ({ events }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    if (events.length > 1) setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const isOpen = Boolean(anchorEl);
  const id = isOpen ? "simple-popover" : undefined;

  return (
    <>
      <Box
        sx={{
          padding: "5px",
          borderRadius: "4px",
          width: "12vw",
          display: "flex",
          alignItems: "start",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          justifyContent: "space-between",
          borderLeft: "1vh solid #3b82f6",
          position: "relative",
          flexDirection: "column",
          bgcolor: isOpen ? "#dbeafe" : "white", // Light blue when active
          transition: "background-color 0.3s ease",
          cursor: "pointer",
          "&:hover": {
            bgcolor: "#dbeafe",
          },
        }}
        onClick={handleOpen} // Open popover on click
      >
        <Typography variant="body2" sx={{ fontWeight: 500, color: "grey.800" }}>
          {events[0]?.event?.user_det?.job_id?.jobRequest_Title ?? "N/A"}
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 500, color: "grey.800" }}>
          Interviewer:{" "}
          {events[0]?.event?.user_det?.handled_by?.firstName ?? "N/A"}
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 500, color: "grey.800" }}>
          {moment(events[0]?.start, "HH:mm").format("h A")} -{" "}
          {moment(events[0]?.end, "HH:mm").format("h A")}
        </Typography>

        {/* Badge - Positioned in the top-right */}
        {events.length > 1 && (
          <Box
            sx={{
              backgroundColor: "#facc15",
              color: "white",
              borderRadius: "50%",
              width: "24px",
              height: "24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
              position: "absolute",
              top: 0,
              right: 0,
              transform: "translate(50%, -50%)",
            }}
          >
            {events.length}
          </Box>
        )}
      </Box>
      {/* Popover - Opens on click */}
      {events.length > 1 && (
        <Popover
          id={id}
          open={isOpen}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          sx={{ m: 1 }}
        >
          <EventList
            events={events}
            onEventClick={() => {}}
            onClose={() => {}}
          />
        </Popover>
      )}
    </>
  );
};

export default EventCard;
