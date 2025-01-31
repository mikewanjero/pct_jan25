import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import Sidebar from "./Sidebar";
import TermsSection from "./Subscription/TermsSection";
import PackageInfo from "./Subscription/PackageInfo";
import { useState, useEffect } from "react";
import axios from "axios";

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
          <div className="form-header">
            <h2>Complete the Account Activation</h2>
            <p>Fill in the details to activate your account.</p>
          </div>

          <Form>
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
                <Form.Control type="tel" placeholder="Phone" required />
              </Form.Group>
            </div>

            <Form.Group controlId="password">
              <Form.Control type="password" placeholder="Password" required />
            </Form.Group>

            <PackageInfo
              companyName={companyDetails.companyName}
              packageInfo={packageInfo}
            />

            <TermsSection
              termsChecked={termsChecked}
              onChange={(e) => setTermsChecked(e.target.checked)}
            />

            <div className="d-flex justify-content-between mt-3">
              <Button
                className="previous-btn"
                variant="secondary"
                onClick={() => navigate("/master-doc-upload")}
              >
                Previous
              </Button>

              <Button className="next-btn" disabled={!termsChecked}>
                Activate My Account
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ActActivation;
