import Apply from "./pages/Apply";
import Home from "./pages/Home";
import JobDetails from "./pages/JobDetails";
import JobList from "./pages/JobList";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import React, { useState } from "react";
import PostJob from "./pages/PostJob";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyJobs from "./pages/MyJobs";


function App() {
  const [jobs, setJobs] = useState([]); // Store job data

  // Function to add a new job
  const addJob = (newJob) => {
    setJobs([...jobs, { ...newJob, id: jobs.length + 1 }]); // Assign an ID
  };
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/joblist" element={<JobList />} />
        <Route path="/job/:id" element={<JobDetails />} />
        <Route path="/apply/:id" element={<Apply />} />
        <Route path="/postjob" element={<PostJob />} />
        <Route path="/myjobs" element={<MyJobs />} />
      </Routes>
    </Router>
  );
}

export default App;
