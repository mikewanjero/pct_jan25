// eslint-disable-next-line no-unused-vars
import React from "react";
import { Card, CardBody, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Dpa() {
  const navigate = useNavigate();

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center">
      <div className="mx-auto">
        <Card className="shadow">
          <CardBody className="p-4">
            <h2 className="text-center">GDPR & Data Privacy Policy</h2>
            <p className="text-secondary">
              This page provides details on our compliance with GDPR and how we
              protect your data.
            </p>
            <p className="text-secondary">
              By using our platform, you agree to our data handling practices.
            </p>
            <div className="d-grid">
              <Button
                className="btn-sm"
                onClick={() => navigate("/")}
                style={{
                  backgroundColor: "rgb(197, 140, 79)",
                  borderColor: "rgb(197, 140, 79)",
                }}
              >
                Back to Login
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
