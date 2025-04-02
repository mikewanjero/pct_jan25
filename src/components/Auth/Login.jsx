/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import corebaseLogo from "../../assets/images/corebaseLogo.png";
import phamacoreLogo from "../../assets/images/phamacoreLogo.png";
import {
  Button,
  Form,
  FormControl,
  FormLabel,
  Card,
  CardBody,
  FormCheck,
  InputGroup,
} from "react-bootstrap";
import { FormGroup, Toast, ToastContainer } from "react-bootstrap";
import { BsLockFill, BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import axios from "axios";

const API_URL = "http://20.164.20.36:86";
const API_HEADER = {
  accesskey: "R0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9",
  // "Content-Type": "multipart/form-data",
};

export default function Login() {
  const [agreed, setAgreed] = useState(false);
  const [formData, setFormData] = useState({
    cusCode: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [inputErrors, setInputErrors] = useState({
    cusCodeOrEmail: false,
    password: false,
  });
  const navigate = useNavigate();

  // Function to handle user login
  const handleLogin = async (e) => {
    e.preventDefault();

    let errors = {
      // cusCode: !formData.cusCode,
      // email: !formData.email,
      cusCodeOrEmail: !formData.cusCode && !formData.email,
      password: !formData.password,
    };
    setInputErrors(errors);

    if (errors.password || errors.cusCodeOrEmail) {
      setToastMessage("Please fill in all the required fields!");
      setShowToast(true);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const isEmail = formData.email.includes("@");

      const requestData = {
        password: formData.password,
        ...(isEmail
          ? { email: formData.email }
          : { cusCode: formData.cusCode }),
      };

      const response = await axios.post(
        `${API_URL}/api/auth/LoginClient`,
        requestData
      );

      if (response.status === 200) {
        const { token, message } = response.data;
        localStorage.setItem("authToken", token);
        localStorage.setItem(
          "cusCodeOrEmail",
          formData.cusCode || formData.email
        );
        console.log(response.data);
        if (message.includes("change your temporary password") && message) {
          return navigate("/change-password");
        } else {
          return navigate("/acct-activation");
        }
      } else {
        setToastMessage("Invalid credentials. Please try again");
        setShowToast(true);
      }
    } catch (error) {
      console.error("Server error:", error);
      setToastMessage("Failed to login. Please check your credentials.");
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid d-flex align-items-center">
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
                <h2 className="mb-1 fs-4">Welcome!</h2>
                <p className="mb-0 text-secondary" style={{ fontSize: 10 }}>
                  Please enter your credentials to sign in.
                </p>
              </div>
            </div>
            {error && <p className="text-danger text-center">{error}</p>}
            <Form autoComplete="off" onSubmit={handleLogin}>
              <FormGroup className="mb-1">
                <FormLabel
                  style={{
                    fontSize: 12,
                    color: "rgb(150, 150, 150)",
                    marginBottom: 1,
                  }}
                >
                  Customer Code / Email
                </FormLabel>
                <FormControl
                  type="text"
                  className={inputErrors.cusCodeOrEmail ? "is-invalid" : ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    const anEmail = value.includes("@");

                    setFormData({
                      ...formData,
                      cusCode: anEmail ? "" : value,
                      email: anEmail ? value : "",
                    });
                    setInputErrors((prev) => ({
                      ...prev,
                      cusCodeOrEmail: false,
                    }));
                  }}
                />
              </FormGroup>
              <FormGroup className="mb-1">
                <FormLabel
                  style={{
                    fontSize: 12,
                    color: "rgb(150, 150, 150)",
                    marginBottom: 1,
                  }}
                >
                  Password
                </FormLabel>
                <InputGroup>
                  <FormControl
                    type={showPassword ? "text" : "password"}
                    className={inputErrors.password ? "is-invalid" : ""}
                    onChange={(e) => {
                      setFormData({ ...formData, password: e.target.value });
                      setInputErrors((prev) => ({ ...prev, password: false }));
                    }}
                  />
                  <Button
                    variant="outline-secondary"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <BsEyeSlashFill /> : <BsEyeFill />}
                  </Button>
                </InputGroup>
              </FormGroup>

              <FormGroup>
                <FormCheck
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mb-2"
                  style={{ fontSize: 10 }}
                  label={
                    <span>
                      I agree to the
                      {""}
                      <a
                        href="/privacy-policy"
                        rel="noopener noreferrer"
                        style={{
                          color: "rgb(197, 140, 79)",
                          textDecoration: "none",
                        }}
                      >
                        {" "}
                        GDPR & Data Privacy Policy
                      </a>
                    </span>
                  }
                />
              </FormGroup>

              <div className="d-grid gap-2">
                <Button
                  type="submit"
                  className="auth auth-btn btn-sm"
                  disabled={!agreed || loading}
                  onSubmit={handleLogin}
                >
                  {loading ? "Logging in..." : "Login"}
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
                    <a
                      href="/forgot-password"
                      rel="noopener noreferrer"
                      style={{
                        color: "rgb(197, 140, 79)",
                        fontSize: 12,
                        textDecoration: "none",
                      }}
                    >
                      Forgot Password?
                    </a>
                  </span>
                </p>
              </div>
            </Form>
          </CardBody>
        </Card>
        <ToastContainer position="top-center" className="p-3">
          <Toast
            onClose={() => setShowToast(false)}
            show={showToast}
            delay={3000}
            autohide
            bg="danger"
          >
            <Toast.Body className="text-white">{toastMessage}</Toast.Body>
          </Toast>
        </ToastContainer>
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
