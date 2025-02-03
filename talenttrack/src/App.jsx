import Apply from "./pages/Apply";
import Home from "./pages/Home";
import JobDetails from "./pages/JobDetails";
import JobList from "./pages/JobList";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/joblist" element={<JobList />} />
        <Route path="/job/:id" element={<JobDetails />} />
        <Route path="/apply/:id" element={<Apply />} />
        
      </Routes>
    </Router>
  );
}

export default App;
