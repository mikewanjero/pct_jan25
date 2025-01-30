/* eslint-disable no-unused-vars */
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import PersonalInfo from "./components/PersonalInfo";
import Education from "./components/Education";
import WorkExperience from "./components/WorkExperience";
import UserPhoto from "./components/UserPhoto";
import "../src/styles/custom.scss";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/step1" />} />
        <Route path="/step1" element={<PersonalInfo />} />
        <Route path="/education" element={<Education />} />
        <Route path="/work-experience" element={<WorkExperience />} />
        <Route path="/user-photo" element={<UserPhoto />} />
      </Routes>
    </Router>
  );
}

export default App;
