import React from "react";
import MesCalenderBig from "./components/MesCalender/MesCalenderBig";

const App = () => {
  const events = [
    {
      title: "Team Meeting",
      start: new Date(2024, 2, 20, 10, 0), // March 20, 2024, 10:00 AM
      end: new Date(2024, 2, 20, 11, 30), // March 20, 2024, 11:30 AM
      data: 1, // Will show in green
    },
    {
      title: "Project Deadline",
      start: new Date(2024, 2, 22), // March 22, 2024
      end: new Date(2024, 2, 22),
      data: 0, // Will show in orange
    },
    {
      title: "Training Session",
      start: new Date(2024, 2, 25, 14, 0), // March 25, 2024, 2:00 PM
      end: new Date(2024, 2, 25, 16, 0), // March 25, 2024, 4:00 PM
      data: 1,
    },
  ];
  return (
    <div>
      App
      <MesCalenderBig events={events} />
    </div>
  );
};

export default App;
