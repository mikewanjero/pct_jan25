/* eslint-disable react/prop-types */
import { ListGroup } from "react-bootstrap";
import { FaCheckCircle } from "react-icons/fa";

const Sidebar = ({ currentStep }) => {
  return (
    <ListGroup>
      <ListGroup.Item active={currentStep === 1}>
        {currentStep > 1 && <FaCheckCircle className="text-success" />} Step 1:
        Upload Training Sheet
      </ListGroup.Item>
      <ListGroup.Item active={currentStep === 2}>
        {currentStep > 2 && <FaCheckCircle className="text-success" />} Step 2:
        Upload Master Docs
      </ListGroup.Item>
      <ListGroup.Item active={currentStep === 3}>
        {currentStep === 3 && <FaCheckCircle className="text-success" />} Step
        3: Activate Account
      </ListGroup.Item>
    </ListGroup>
  );
};

export default Sidebar;
