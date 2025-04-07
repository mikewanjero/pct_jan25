/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardBody,
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  Button,
  InputGroup,
  Toast,
  ToastContainer,
  ToastBody,
  Container,
} from "react-bootstrap";
import phamacoreLogo from "../../assets/images/phamacoreLogo.png";
import corebaseLogo from "../../assets/images/corebaseLogo.png";
import axios from "axios";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";

const API_URL = "http://20.164.20.36:86";
const API_HEADER = {
  accesskey: "R0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9",
};

export default function ChangePassword() {
  const [formData, setFormData] = useState({
    cusCode: "",
    email: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastData, setToastData] = useState({ message: "", type: "success" });
  const navigate = useNavigate();

  const handleConfirmPass = async () => {
    // Validation Checks
    const { cusCode, email, newPassword, confirmPassword } = formData;

    // Check for no cusCode/email entered
    if (!cusCode && !email) {
      setToast("Please provide either Customer Code or Email!", "warning");
      return;
    }

    // Check for both cusCode and email - return only 1 field
    if (cusCode && email) {
      setToast(
        "Please provide either Customer Code or Email, not both!",
        "warning"
      );
      return;
    }

    // Enter both new password and confirm password
    if (!newPassword || !confirmPassword) {
      setToast(
        "Please enter both New Password and Confirm Password!",
        "danger"
      );
      return;
    }

    // Check password length
    if (newPassword.length < 8 || confirmPassword.length < 8) {
      setToast("Password must be at least 8 characters long!", "danger");
      return;
    }

    // Password matching
    if (newPassword !== confirmPassword) {
      setToast("New Password and Confirm Password do not match!", "danger");
      return;
    }

    // API Response
    try {
      const isEmail = email && email.includes("@");

      const requestData = {
        newPassword: newPassword,
        confirmNewPassword: confirmPassword,
        ...(isEmail ? { email } : { cusCode }),
      };

      const response = await axios.post(
        `${API_URL}/api/auth/ChangePassword`,
        requestData
      );

      console.log(response);
      setTimeout(() => {
        setToast("Successfully reset password!", "success");
        navigate("/");
      }, 500);
    } catch (error) {
      console.error(error);
      setToast("An error occurred while changing password!", "danger");
    }
  };

  const setToast = (message, type = "success") => {
    setToastData({ message, type });
    setShowToast(true);
  };

  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh", position: "fixed", marginBottom: "55px" }}
    >
      <div
        className="mx-auto"
        style={{
          width: "100%",
          maxWidth: "22rem",
        }}
      >
        <Card
          className="shadow"
          style={{
            width: "100%",
            maxWidth: "375px",
            maxHeight: "85vh",
            // overflowY: "auto",
          }}
        >
          <CardBody className="p-3">
            <div className="text-center">
              <img
                src={phamacoreLogo}
                alt="brand"
                className="d-flex img-fluid justify-content-center m-auto"
                width={80}
              />
            </div>
            <h2 className="text-center fs-6 fw-bold mt-2">Change Password</h2>
            <p
              className="text-center text-secondary mb-2"
              style={{ fontSize: 10 }}
            >
              Please enter a new password
            </p>
            <Form autoComplete="off">
              <div className="input-column">
                <FormGroup className="mb-1">
                  <FormLabel
                    style={{ fontSize: "12px", color: "rgb(150, 150, 150)" }}
                  >
                    Customer Code / Email
                  </FormLabel>
                  <FormControl
                    type="text"
                    size="sm"
                    style={{ fontSize: "12px" }}
                    value={formData.cusCode}
                    onChange={(e) => {
                      const value = e.target.value;
                      const isEmail = value.includes("@");
                      setFormData({
                        ...formData,
                        email: isEmail ? value : "",
                        cusCode: isEmail ? "" : value,
                      });
                    }}
                  />
                </FormGroup>
                {/* <FormGroup className="mb-1">
                  <FormLabel
                    style={{ fontSize: "12px", color: "rgb(150, 150, 150)" }}
                  >
                    Email
                  </FormLabel>
                  <FormControl
                    type="text"
                    size="sm"
                    style={{ fontSize: "12px" }}
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        email: e.target.value,
                      })
                    }
                  />
                </FormGroup> */}
                <FormGroup className="mb-1">
                  <FormLabel
                    style={{ fontSize: "12px", color: "rgb(150, 150, 150)" }}
                  >
                    New Password
                  </FormLabel>
                  <InputGroup>
                    <FormControl
                      type={newPasswordVisible ? "text" : "password"}
                      size="sm"
                      style={{ fontSize: "12px" }}
                      value={formData.newPassword}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          newPassword: e.target.value,
                        })
                      }
                    />
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => setNewPasswordVisible(!newPasswordVisible)}
                    >
                      {newPasswordVisible ? (
                        <BsEyeSlashFill size={16} />
                      ) : (
                        <BsEyeFill size={16} />
                      )}
                    </Button>
                  </InputGroup>
                </FormGroup>
                <FormGroup className="mb-3">
                  <FormLabel
                    style={{ fontSize: "12px", color: "rgb(150, 150, 150)" }}
                  >
                    Confirm New Password
                  </FormLabel>
                  <InputGroup>
                    <FormControl
                      type={confirmPasswordVisible ? "text" : "password"}
                      size="sm"
                      style={{ fontSize: "12px" }}
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          confirmPassword: e.target.value,
                        })
                      }
                    />
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() =>
                        setConfirmPasswordVisible(!confirmPasswordVisible)
                      }
                    >
                      {confirmPasswordVisible ? (
                        <BsEyeSlashFill size={16} />
                      ) : (
                        <BsEyeFill size={16} />
                      )}
                    </Button>
                  </InputGroup>
                </FormGroup>
              </div>
              <div className="d-grid mt-2">
                <Button
                  className="btn-sm w-100"
                  onClick={handleConfirmPass}
                  style={{
                    backgroundColor: "#28A745",
                    borderColor: "rgb(79, 204, 48)",
                    fontSize: "12px",
                  }}
                >
                  Reset Password
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <footer
          id="footer"
          style={{
            backgroundColor: "#ffffff",
            textAlign: "center",
          }}
        >
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
        <ToastContainer position="top-center" className="p-3 mt-4">
          <Toast
            onClose={() => setShowToast(false)}
            show={showToast}
            bg={toastData.type}
            className={toastData.type === "warning" ? "" : "text-light"}
            delay={3000}
            autohide
          >
            <ToastBody>{toastData.message}</ToastBody>
          </Toast>
        </ToastContainer>
      </div>
    </Container>
  );
}
