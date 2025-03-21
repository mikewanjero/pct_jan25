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
} from "react-bootstrap";
import phamacoreLogo from "../../assets/images/phamacoreLogo.png";
import corebaseLogo from "../../assets/images/corebaseLogo.png";
import axios from "axios";

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
  const [showToast, setShowToast] = useState(false);
  const [toastData, setToastData] = useState({ message: "", type: "success" });
  const navigate = useNavigate();

  const handleConfirmPass = () => {
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
              <div className="d-flex mt-4">
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
                {/* <Button
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
                    </Button> */}
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
