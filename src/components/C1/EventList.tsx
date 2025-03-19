import React from "react";
import { CalendarEvent } from "./types/types";
import { Box, Divider, IconButton, Typography } from "@mui/material";
import { IoCloseCircle, IoPencil, IoTrash } from "react-icons/io5";
import moment from "moment";

interface EventListProps {
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
  onClose: () => void;
}

const EventList: React.FC<EventListProps> = ({
  events,
  onEventClick,
  onClose,
}) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 1,
        }}
      >
        <Typography className="text-sm">Meetings</Typography>
        <IconButton onClick={onClose}>
          <IoCloseCircle color="#3b82f6" size={24} />
        </IconButton>
      </Box>
      <Divider />
      <Box sx={{ width: "20vw", py: 1 }}>
        {events.map((event, index) => (
          <>
            <Box
              key={index}
              sx={{
                display: "flex",
                flexDirection: "column",
                bgcolor: "white",
                padding: 1.5,
                borderRadius: 0,
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                marginBottom: 1.5,
                borderLeft: "1vh solid #3b82f6",
                position: "relative",
              }}
            >
              <Typography
                fontSize={"14px"}
                sx={{ textTransform: "capitalize" }}
              >
                {event?.event?.user_det?.job_id?.jobRequest_Title ?? "N/A"}
              </Typography>
              <div>
                <Typography
                  fontSize={"12px"}
                  sx={{ textTransform: "capitalize" }}
                >
                  {event?.event?.summary}
                  <span
                    style={{
                      color: "#454545",
                      opacity: 0.4,
                      marginInline: 4,
                    }}
                  >
                    |
                  </span>
                  Interviewer:{" "}
                  {event?.event?.user_det?.handled_by?.firstName ?? "N/A"}
                </Typography>
              </div>
              <Typography
                fontSize={"12px"}
                sx={{ textTransform: "capitalize" }}
              >
                Date: {moment(event?.start).format("DD MMM YYYY")}
                <span
                  style={{ color: "#454545", opacity: 0.4, marginInline: 4 }}
                >
                  |
                </span>{" "}
                Time: {moment(event?.start, "HH:mm").format("h:mm A")} -{" "}
                {moment(event?.end, "HH:mm").format("h:mm A")}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  position: "absolute",
                  top: 5,
                  right: 10,
                }}
              >
                <IconButton>
                  <IoPencil size={18} color="#3b82f6" />
                </IconButton>
                <IconButton>
                  <IoTrash size={18} color="#ef4444" />
                </IconButton>
              </Box>
            </Box>
            <Divider />
          </>
        ))}
      </Box>
    </>
  );
};

export default EventList;
