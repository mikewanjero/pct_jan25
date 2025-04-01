// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
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
  ToastContainer,
  Toast,
  ToastBody,
  InputGroup,
} from "react-bootstrap";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import axios from "axios";

const API_URL = "http://20.164.20.36:86";
const API_HEADER = {
  accesskey: "R0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9",
  // "Content-Type": "multipart/form-data",
};

export default function ResetPassword() {
  const navigate = useNavigate();
  const [newPassVisible, setNewPassVisible] = useState(false);
  const [confirmPassVisible, setConfirmPassVisible] = useState(false);
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastData, setToastData] = useState({
    message: "",
    type: "success",
  });

  const handleReset = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      setToast("Both new and confirm password do not match", "danger");
      return;
    }

    try {
      const response = await axios.post(
        `${API_URL}/api/Auth/ResetPassword`,
        {
          token: localStorage.getItem("resetauthToken"),
          role: "Client",
          newPassword: formData.newPassword,
          confirmPassword: formData.confirmPassword,
        },
        {
          headers: { ...API_HEADER },
        }
      );
      console.log(response);
      setToast("Successfully reset password!", "success");
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      console.log("Error resetting password:", error);
      setToast("Error resetting password!", "danger");
    } finally {
      setLoading(false);
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
            <h2 className="text-center fs-5 fw-bold">Reset Password</h2>
            <p
              className="text-center text-secondary p-1 mb-2"
              style={{ fontSize: 12 }}
            >
              Please enter a new password
            </p>
            <Form autoComplete="off" onSubmit={handleReset}>
              <div className="input-column">
                <FormGroup className="mb-2">
                  <FormLabel style={{ fontSize: "12px" }}>
                    New Password
                  </FormLabel>
                  <InputGroup>
                    <FormControl
                      type={newPassVisible ? "text" : "password"}
                      value={formData.newPassword}
                      size="sm"
                      style={{ fontSize: "12px" }}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          newPassword: e.target.value,
                        });
                      }}
                    />
                    <Button
                      variant="outline-secondary"
                      onClick={() => setNewPassVisible(!newPassVisible)}
                    >
                      {newPassVisible ? (
                        <BsEyeSlashFill size={12} />
                      ) : (
                        <BsEyeFill size={12} />
                      )}
                    </Button>
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <FormLabel style={{ fontSize: "12px" }}>
                    Confirm New Password
                  </FormLabel>
                  <InputGroup>
                    <FormControl
                      type={confirmPassVisible ? "text" : "password"}
                      value={formData.confirmPassword}
                      size="sm"
                      style={{ fontSize: "12px" }}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          confirmPassword: e.target.value,
                        });
                      }}
                    />
                    <Button
                      variant="outline-secondary"
                      onClick={() => setConfirmPassVisible(!confirmPassVisible)}
                    >
                      {confirmPassVisible ? (
                        <BsEyeSlashFill size={12} />
                      ) : (
                        <BsEyeFill size={12} />
                      )}
                    </Button>
                  </InputGroup>
                </FormGroup>
              </div>
              <div className="d-flex justify-content-between gap-2 mt-3">
                <Button
                  type="submit"
                  className="btn-sm"
                  style={{
                    backgroundColor: "#28A745",
                    borderColor: "rgb(79, 204, 48)",
                    width: 150,
                  }}
                >
                  {loading ? "Resetting..." : "Reset Password"}
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
    </div>
  );
}
