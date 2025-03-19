import React from "react";
import { Container } from "@mui/material";
import Calendar from "./components/Calendar";

// Sample events data
const events = [
  {
    id: "1",
    title: "Team Meeting",
    start: new Date(2024, 7, 24, 10, 0), // August 24, 2024, 10:00 AM
    end: new Date(2024, 7, 24, 11, 0),
    description: "Weekly team sync meeting",
    meetingLink: "https://meet.google.com/sample-link",
  },
  {
    id: "2",
    title: "Project Review",
    start: new Date(2024, 7, 24, 14, 0), // August 24, 2024, 2:00 PM
    end: new Date(2024, 7, 24, 15, 0),
    description: "Q3 project review meeting",
    meetingLink: "https://zoom.us/sample-link",
  },
];

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <Container maxWidth="lg">
        <Calendar events={events} />
      </Container>
    </div>
  );
}

export default App;
