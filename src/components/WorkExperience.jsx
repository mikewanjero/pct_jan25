/* eslint-disable no-unused-vars */
import React from "react";
import { Container, Card, Form, Button, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import "../styles/custom.scss";

const WorkExperience = () => {
  const navigate = useNavigate();

  return (
    <Container className="multi-step-form d-inline-flex">
      <Card className="form-card">
        <Row style={{ padding: "14px" }}>
          <Col md={4}>
            <Sidebar />
          </Col>
          <Col md={8} className="form-section">
            <div className="form-header">
              <h2>Work Experience</h2>
            </div>
            <Form>
              <Form.Group>
                <Form.Label>Previous Job Title</Form.Label>
                <Form.Control type="text" placeholder="Job Title" required />
              </Form.Group>
              <Button
                variant="secondary"
                onClick={() => navigate("/education")}
              >
                Previous
              </Button>
              <Button variant="primary" onClick={() => navigate("/user-photo")}>
                Next Step
              </Button>
            </Form>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default WorkExperience;
