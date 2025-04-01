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
    username: "",
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
    if (!formData.username) {
      setToast("Please enter your username", "warning");
      return;
    }

    if (!formData.newPassword && !formData.confirmPassword) {
      setToast("Please fill in all the required fields!", "danger");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setToast("Both new and confirm password do not match!", "danger");
      return;
    }

    // API Response
    try {
      const response = await axios.post(
        `${API_URL}/api/auth/ChangePassword`,
        {
          username: formData.username,
          newPassword: formData.newPassword,
          confirmNewPassword: formData.confirmPassword,
        },
        {
          headers: { ...API_HEADER },
        }
      );
      console.log(response);
      setToast("Successfully reset password!", "success");
      navigate("/");
    } catch (error) {
      console.log(error);
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
      style={{ minHeight: "100vh" }}
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
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            maxHeight: "80vh",
            width: "375px",
            overflowY: "auto",
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
                  <FormLabel style={{ fontSize: "12px" }}>Username</FormLabel>
                  <FormControl
                    type="text"
                    size="sm"
                    style={{ fontSize: "12px" }}
                    value={formData.username}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        username: e.target.value,
                      })
                    }
                  />
                </FormGroup>
                <FormGroup className="mb-1">
                  <FormLabel style={{ fontSize: "12px" }}>
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
                  <FormLabel style={{ fontSize: "12px" }}>
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
        <footer id="footer" style={{ marginTop: "20px" }}>
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
        <ToastContainer position="top-center" className="p-3">
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
