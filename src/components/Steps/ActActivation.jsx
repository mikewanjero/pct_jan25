import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, InputGroup } from "react-bootstrap";
import axios from "axios";
import { BsArrowLeft, BsEye, BsEyeSlash } from "react-icons/bs";
import phamacoreLogo from "../../assets/images/phamacore.png";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Sidebar from "../Sidebar/Sidebar";
import TermsSection from "../Subscription/TermsSection";
import PackageInfo from "../Subscription/PackageInfo";

const ActActivation = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    businessEmail: "",
    username: "",
    password: "",
  });
  const [companyDetails, setCompanyDetails] = useState({
    companyName: "",
    companyID: "",
  });
  const [packageInfo, setPackageInfo] = useState({
    name: "",
    branches: "",
    users: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [termsChecked, setTermsChecked] = useState(false);
  const [errors, setErrors] = useState({});

  //Function to handle form changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value }); // Update form data
    setErrors({ ...errors, [e.target.name]: "" }); // Clear errors when typing
  };

  //Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};

    // Validate form data
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.username) newErrors.username = "Username is required";
    if (!phoneNumber) newErrors.phoneNumber = "Phone number is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!termsChecked)
      newErrors.termsChecked = "You must agree to the terms and conditions.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Proceed with form submission
      console.log("Form submitted:", formData);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://102.37.102.247:5028/api/NewClients/GetClientsDetails?cuscode=K68W3X`,
          {
            headers: {
              accesskey:
                "R0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9",
            },
          }
        );
        const {
          psCompanyName: companyName,
          psCusCode: companyID,
          packageName: name,
          psBranchCount: branches,
          psUserCount: users,
        } = response.data;

        setCompanyDetails({ companyName, companyID });
        setPackageInfo({ name, branches, users });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="form-container">
        <Sidebar currentStep={2} />

        <div className="form-content">
          {/* Header */}
          <div className="d-flex flex-column align-items-center mb-4">
            <img src={phamacoreLogo} alt="logo" className="w-20 h-20" />
            <h1 className="display-6 fw-bold" style={{ color: "#c58c4f" }}>
              phAMACore<sup>™</sup>Cloud
            </h1>
          </div>
          <div className="form-header">
            <h2>Complete the Account Activation</h2>
            <p>Fill in the details to activate your account.</p>
          </div>

          <div className="form-sections">
            <div className="form-inputs">
              {/* Left side: Form inputs */}
              <h2 className="text-danger">Activate Subscription</h2>
              <Form className="form-elements" onSubmit={handleSubmit}>
                <div className="input-column">
                  <Form.Group controlId="email" className="flex-grow-1">
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
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
                      required
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
                        setErrors({ ...errors, phoneNumber: "" }); // Remove error message after the user inputs the number
                      }}
                      inputClass="form-control phone-input"
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
                      required
                    />
                    <Button
                      variant="outline-secondary"
                      onClick={() => setPasswordVisible(!passwordVisible)}
                      className="password-toggle"
                    >
                      {passwordVisible ? (
                        <BsEyeSlash size={20} />
                      ) : (
                        <BsEye size={20} />
                      )}
                    </Button>
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
                <div className="d-flex w-100 mt-3">
                  {/* Adjusted alignment */}
                  <Button
                    className="activate-btn w-100"
                    disabled={!termsChecked}
                  >
                    Activate My Account
                  </Button>
                </div>
              </Form>
              <div className="d-flex justify-content-start mt-3">
                {/* Adjusted alignment */}
                <Button
                  className="previous-btn"
                  variant="secondary"
                  onClick={() => navigate("/master-doc-upload")}
                >
                  <span className="btn-text">Previous</span>
                  <BsArrowLeft className="btn-icon" />
                </Button>
              </div>
            </div>
            {/* Divider line */}
            <div className="section-divider"></div>
            <div className="form-details">
              {/* Right side: Package & Terms */}
              {companyDetails.companyName && companyDetails.companyID && (
                <div className="company-info">
                  <h3>
                    {companyDetails.companyName && companyDetails.companyID
                      ? `${companyDetails.companyName} - ${companyDetails.companyID}`
                      : "Details not Fetched"}
                  </h3>
                </div>
              )}
              <PackageInfo
                companyName={companyDetails.companyName}
                packageInfo={packageInfo}
              />
              <TermsSection
                termsChecked={termsChecked}
                onChange={(e) => setTermsChecked(e.target.checked)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActActivation;
