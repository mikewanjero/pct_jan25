// eslint-disable-next-line no-unused-vars
import React from "react";
import { useNavigate } from "react-router-dom";
import corebaseLogo from "../../assets/images/corebaseLogo.png";
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

export default function ForgotPassword() {
  const navigate = useNavigate();

  return (
    <div
      className="container-fluid d-flex align-items-center"
      style={{ minWidth: 450, minHeight: 400 }}
    >
      <div className="mx-auto">
        <Card className="shadow" style={{ width: "25rem" }}>
          <CardBody className="p-4">
            <div className="text-center">
              <img
                src={phamacoreLogo}
                alt="brand"
                className="d-flex img-fluid justify-content-center m-auto"
                width={120}
              />
            </div>
            <h2 className="text-center fs-4">Forgot Password</h2>
            <p
              className="text-center text-secondary p-1 mb-2"
              style={{ fontSize: 12 }}
            >
              Please enter a new password
            </p>
            <Form autoComplete="off">
              <div className="input-column">
                <FormGroup className="mb-2">
                  <FormLabel>New Password</FormLabel>
                  <FormControl
                    type="password"
                    placeholder="Enter your new password"
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Confirm New Password</FormLabel>
                  <FormControl
                    type="password"
                    placeholder="Confirm your new password"
                  />
                </FormGroup>
              </div>
              <div className="d-flex justify-content-between gap-2 mt-3">
                <Button
                  className="btn-sm"
                  style={{
                    backgroundColor: "#28A745",
                    borderColor: "rgb(79, 204, 48)",
                    width: 150,
                  }}
                >
                  Reset Password
                </Button>
                <Button
                  className="btn-sm"
                  variant="secondary"
                  onClick={() => navigate("/")}
                  style={{
                    backgroundColor: "rgb(197, 140, 79)",
                    borderColor: "rgb(197, 140, 79)",
                    width: 150,
                  }}
                >
                  Back to Login
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <footer id="footer">
          <div className="copy-right text-center my-2">
            <p className="m-0 company-sm">Powered by</p>
            <img
              src={corebaseLogo}
              width={15}
              className="img-fluid"
              alt="company brand logo"
            />
            <p className="m-0 company-lg">CoreBase Solutions</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
