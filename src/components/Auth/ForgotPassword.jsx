// eslint-disable-next-line no-unused-vars
import React from "react";
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
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const navigate = useNavigate();

  return (
    <div
      className="container-fluid d-flex align-items-center"
      style={{ minWidth: 450, minHeight: 400 }}
    >
      <div className="mx-auto">
        <Card className="shadow">
          <CardBody className="p-5">
            <div className="text-center">
              <img
                src={phamacoreLogo}
                alt="brand"
                className="img-fluid d-flex justify-content-center m-auto"
                width={120}
              />
            </div>
            <h2 className="text-center fs-4">Reset Password</h2>
            <p
              className="text-center text-secondary p-1 mb-4"
              style={{ fontSize: 12 }}
            >
              Enter your username to reset your password
            </p>
            <Form>
              <FormGroup className="mb-3">
                <FormLabel>Email Address</FormLabel>
                <FormControl
                  type="email"
                  placeholder="Enter your email address"
                />
              </FormGroup>
              <div className="d-flex justify-content-between gap-2">
                <Button
                  className="btn-sm"
                  style={{
                    backgroundColor: "#28A745",
                    borderColor: "rgb(79, 204, 48)",
                    width: 150,
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
                    width: 150,
                  }}
                >
                  Cancel
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
