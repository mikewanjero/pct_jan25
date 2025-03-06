import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Form, InputGroup, Toast, Accordion } from "react-bootstrap";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import axios from "axios";
import phamacoreLogo from "../../assets/images/phamacoreLogo.png";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import TermsSection from "../Subscription/TermsSection";
import PackageInfo from "../Subscription/PackageInfo";

const MAX_FILES = 3;

const ActActivation = () => {
  // const navigate = useNavigate();
  const { id } = useParams();

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
  const [cusCode, setCusCode] = useState(id);
  const [error, setError] = useState(""); // Error state for the form
  const [loading, setLoading] = useState(false);
  const [packageInfo, setPackageInfo] = useState({
    name: "",
    branches: "",
    users: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [termsChecked, setTermsChecked] = useState(false);
  const [errors, setErrors] = useState({});
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [trainingSheet, setTrainingSheet] = useState([]);
  const [masterDoc, setMasterDoc] = useState([]);

  // Set the customer code from the URL
  useEffect(() => {
    if (id) {
      setCusCode(id);
    }
  }, [id]);

  // Function to handle form changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value }); // Update form data
    setErrors({ ...errors, [e.target.name]: "" }); // Clear errors when typing
  };

  // Function to handle file changes(upload)
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    let newFiles = Array.from(files);

    if (newFiles.length > MAX_FILES) {
      setToastMessage(`You can only upload up to ${MAX_FILES} files.`);
      setShowToast(true);
      e.target.value = "";
      return;
    }

    if (name === "trainingSheet") {
      setTrainingSheet(newFiles.slice(0, MAX_FILES));
    } else if (name === "masterDoc") {
      setMasterDoc(newFiles.slice(0, MAX_FILES));
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};

    // Validate form data
    if (!formData.email) newErrors.email = "Email is required!";
    if (!formData.username) newErrors.username = "Username is required!";
    if (!phoneNumber) newErrors.phoneNumber = "Phone number is required!";
    if (!formData.password) newErrors.password = "Password is required!";
    if (!termsChecked)
      newErrors.termsChecked = "You must agree to the terms and conditions!";
    if (trainingSheet.length === 0)
      newErrors.trainingSheet = "Training Sheet(s) upload is required!";

    setErrors(newErrors);

    // If there are errors, prevent submission
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setLoading(true);

    if (Object.keys(newErrors).length === 0) {
      // Proceed with form submission
      const requestData = new FormData();
      requestData.append("cusCode", cusCode);
      requestData.append("email", formData.email);
      requestData.append("businessEmail", formData.businessEmail);
      requestData.append("username", formData.username);
      requestData.append("password", formData.password);
      requestData.append("phone", phoneNumber);

      // eslint-disable-next-line no-unused-vars
      trainingSheet.forEach((file, index) => {
        requestData.append(`trainingSheet`, file);
      });

      if (masterDoc.length > 0) {
        masterDoc.forEach((file) => {
          requestData.append(`masterDoc`, file);
        });
      }

      console.log("Form submitted:", {
        ...requestData,
        password: "******",
        termsChecked,
        trainingSheet: trainingSheet.map((file) => file.name),
        masterDoc:
          masterDoc.length > 0 ? masterDoc.map((file) => file.name) : "None",
      });
      setLoading(true);

      // Call the API to activate the client
      try {
        const response = await axios.post(
          "http://corebasevm.southafricanorth.cloudapp.azure.com:5028/api/NewClients/ActivateClient",
          requestData,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "multipart/form-data",
              accesskey:
                "R0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9",
            },
          }
        );
        setLoading(false);
        setToastMessage("Account Activated Successfully!");
        setShowToast(true);
        console.log("Response:", response.data);

        // Redirect to the next step
        setTimeout(() => {
          window.location.href = "https://phamacoreonline.co.ke/"; // Redirect to the next page
        }, 2200);
      } catch (error) {
        setLoading(false);
        console.error("Error activating account:", error.response?.data); // Log the error
        const errorMessage = "Failed to activate account. Invalid credentials";
        // error.response?.data?.message ||
        // error.message ||
        setToastMessage(`Error: ${errorMessage}`);
        setShowToast(true);

        // Reset the form data after submission failure
        setFormData({
          email: "",
          businessEmail: "",
          username: "",
          password: "",
        });
        setPhoneNumber("");
        setTermsChecked(false);
        setTrainingSheet([]);
      }
    }
  };

  // Fetching client details
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          // `http://corebasevm.southafricanorth.cloudapp.azure.com:5028/api/Clients/GetClients?ccode=${cusCode}`,
          `http://corebasevm.southafricanorth.cloudapp.azure.com:5028/api/NewClients/GetClientsDetails?cuscode=T7H1PN`,
          {
            headers: {
              accesskey:
                "R0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9",
            },
          }
        );
        // Destructure the response data
        const {
          psCompanyName: companyName,
          psCusCode: companyID,
          packageName: name,
          psBranchCount: branches,
          psUserCount: users,
        } = response.data;

        console.log(companyName, companyID);
        // Validation when companyID is empty
        if (!companyID) {
          throw new Error("Company ID is missing.");
        }

        setCompanyDetails({ companyName, companyID });
        setPackageInfo({ name, branches, users });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch company details.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div className="container">
      <div className="form-container">
        <div className="form-content">
          {/* Header */}
          <div className="d-flex flex-column align-items-center mb-3">
            <img
              src={phamacoreLogo}
              alt="logo"
              className="img-fluid d-flex justify-content-center m-auto"
              width={160}
            />
            <h2 className="fw-bold mt-4" style={{ color: "#c58c4f" }}>
              phAMACore<sup>™</sup>Cloud
            </h2>
          </div>
          <div className="form-header">
            <h5 style={{ fontWeight: "bold" }}>
              Complete the Account Activation
            </h5>
            <p className="text-secondary fs-6">
              Fill in the details to activate your account.
            </p>
          </div>

          <div className="form-sections">
            <div className="form-inputs">
              {/* Left side: Form inputs */}
              <h5 className="text-danger">Activate Subscription</h5>
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
                      // required
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
                      // required
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
                      // required
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
                      Upload Training Sheet |
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
                          {trainingSheet.length > 0 && (
                            <ul>
                              {trainingSheet.map((file, index) => (
                                <li key={index}>{file.name}</li>
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
                          {masterDoc.length > 0 && (
                            <ul>
                              {masterDoc.map((file, index) => (
                                <li key={index}>{file.name}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </Form.Group>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
                <div className="d-flex w-100">
                  {/* Adjusted alignment */}
                  <Button
                    className="activate-btn"
                    disabled={!termsChecked}
                    type="submit"
                  >
                    Activate My Account
                  </Button>
                </div>
              </Form>
            </div>
            {/* Divider line */}
            <div className="section-divider"></div>
            <div className="form-details">
              {/* Right side: Package & Terms */}
              {companyDetails.companyName && companyDetails.companyID && (
                <div className="company-info">
                  <h3>
                    {loading
                      ? error || "Loading company details..."
                      : companyDetails.companyName
                      ? `${companyDetails.companyName} - ${companyDetails.companyID}`
                      : "Details not Fetched"}
                  </h3>
                </div>
              )}
              <PackageInfo packageInfo={packageInfo} />
              <TermsSection
                termsChecked={termsChecked}
                onChange={(e) => setTermsChecked(e.target.checked)}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Toast message */}
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        delay={2500}
        autohide
        bg={
          toastMessage?.includes("Error") ||
          toastMessage?.includes("upload up to")
            ? "danger"
            : "success"
        }
        className="position-fixed top-0 translate-middle-x start-50 mt-3"
      >
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>
    </div>
  );
};

export default ActActivation;
