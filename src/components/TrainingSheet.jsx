import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import phamacoreLogo from "../assets/images/phamacore.png";
import Sidebar from "./Sidebar";

const TrainingSheet = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="form-container">
        <Sidebar currentStep={0} />

        <div className="form-content">
          {/* Header */}
          <div className="d-flex flex-column align-items-center mb-4">
            <img src={phamacoreLogo} alt="logo" className="w-40 h-40" />
            <h1 className="text-caramel display-5 fw-bold">
              phAMACore<sup>™</sup>Cloud
            </h1>
          </div>
          <div className="form-header">
            <h2>Upload Required Training Document</h2>
            <p>Max file size: 5MB | Max 3 files</p>
          </div>

          <Form>
            <Form.Group controlId="trainingFile">
              <div className="upload-box">
                <p>Click or Drag files here to upload</p>
                <Form.Control type="file" multiple hidden />
              </div>
            </Form.Group>

            <Button
              className="next-btn mt-3"
              onClick={() => navigate("/master-doc-upload")}
            >
              Next Step
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default TrainingSheet;
