import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import Sidebar from "./Sidebar";

const MasterDoc = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="form-container">
        <Sidebar currentStep={1} />

        <div className="form-content">
          <div className="form-header">
            <h2>Upload Master Document (Optional)</h2>
            <p>Max file size: 5MB | Max 3 files</p>
          </div>

          <Form>
            <Form.Group controlId="masterFile">
              <div className="upload-box">
                <p>Click or Drag files here to upload</p>
                <Form.Control type="file" multiple hidden />
              </div>
            </Form.Group>

            <div className="d-flex justify-content-between mt-3">
              <Button
                className="previous-btn"
                variant="secondary"
                onClick={() => navigate("/")}
              >
                Previous
              </Button>

              <Button
                className="next-btn"
                onClick={() => navigate("/acct-activation")}
              >
                Next Step
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default MasterDoc;
