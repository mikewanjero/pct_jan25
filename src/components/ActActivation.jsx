import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import Sidebar from "./Sidebar";

const ActActivation = () => {
  const navigate = useNavigate();

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
            <Form.Group controlId="email">
              <Form.Control type="email" placeholder="Email" required />
            </Form.Group>

            <Form.Group controlId="username">
              <Form.Control type="text" placeholder="Username" required />
            </Form.Group>

            <Form.Group controlId="phone">
              <Form.Control type="tel" placeholder="Phone" required />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Control type="password" placeholder="Password" required />
            </Form.Group>

            <Form.Group controlId="terms" className="mt-3">
              <Form.Check
                type="checkbox"
                label="I agree to the Terms and Privacy Policy"
              />
            </Form.Group>

            <div className="d-flex justify-content-between mt-3">
              <Button
                className="previous-btn"
                variant="secondary"
                onClick={() => navigate("/master-doc-upload")}
              >
                Previous
              </Button>

              <Button className="next-btn">Activate My Account</Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ActActivation;
