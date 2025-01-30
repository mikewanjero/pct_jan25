/* eslint-disable no-unused-vars */
import React from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import "../styles/custom.scss";

const WorkExperience = () => {
  const navigate = useNavigate();

  return (
    <Container className="multi-step-form">
      <Card className="form-card">
        <Sidebar />
        <div className="form-section">
          <h2>Work Experience</h2>
          <Form>
            <Form.Group>
              <Form.Label>Previous Job Title</Form.Label>
              <Form.Control type="text" placeholder="Job Title" required />
            </Form.Group>
            <Button variant="secondary" onClick={() => navigate("/education")}>
              Previous
            </Button>
            <Button variant="primary" onClick={() => navigate("/user-photo")}>
              Next Step
            </Button>
          </Form>
        </div>
      </Card>
    </Container>
  );
};

export default WorkExperience;
