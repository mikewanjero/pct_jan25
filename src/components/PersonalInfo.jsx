/* eslint-disable no-unused-vars */
import React from "react";
import { Container, Card, Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaSmile } from "react-icons/fa";
import Sidebar from "./Sidebar";
import "../styles/custom.scss";

const PersonalInfo = () => {
  const navigate = useNavigate();

  return (
    <Container className="multi-step-form d-inline-flex">
      <Card className="form-card">
        <Row>
          <Col md={4}>
            <Sidebar />
          </Col>
          <Col md={8} className="form-section">
            <div className="form-header">
              <FaSmile className="icon" />
              <h2>Your Personal Information</h2>
            </div>
            <Form>
              <Row>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="First Name"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Last Name"
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Button
                variant="primary"
                className="next-btn"
                onClick={() => navigate("/education")}
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

export default PersonalInfo;
