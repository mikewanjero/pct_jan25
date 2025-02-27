import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  Form,
  InputGroup,
  Toast,
  Accordion,
  ListGroup,
} from "react-bootstrap";
import axios from "axios";
import { BsEye, BsEyeSlash, BsTrash } from "react-icons/bs";
import phamacoreLogo from "../../assets/images/phamacore.png";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import TermsSection from "../Subscription/TermsSection";
import PackageInfo from "../Subscription/PackageInfo";

const MAX_FILES = 4;

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
  const [toastMessage, setToastMessage] = useState(""); // Toast message
  const [showToast, setShowToast] = useState(false); // Show toast

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

  // Function to handle file uploads from accordion
  const handleFileUpload = (e, currentFiles, setFiles) => {
    const newFiles = Array.from(e.target.files);

    if (currentFiles.length + newFiles.length > MAX_FILES) {
      setToastMessage(`You can only upload up to ${MAX_FILES - 1} files.`);
      setShowToast(true);
      e.target.value = "";
      return;
    }

    let invalidFile = newFiles.find(
      (file) =>
        ![
          "application/vnd.ms-excel",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        ].includes(file.type)
    );

    if (invalidFile) {
      setToastMessage("Only Excel files (.xls, .xlsx) are allowed.");
      setShowToast(true);
      e.target.value = "";
      return;
    }

    setFiles([...currentFiles, ...newFiles]);
    setToastMessage("File(s) uploaded successfully!");
    setShowToast(true);
    e.target.value = "";
  };

  // Handle file removal
  const removeFile = (index, currentFiles, setFiles) => {
    const updatedFiles = currentFiles.filter((_, i) => i !== index);
    setFiles(updatedFiles);
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};

    // Validate form data
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.username) newErrors.username = "Username is required";
    if (!phoneNumber) newErrors.phoneNumber = "Please enter your phone number";
    if (!formData.password) newErrors.password = "Password is required";
    if (!termsChecked)
      newErrors.termsChecked = "You must agree to the terms and conditions.";

    setErrors(newErrors);

    // If there are errors, prevent submission
    if (Object.keys(newErrors).length > 0) return;
    setLoading(true);

    if (Object.keys(newErrors).length === 0) {
      // Proceed with form submission
      const requestData = {
        cusCode: cusCode,
        email: formData.email,
        businessEmail: formData.businessEmail,
        username: formData.username,
        password: formData.password,
        phone: phoneNumber,
      };
      console.log("Form submitted:", {
        ...requestData,
        password: "******",
        termsChecked,
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
              "Content-Type": "application/json",
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
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "Failed to activate account."; // Get the error message
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
      }
    }
  };

  // Fetching client details
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          // `http://102.37.102.247:5028/api/NewClients/GetClientsDetails?cuscode=${dynamicCusCode || cusCode}`,
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

                {/* Accordion - File Uploads */}
                <Accordion className="mt-4">
                  <Accordion.Item eventKey={0}>
                    <Accordion.Header>Upload Training Sheet</Accordion.Header>
                    <Accordion.Body>
                      <Form.Group controlId="trainingSheet">
                        <Form.Control
                          type="file"
                          multiple
                          accept=".xls,.xlsx, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                          onChange={(e) =>
                            handleFileUpload(e, setTrainingSheet, trainingSheet)
                          }
                          disabled={trainingSheet.length >= MAX_FILES}
                        />
                        {trainingSheet.length > 0 && (
                          <ListGroup className="mt-2">
                            {trainingSheet.map((file, index) => (
                              <ListGroup.Item
                                key={index}
                                className="d-flex justify-content-between"
                              >
                                {file.name} (
                                {(file.size / 1024 / 1024).toFixed(2)}MB)
                                <BsTrash
                                  role="button"
                                  onClick={() =>
                                    removeFile(
                                      index,
                                      trainingSheet,
                                      setTrainingSheet
                                    )
                                  }
                                  className="text-danger"
                                />
                              </ListGroup.Item>
                            ))}
                          </ListGroup>
                        )}
                      </Form.Group>
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey={1} className="mt-4">
                    <Accordion.Header>
                      Upload Master Document(opt.)
                    </Accordion.Header>
                    <Accordion.Body>
                      <Form.Group controlId="masterDoc">
                        <Form.Control
                          type="file"
                          multiple
                          accept=".xls,.xlsx, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                          onChange={(e) =>
                            handleFileUpload(e, setMasterDoc, masterDoc)
                          }
                          disabled={masterDoc.length >= MAX_FILES}
                        />
                        {masterDoc.length > 0 && (
                          <ListGroup className="mt-2">
                            {masterDoc.map((file, index) => (
                              <ListGroup.Item
                                key={index}
                                className="d-flex justify-content-between"
                              >
                                {file.name} (
                                {(file.size / 1024 / 1024).toFixed(2)}MB)
                                <BsTrash
                                  role="button"
                                  onClick={() =>
                                    removeFile(index, masterDoc, setMasterDoc)
                                  }
                                  className="text-danger"
                                />
                              </ListGroup.Item>
                            ))}
                          </ListGroup>
                        )}
                      </Form.Group>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Form>
              <div className="d-flex w-100 mt-3">
                {/* Adjusted alignment */}
                <Button
                  className="activate-btn w-100"
                  disabled={!termsChecked}
                  onSubmit={handleSubmit}
                  type="submit"
                >
                  Activate My Account
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
            ? "warning"
            : "success"
        }
        className="position-fixed middle-0 end-0 m-4"
      >
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>
    </div>
  );
};

export default ActActivation;
