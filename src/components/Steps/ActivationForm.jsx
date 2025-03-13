// eslint-disable-next-line no-unused-vars
import React, { useImperativeHandle, forwardRef, useState } from "react";
import { Form, Button, InputGroup, Accordion } from "react-bootstrap";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import PropTypes from "prop-types";

const ActivationForm = forwardRef(
  (
    {
      handleSubmit,
      handleChange,
      handleFileChange,
      formData,
      errors,
      uploadedFiles,
      phoneNumber,
      setErrors,
      setPhoneNumber,
      passwordVisible,
      setPasswordVisible,
      termsChecked,
    },
    ref
  ) => {
    // eslint-disable-next-line no-unused-vars
    const [showToast, setShowToast] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const [toastMessage, setToastMessage] = useState("");
    // eslint-disable-next-line no-unused-vars
    const [toastType, setToastType] = useState("success");

    const validateForm = () => {
      const newErrors = {};

      if (!formData.email.trim()) newErrors.email = "Email is required";
      if (!formData.username.trim())
        newErrors.username = "Username is required";
      if (!formData.password.trim())
        newErrors.password = "Password is required";
      if (!uploadedFiles.trainingSheet.length) {
        newErrors.trainingSheet = "You must upload at least one training sheet";
      }
      if (!phoneNumber.trim() || phoneNumber.length < 10) {
        newErrors.phoneNumber = "Phone number is required";
      }
      if (uploadedFiles.trainingSheet.length === 0) {
        newErrors.trainingSheet = "You must upload at least one training sheet";
      } else if (uploadedFiles.trainingSheet.length > 3) {
        newErrors.trainingSheet = "Maximum 3 training sheets allowed";
      }
      if (uploadedFiles.masterDoc.length > 3) {
        newErrors.masterDoc = "Maximum 3 master documents allowed";
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    // Expose validateForm() to parent
    useImperativeHandle(ref, () => ({
      validateForm,
    }));

    return (
      <Form
        className="form-elements"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <div className="input-column">
          <Form.Group controlId="email" className="flex-grow-1">
            <Form.Control
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? "is-invalid" : ""}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="businessEmail" className="flex-grow-1">
            <Form.Control
              type="email"
              name="businessEmail"
              placeholder="Business Email (optional)"
              value={formData.businessEmail}
              onChange={handleChange}
            />
          </Form.Group>
        </div>

        <div className="input-column">
          <Form.Group controlId="username" className="flex-grow-1">
            <Form.Control
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              isInvalid={!!errors.username}
              className={errors.username ? "is-invalid" : ""}
            />
            <Form.Control.Feedback type="invalid">
              {errors.username}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="phone" className="flex-grow-1">
            <PhoneInput
              country={"ke"}
              value={phoneNumber}
              onChange={(phone) => {
                setPhoneNumber(phone);
                setErrors({ ...errors, phoneNumber: "" });
              }}
              inputClass={`form-control phone-input ${
                errors.phoneNumber ? "is-invalid" : ""
              }`}
              containerClass="phone-container"
              buttonClass="phone-dropdown-btn"
            />
            {errors.phoneNumber && (
              <div className="text-danger">{errors.phoneNumber}</div>
            )}
          </Form.Group>
        </div>

        <Form.Group controlId="password">
          <InputGroup>
            <Form.Control
              type={passwordVisible ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              isInvalid={!!errors.password}
              className={errors.password ? "is-invalid" : ""}
            />
            <Button
              variant="outline-secondary"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? <BsEyeSlashFill /> : <BsEyeFill />}
            </Button>
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        {/* Accordion - File Uploads */}
        <Accordion>
          <Accordion.Item eventKey={0}>
            <Accordion.Header>
              Upload Training Sheet |{" "}
              <span
                className="small"
                style={{ fontStyle: "italic", marginLeft: "4px" }}
              >
                3 files max
              </span>
            </Accordion.Header>
            <Accordion.Body>
              <Form.Group controlId="trainingSheet">
                <Form.Control
                  type="file"
                  name="trainingSheet"
                  multiple
                  accept=".xls,.xlsx, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                  onChange={handleFileChange}
                />
                <div className="mt-2">
                  {uploadedFiles.trainingSheet.length > 0 && (
                    <ul>
                      {uploadedFiles.trainingSheet.map((file, index) => (
                        <li key={index}>{file}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </Form.Group>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey={1} className="mt-3">
            <Accordion.Header>
              Upload Master Document (Optional)
            </Accordion.Header>
            <Accordion.Body>
              <Form.Group controlId="masterDoc">
                <Form.Control
                  type="file"
                  name="masterDoc"
                  multiple
                  accept=".xls,.xlsx, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                  onChange={handleFileChange}
                />
                <div className="mt-2">
                  {uploadedFiles.masterDoc.length > 0 && (
                    <ul>
                      {uploadedFiles.masterDoc.map((file, index) => (
                        <li key={index}>{file}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </Form.Group>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        <div className="d-flex w-100">
          <Button
            className="activate-btn"
            disabled={!termsChecked}
            type="submit"
          >
            Activate My Account
          </Button>
        </div>
      </Form>
    );
  }
);

ActivationForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleFileChange: PropTypes.func.isRequired,
  formData: PropTypes.shape({
    email: PropTypes.string.isRequired,
    businessEmail: PropTypes.string,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }).isRequired,
  errors: PropTypes.shape({
    email: PropTypes.string,
    username: PropTypes.string,
    password: PropTypes.string,
    phoneNumber: PropTypes.string,
  }).isRequired,
  uploadedFiles: PropTypes.shape({
    trainingSheet: PropTypes.arrayOf(PropTypes.string).isRequired,
    masterDoc: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  email: PropTypes.string,
  phoneNumber: PropTypes.string.isRequired,
  setPhoneNumber: PropTypes.func.isRequired,
  setErrors: PropTypes.func.isRequired,
  passwordVisible: PropTypes.bool.isRequired,
  setPasswordVisible: PropTypes.func.isRequired,
  termsChecked: PropTypes.bool.isRequired,
  //   setTermsChecked: PropTypes.func.isRequired,
};
ActivationForm.displayName = "ActivationForm";

export default ActivationForm;
