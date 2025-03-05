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
} from "react-bootstrap";
import { FormGroup } from "react-bootstrap";
import { BsLockFill } from "react-icons/bs";
import axios from "axios";

export default function Login() {
  const [agreed, setAgreed] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Function to handle user login
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!formData.password && !formData.username) {
      setError("Username and Password are required!");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post("api_url", {
        username: formData.username,
        password: formData.password,
      });

      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem("authToken", token);
        navigate("/acct-activation");
      } else {
        setError("Invalid credentials. Please try again");
      }
    } catch (error) {
      setError("Failed to login. Please check your credentials.");
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
                <h2 className="mb-1">Welcome!</h2>
                <p className="mb-0 text-secondary">
                  Please enter your credentials to sign in.
                </p>
              </div>
            </div>
            {error && <p className="text-danger text-center">{error}</p>}
            <Form autoComplete="off" onSubmit={handleLogin}>
              <FormGroup className="mb-3">
                <FormLabel
                  style={{ fontSize: 13, color: "rgb(150, 150, 150)" }}
                >
                  User Name
                </FormLabel>
                <FormControl
                  type="username"
                  value="username"
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                />
              </FormGroup>
              <FormGroup className="mb-3">
                <FormLabel
                  style={{ fontSize: 13, color: "rgb(150, 150, 150)" }}
                >
                  Password
                </FormLabel>
                <FormControl
                  type="password"
                  value={"password"}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
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
