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
            <div className="input-row">
              {" "}
              {/* Added input-row div */}
              <Form.Group controlId="email" className="flex-grow-1">
                {" "}
                {/* Added flex-grow-1 */}
                <Form.Control type="email" placeholder="Email" required />
              </Form.Group>
              <Form.Group controlId="businessEmail" className="flex-grow-1">
                {" "}
                {/* Added flex-grow-1 */}
                <Form.Control
                  type="email"
                  placeholder="Business Email (optional)"
                />
              </Form.Group>
            </div>

            <div className="input-row">
              {" "}
              {/* Added input-row div */}
              <Form.Group controlId="username" className="flex-grow-1">
                {" "}
                {/* Added flex-grow-1 */}
                <Form.Control type="text" placeholder="Username" required />
              </Form.Group>
              <Form.Group controlId="phone" className="flex-grow-1">
                {" "}
                {/* Added flex-grow-1 */}
                <Form.Control type="tel" placeholder="Phone" required />
              </Form.Group>
            </div>

            <Form.Group controlId="password">
              <Form.Control type="password" placeholder="Password" required />
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

            <Form.Group controlId="terms" className="mt-3">
              <Form.Check
                type="checkbox"
                label={
                  <span>
                    I agree to the <a href="#">Terms & Conditions</a> and{" "}
                    <a href="#">Privacy Policy</a>
                  </span>
                }
              />
            </Form.Group>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ActActivation;
