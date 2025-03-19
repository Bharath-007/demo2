import moment from "moment";
import { Calendar, CalendarProps, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./style.css";
import { Box } from "@mui/material";

const localizer = momentLocalizer(moment);

const MesCalenderBig = (props: Omit<CalendarProps, "localizer">) => {
  const components = {
    event: (props: any) => {
      const eventType = props?.event?.data;
      switch (eventType) {
        default:
          return (
            <div
              style={{
                background:
                  "linear-gradient(90deg, #0063BE 5.22%, #ffffff 5.22%)",
                color: "black",
                height: "100%",
                padding: "0.5vh",
                borderRadius: "0.4vh",
                minHeight: "300vh",
                paddingLeft: "15px",
                boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.6)",
              }}
            >
              {props.title}
            </div>
          );
      }
    },
  };

  return (
    <div style={{ height: "94vh", width: "99.9%", zIndex: 0 }}>
      <Calendar
        {...props}
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        defaultView="month"
        views={["day", "week", "month"]}
        components={components}
      />
    </div>
  );
};

export default MesCalenderBig;
