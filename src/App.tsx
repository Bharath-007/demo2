import React, { useState } from "react";
import { CalendarEvent, Event } from "./components/C1/types/types";
import { parseEvents } from "./components/C1/utils";
import Calendar from "./components/C1/Calender";

const events: Event[] = [
  {
    id: 1,
    summary: "Meeting",
    desc: "Project discussion",
    start: "2025-03-19T10:00:00",
    end: "2025-03-19T11:00:00",
    attendees: null,
    status: null,
    comment: null,
    score: {},
    link: "",
    user_det: {
      id: 1,
      question_score: null,
      status: null,
      candidate: {
        id: 1,
        candidate_firstName: "John",
        candidate_lastName: "Doe",
        candidateGender: "Male",
        candidateComment: "",
        candidate_email: "john.doe@example.com",
      },
      handled_by: {
        id: 1,
        last_login: null,
        userEmail: "recruiter@example.com",
        username: "recruiter123",
        firstName: "Recruiter",
        lastName: "User",
        userRole: "HR",
      },
      job_id: {
        id: 1,
        jobRequest_Title: "Software Engineer",
        jobRequest_Role: "Frontend Developer",
        jobRequest_KeySkills: "React, TypeScript",
        jobRequest_Description: "Develop UI components",
      },
    },
    job_id: {
      id: 1,
      jobRequest_Title: "Software Engineer",
      jobRequest_Role: "Frontend Developer",
      jobRequest_KeySkills: "React, TypeScript",
      jobRequest_Description: "Develop UI components",
    },
  },
  {
    id: 2,
    summary: "Meeting",
    desc: "Project discussion",
    start: "2025-03-19T10:00:00",
    end: "2025-03-19T11:00:00",
    attendees: null,
    status: null,
    comment: null,
    score: {},
    link: "",
    user_det: {
      id: 1,
      question_score: null,
      status: null,
      candidate: {
        id: 1,
        candidate_firstName: "John",
        candidate_lastName: "Doe",
        candidateGender: "Male",
        candidateComment: "",
        candidate_email: "john.doe@example.com",
      },
      handled_by: {
        id: 1,
        last_login: null,
        userEmail: "recruiter@example.com",
        username: "recruiter123",
        firstName: "Recruiter",
        lastName: "User",
        userRole: "HR",
      },
      job_id: {
        id: 1,
        jobRequest_Title: "Software Engineer",
        jobRequest_Role: "Frontend Developer",
        jobRequest_KeySkills: "React, TypeScript",
        jobRequest_Description: "Develop UI components",
      },
    },
    job_id: {
      id: 1,
      jobRequest_Title: "Software Engineer",
      jobRequest_Role: "Frontend Developer",
      jobRequest_KeySkills: "React, TypeScript",
      jobRequest_Description: "Develop UI components",
    },
  },
  {
    id: 3,
    summary: "2nd Round",
    desc: "2nd Round",
    start: "2025-03-20T20:00:00+05:30",
    end: "2025-03-20T21:00:00+05:30",
    attendees: null,
    status: null,
    comment: null,
    score: {
      o: 6,
    },
    link: "http://www.hhh.com",
    user_det: {
      id: 1,
      question_score: null,
      status: null,
      candidate: {
        id: 1,
        candidate_firstName: "mohan",
        candidate_lastName: "raj",
        candidateGender: "male",
        candidateComment: "",
        candidate_email: "mohanrajk@dataterrain.com",
      },
      handled_by: {
        id: 3,
        last_login: null,
        userEmail: "vinodhini_hr@dataterrain.com",
        username: "vinodhini_hr",
        firstName: "Vinodhini",
        lastName: "HR",
        userRole: "hr_employee",
      },
      job_id: {
        id: 11,
        jobRequest_Title: "django developer",
        jobRequest_Role: "software engineer",
        jobRequest_KeySkills: "django",
        jobRequest_Description: "asfffasf",
      },
    },
    job_id: {
      id: 11,
      jobRequest_Title: "django developer",
      jobRequest_Role: "software engineer",
      jobRequest_KeySkills: "django",
      jobRequest_Description: "asfffasf",
    },
  },
];

const App: React.FC = () => {
  const [view, setView] = useState<"day" | "week" | "month">("day");

  // const parsedEvents: CalendarEvent[] = parseEvents(events);

  return (
    <div style={{ height: "90vh" }}>
      <Calendar events={events} view={view} onViewChange={setView} />
    </div>
  );
};

export default App;
