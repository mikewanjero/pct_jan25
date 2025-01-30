/* eslint-disable no-unused-vars */
import React from "react";
import { Container, Card, Col, Form, Button, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import "../styles/custom.scss";

const Education = () => {
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
              <h2>Education</h2>
            </div>
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
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default Education;
