import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import phamacoreLogo from "../assets/images/phamacore.png";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Sidebar from "../Sidebar/Sidebar";
import TermsSection from "../Subscription/TermsSection";
import PackageInfo from "../Subscription/PackageInfo";

const ActActivation = () => {
  const navigate = useNavigate();
  const [companyDetails, setCompanyDetails] = useState({
    companyName: "",
    companyID: "",
  });
  const [packageInfo, setPackageInfo] = useState({
    name: "",
    branches: "",
    users: "",
  });
  const [phoneNumber, setPhoneNumber] = useState("");
  const [termsChecked, setTermsChecked] = useState(false);

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
            <img src={phamacoreLogo} alt="logo" className="w-40 h-40" />
            <h1 className="text-caramel display-5 fw-bold">
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
              <Form className="form-elements">
                <div className="input-column">
                  <Form.Group controlId="email" className="flex-grow-1">
                    <Form.Control type="email" placeholder="Email" required />
                  </Form.Group>
                  <Form.Group controlId="businessEmail" className="flex-grow-1">
                    <Form.Control
                      type="email"
                      placeholder="Business Email (optional)"
                    />
                  </Form.Group>
                </div>

                <div className="input-column">
                  <Form.Group controlId="username" className="flex-grow-1">
                    <Form.Control type="text" placeholder="Username" required />
                  </Form.Group>
                  <Form.Group controlId="phone" className="flex-grow-1">
                    <PhoneInput
                      country={"ke"}
                      value={phoneNumber}
                      onChange={(phone) => setPhoneNumber(phone)}
                      inputClass="form-control phone-input"
                      containerClass="phone-container"
                      buttonClass="phone-dropdown-btn"
                    />
                  </Form.Group>
                </div>

                <Form.Group controlId="password">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    required
                  />
                </Form.Group>
                <div className="d-flex justify-content-start mt-3">
                  {/* Adjusted alignment */}
                  <Button className="next-btn" disabled={!termsChecked}>
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
                  Previous
                </Button>
              </div>
            </div>
            {/* Divider line */}
            <div className="section-divider"></div>
            <div className="form-details">
              {/* Right side: Package & Terms */}
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
