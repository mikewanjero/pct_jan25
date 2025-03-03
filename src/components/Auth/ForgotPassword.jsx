// eslint-disable-next-line no-unused-vars
import React from "react";
import phamacoreLogo from "../../assets/images/phamacoreLogo.png";
import {
  Button,
  Card,
  CardBody,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const navigate = useNavigate();

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center">
      <div className="mx-auto">
        <Card className="shadow">
          <CardBody className="p-4">
            <div className="text-center">
              <img
                src={phamacoreLogo}
                alt="brand"
                className="img-fluid d-flex justify-content-center m-auto"
                width={120}
              />
            </div>
            <h2 className="text-center">Reset Password</h2>
            <p className="text-center text-secondary" style={{ fontSize: 14 }}>
              Enter your username to reset your password
            </p>
            <Form>
              <FormGroup className="mb-3">
                <FormLabel>Username</FormLabel>
                <FormControl
                  type="username"
                  placeholder="Enter your username"
                />
              </FormGroup>
              <div className="d-flex justify-content-between gap-2">
                <Button
                  className="btn-sm"
                  style={{
                    backgroundColor: "rgb(79, 204, 48)",
                    borderColor: "rgb(79, 204, 48)",
                  }}
                >
                  Send Reset Link
                </Button>
                <Button
                  className="btn-sm"
                  variant="secondary"
                  onClick={() => navigate("/")}
                  style={{
                    backgroundColor: "rgb(197, 140, 79)",
                    borderColor: "rgb(197, 140, 79)",
                  }}
                >
                  Cancel
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
