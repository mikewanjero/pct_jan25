import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import Sidebar from "../components/Sidebar";

const MasterDoc = () => {
  const navigate = useNavigate();

  return (
    <div className="d-flex">
      <Sidebar currentStep={2} />
      <div className="form-container">
        <h2>Upload the Master Document (Optional)</h2>
        <Form.Group controlId="masterDocs">
          <Form.Label>Max file size: 5MB | Max 3 files</Form.Label>
          <Form.Control type="file" multiple />
        </Form.Group>
        <Button
          variant="secondary"
          className="mt-3 me-2"
          onClick={() => navigate("/")}
        >
          Previous
        </Button>
        <Button
          variant="primary"
          className="mt-3"
          onClick={() => navigate("/step3")}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default MasterDoc;
