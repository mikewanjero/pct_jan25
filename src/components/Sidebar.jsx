/* eslint-disable no-unused-vars */
import React from "react";
import { useLocation } from "react-router-dom";
import "../styles/custom.scss";

const Sidebar = () => {
  const location = useLocation();
  const steps = [
    "Personal Information",
    "Education",
    "Work Experience",
    "User Photo",
  ];
  const stepIndex = steps.findIndex((step) =>
    location.pathname.includes(step.toLowerCase().replace(" ", "-"))
  );

  return (
    <div className="sidebar">
      <h3>indeed</h3>
      <h4>Step {stepIndex + 1}</h4>
      <ul className="progress-list">
        {steps.map((step, index) => (
          <li key={index} className={index <= stepIndex ? "active" : ""}>
            {step}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
