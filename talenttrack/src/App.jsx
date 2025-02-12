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
import Profile from "./pages/Profile";
import Dashboard from "./pages/DashBoard";


function App() {
  const [jobs, setJobs] = useState([]); 

  
  const addJob = (newJob) => {
    setJobs([...jobs, { ...newJob, id: jobs.length + 1 }]); 
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
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
