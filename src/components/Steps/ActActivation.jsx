import { useState, useEffect, useRef } from "react";
import axios from "axios";
import ActivationForm from "./ActivationForm";
import ActivationToast from "./ActivationToast";
import TermsSection from "../Subscription/TermsSection";
import PackageInfo from "../Subscription/PackageInfo";
import phamacoreLogo from "../../assets/images/phamacoreLogo.png";
import { useParams } from "react-router-dom";

const API_URL = "http://20.164.20.36:86/api/client";
const API_HEADER = {
  accesskey: "R0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9",
  "Content-Type": "multipart/form-data",
};

const ActActivation = () => {
  // Form state and handlers
  const formRef = useRef(null);
  const { id } = useParams();
  const [cusCode, setCusCode] = useState(id);
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [phoneNumber, setPhoneNumber] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState({
    trainingSheet: [],
    masterDoc: [],
  });
  const [termsChecked, setTermsChecked] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  // Company details
  const [companyDetails, setCompanyDetails] = useState({
    companyName: "",
    companyID: "",
  });
  const [packageInfo, setPackageInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Set the customer code from the URL
  useEffect(() => {
    if (id) {
      setCusCode(id);
    }
  }, [id]);
  useEffect(() => {
    // Simulate API call to fetch company details
    setTimeout(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${API_URL}/GetClientDetails?psCusCode=0SD3WL`,
            { headers: API_HEADER }
          );

          const {
            psCompanyName: companyName,
            psCusCode: companyID,
            packageCode: name,
            psBranchCount: branches,
            psUserCount: users,
          } = response.data.data;

          console.log(response);
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
          setToastMessage("Failed to display company details!");
          setToastType("danger");
          setShowToast(true);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }, 500);
  }, [cusCode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission

    if (!formRef.current || !formRef.current.validateForm()) {
      setToastMessage("Please fill in all the required fields!");
      setToastType("danger");
      setShowToast(true);
      return;
    }

    setLoading(true);
    try {
      // Proceed with API submission
      const response = await axios.post(
        `${API_URL}/ActivateAccount`,
        formData,
        {
          headers: API_HEADER,
        }
      );

      setLoading(false);
      console.log("Upload Response:", response.data);

      setToastMessage("Account activated successfully!");
      setToastType("success");
      setShowToast(true);
    } catch (error) {
      console.error("Error activating account:", error);
      setToastMessage("Activation failed! Try again.");
      setToastType("danger");
      setShowToast(true);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value }); // Update form data
    setErrors({ ...errors, [e.target.name]: "" }); // Clearing errors on change
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const formData = new FormData();

    // Append files to FormData
    for (let i = 0; i < files.length; i++) {
      formData.append(name, files[i]);
    }

    try {
      const response = axios.post(
        `${API_URL}/UploadFile?cusCode=0SD3WL&userName&fileType=Excel`,
        formData,
        {
          params: { cusCode: "0SD3WL", userName: "", fileType: "Excel" },
          headers: API_HEADER,
        }
      );

      if (response.status === 200) {
        console.log("File(s) uploaded successfully: ", response);
        setToastMessage("Uploaded files successfully!");
        setToastType("success");
        setShowToast(true);
        setTimeout(() => {
          fetchUploadedFiles();
        }, 1000);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setToastMessage("Failed to upload file(s)!");
      setToastType("danger");
      setShowToast(true);
    }
  };

  const fetchUploadedFiles = async () => {
    try {
      const response = await axios.get(`${API_URL}/GetUploadedFiles`, {
        params: { cusCode: "0SD3WL" },
      });

      if (response.data.success) {
        console.log("Uploaded files:", response.data.data);
        setUploadedFiles(response.data.data);
      }
    } catch (error) {
      console.error("Error displaying uploaded files:", error);
      setToastMessage("Failed to display uploaded files!");
      setToastType("danger");
      setShowToast(true);
    }
  };

  useEffect(() => {
    fetchUploadedFiles();
  }, []);

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
            <h5 className="fw-bold">Complete the Account Activation</h5>
            <p className="text-secondary" style={{ fontSize: 12 }}>
              Fill in the details to activate your account.
            </p>
          </div>

          <div className="form-sections">
            <div className="form-inputs">
              <h5 className="text-danger fw-bold">Activate Subscription</h5>
              <ActivationForm
                ref={formRef}
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                handleFileChange={handleFileChange}
                formData={formData}
                error={error}
                errors={errors}
                uploadedFiles={uploadedFiles}
                phoneNumber={phoneNumber}
                setPhoneNumber={setPhoneNumber}
                passwordVisible={passwordVisible}
                setError={setError}
                setErrors={setErrors}
                setPasswordVisible={setPasswordVisible}
                setTermsChecked={setTermsChecked}
                setToastMessage={setToastMessage}
                setToastType={setToastType}
                setShowToast={setShowToast}
                termsChecked={termsChecked}
              />
            </div>

            {/* Divider line */}
            <div className="section-divider"></div>

            {/* Right side: Package & Terms */}
            <div className="form-details">
              {companyDetails.companyName && companyDetails.companyID && (
                <div className="company-info">
                  <h3>
                    {loading
                      ? error || "Loading..."
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
      <ActivationToast
        showToast={showToast}
        setShowToast={setShowToast}
        toastType={toastType}
        toastMessage={toastMessage}
      />
    </div>
  );
};

export default ActActivation;
