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

  const handleConfirmPass = () => {
    if (formData.newPassword !== formData.confirmPassword) {
      setToast("Both new and confirm password do not match", "danger");
      return;
    }

    try {
      const response = axios.post(
        `${API_URL}/auth/ChangePassword`,
        {
          username: formData.username,
          newPassword: formData.newPassword,
          confirmPassword: formData.confirmPassword,
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
            <h2 className="text-center fs-4">Change Password</h2>
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
                  <InputGroup>
                    <FormControl
                      type={newPasswordVisible ? "text" : "password"}
                      placeholder="Enter your new password"
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
                      onClick={() => setNewPasswordVisible(!newPasswordVisible)}
                    >
                      {newPasswordVisible ? <BsEyeSlashFill /> : <BsEyeFill />}
                    </Button>
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <FormLabel>Confirm New Password</FormLabel>
                  <InputGroup>
                    <FormControl
                      type={confirmPasswordVisible ? "text" : "password"}
                      placeholder="Confirm your new password"
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
                      onClick={() =>
                        setConfirmPasswordVisible(!confirmPasswordVisible)
                      }
                    >
                      {confirmPasswordVisible ? (
                        <BsEyeSlashFill />
                      ) : (
                        <BsEyeFill />
                      )}
                    </Button>
                  </InputGroup>
                </FormGroup>
              </div>
              <div className="d-grid mt-4">
                <Button
                  className="btn-sm"
                  onClick={handleConfirmPass}
                  style={{
                    backgroundColor: "#28A745",
                    borderColor: "rgb(79, 204, 48)",
                    width: 150,
                  }}
                >
                  Reset Password
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
        <ToastContainer position="top-center" className="p-3">
          <Toast
            onClose={() => setShowToast(false)}
            show={showToast}
            bg={toastData.type}
            delay={3000}
            autohide
          >
            <ToastBody>{toastData.message}</ToastBody>
          </Toast>
        </ToastContainer>
      </div>
    </div>
  );
}
