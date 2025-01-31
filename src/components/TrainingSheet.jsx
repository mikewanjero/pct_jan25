import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import Sidebar from "../components/Sidebar";

const TrainingSheet = () => {
  const navigate = useNavigate();

  return (
    <div className="d-flex">
      <Sidebar currentStep={1} />
      <div className="form-container">
        <h2>Upload the Required Training Document</h2>
        <Form.Group controlId="trainingSheet">
          <Form.Label>Max file size: 5MB | Max 3 files</Form.Label>
          <Form.Control type="file" multiple />
        </Form.Group>
        <Button
          variant="primary"
          className="mt-3"
          onClick={() => navigate("/step2")}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default TrainingSheet;
