/* eslint-disable react/prop-types */
import { Container, ListGroup, ProgressBar } from "react-bootstrap";
import { FaUser, FaGraduationCap, FaBriefcase, FaCamera } from "react-icons/fa";

const Sidebar = ({ step }) => {
  const steps = [
    { id: 1, name: "Personal Information", icon: <FaUser /> },
    { id: 2, name: "Education", icon: <FaGraduationCap /> },
    { id: 3, name: "Work Experience", icon: <FaBriefcase /> },
    { id: 4, name: "User Photo", icon: <FaCamera /> },
  ];

  return (
    <Container className="bg-dark text-white p-4 h-100 d-flex flex-column justify-content-between">
      <div>
        <h3 className="fw-bold">CoreBase Solutions Limited™</h3>
        <h4>Step {step}</h4>
        <p>Complete your profile to get closer to companies.</p>
      </div>

      <ListGroup variant="flush">
        {steps.map((s) => (
          <ListGroup.Item
            key={s.id}
            className={`d-flex align-items-center ${
              s.id === step ? "fw-bold text-primary" : "text-muted"
            }`}
            style={{ background: "transparent", border: "none" }}
          >
            {s.icon} <span className="ms-2">{s.name}</span>
          </ListGroup.Item>
        ))}
      </ListGroup>

      <ProgressBar now={(step / steps.length) * 100} variant="primary" />
    </Container>
  );
};

export default Sidebar;
