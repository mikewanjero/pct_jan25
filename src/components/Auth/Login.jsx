/* eslint-disable no-unused-vars */
import React from "react";
import corebaseLogo from "../../assets/images/corebaseLogo.png";
import phamacoreLogo from "../../assets/images/phamacoreLogo.png";
import {
  Button,
  Form,
  FormControl,
  FormLabel,
  Card,
  CardBody,
} from "react-bootstrap";
import { FormGroup } from "react-bootstrap";
import { BsLockFill } from "react-icons/bs";

export default function Login() {
  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center">
      <div className="mx-auto">
        <Card className="login-card shadow">
          <CardBody className="p-4">
            <div className="text-center">
              <img
                src={phamacoreLogo}
                alt="brand"
                className="img-fluid d-flex justify-content-center m-auto"
                width={120}
              />
            </div>
            <div className="text-center">
              <div className="mb-2">
                <h2 className="mb-1">Welcome back!</h2>
                <p className="mb-0 text-secondary">
                  Please enter your credentials to sign in!
                </p>
              </div>
            </div>
            <Form autoComplete="off">
              <FormGroup className="mb-2">
                <FormLabel style={{ fontSize: 13 }}>Customer Name</FormLabel>
                <FormControl type="cusname" />
              </FormGroup>
              <FormGroup className="mb-4">
                <FormLabel style={{ fontSize: 13 }}>Client Code</FormLabel>
                <FormControl type="cuscode" />
              </FormGroup>
              <div className="d-grid gap-2">
                <Button type="submit" className="auth auth-btn btn-sm">
                  Login
                </Button>
              </div>
              <div className="d-flex justify-content-center mt-2">
                <p className="m-0" role="button">
                  <BsLockFill
                    className="me-1 align-content-end"
                    style={{ fontSize: 12 }}
                  />
                  <span
                    className="fw-semibold"
                    style={{ color: "rgb(197, 140, 79)" }}
                  >
                    Forgot Password?
                  </span>
                </p>
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
