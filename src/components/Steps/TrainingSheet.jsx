import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { BsArrowRight } from "react-icons/bs";
import FileUpload from "../Upload/FileUpload";
import phamacoreLogo from "../../assets/images/phamacore.png";
import Sidebar from "../Sidebar/Sidebar";

const TrainingSheet = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="form-container">
        <Sidebar currentStep={0} />

        <div className="form-content">
          {/* Header */}
          <div className="d-flex flex-column align-items-center mb-4">
            <img src={phamacoreLogo} alt="logo" className="w-20 h-20" />
            <h1 className="display-6 fw-bold" style={{ color: "#c58c4f" }}>
              phAMACore<sup>™</sup>Cloud
            </h1>
          </div>
          <div className="form-header">
            <h2>Upload Required Training Document</h2>
          </div>

          <Form>
            <div className="upload-box">
              <p>
                Max file size: <strong>5MB</strong> | Max: 3 files
              </p>
              <FileUpload
                onFileUpload={(files) => console.log("Uploaded files:", files)}
              />
            </div>
            <Button
              className="next-btn mt-3"
              onClick={() => navigate("/master-doc-upload")}
            >
              <span className="btn-text">Next</span>
              <BsArrowRight className="btn-icon" />
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default TrainingSheet;
