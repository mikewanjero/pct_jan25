/* eslint-disable no-unused-vars */
import React from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import "../styles/custom.scss";

const UserPhoto = () => {
  const navigate = useNavigate();

  return (
    <Container className="multi-step-form">
      <Card className="form-card">
        <Sidebar />
        <div className="form-section">
          <h2>Upload Your Photo</h2>
          <Form>
            <Form.Group>
              <Form.Label>Profile Picture</Form.Label>
              <Form.Control type="file" />
            </Form.Group>
            <Button
              variant="secondary"
              onClick={() => navigate("/work-experience")}
            >
              Previous
            </Button>
            <Button variant="success">Submit</Button>
          </Form>
        </div>
      </Card>
    </Container>
  );
};

export default UserPhoto;
