/* eslint-disable no-unused-vars */
import React from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import "../styles/custom.scss";

const Education = () => {
  const navigate = useNavigate();

  return (
    <Container className="multi-step-form">
      <Card className="form-card">
        <Sidebar />
        <div className="form-section">
          <h2>Education</h2>
          <Form>
            <Form.Group>
              <Form.Label>Highest Degree</Form.Label>
              <Form.Control type="text" placeholder="Degree" required />
            </Form.Group>
            <Button variant="secondary" onClick={() => navigate("/")}>
              Previous
            </Button>
            <Button
              variant="primary"
              onClick={() => navigate("/work-experience")}
            >
              Next Step
            </Button>
          </Form>
        </div>
      </Card>
    </Container>
  );
};

export default Education;
