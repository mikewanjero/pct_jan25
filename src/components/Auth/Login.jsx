/* eslint-disable no-unused-vars */
import React from "react";
import phamacoreLogo from "../../assets/images/phamacoreLogo.png";
import { Button, Form, FormControl, FormLabel } from "react-bootstrap";
import { FormGroup } from "react-bootstrap";

export default function Login() {
  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center">
      <div className="mx-auto">
        <div className="card login-card shadow">
          <div className="card-body p-4">
            <div className="text-center">
              <img
                src={phamacoreLogo}
                alt="brand"
                className="img-fluid d-flex justify-content-center m-auto"
                width={120}
              />
            </div>
            <div className="text-center"></div>
            <Form autoComplete="off">
              <FormGroup className="mb-2">
                <FormLabel>Username</FormLabel>
                <FormControl type="username" placeholder="Enter Username" />
              </FormGroup>
              <FormGroup className="mb-2">
                <FormLabel>Password</FormLabel>
                <FormControl type="password" placeholder="Enter Password" />
              </FormGroup>
              <div className="d-grid gap-2">
                <Button type="submit" className="auth auth-btn btn-sm">
                  Login
                </Button>
              </div>
              <div className="d-flex justify-content-center mt-2"></div>
            </Form>
            <div>Login</div>
          </div>
        </div>
      </div>
    </div>
  );
}
