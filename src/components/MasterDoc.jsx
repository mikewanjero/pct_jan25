import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

const MasterDoc = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="form-wrapper">
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
            <Button variant="secondary" onClick={() => navigate("/")}>
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
  );
};

export default MasterDoc;
