import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import Sidebar from "../components/Sidebar";

const ActActivation = () => {
  const navigate = useNavigate();

  return (
    <div className="d-flex">
      <Sidebar currentStep={3} />
      <div className="form-container">
        <h2>Complete the Account Activation Process</h2>
        <Form>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              required
            />
          </Form.Group>
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Choose a username"
              required
            />
          </Form.Group>
          <Form.Group controlId="phone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="tel"
              placeholder="Enter your phone number"
              required
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Create a password"
              required
            />
          </Form.Group>
          <Form.Group controlId="terms">
            <Form.Check
              type="checkbox"
              label="I agree to the Terms & Conditions"
              required
            />
          </Form.Group>
          <Button
            variant="secondary"
            className="mt-3 me-2"
            onClick={() => navigate("/step2")}
          >
            Previous
          </Button>
          <Button variant="success" className="mt-3">
            Activate My Account
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default ActActivation;
