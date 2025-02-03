/* eslint-disable react/prop-types */
const Sidebar = ({ currentStep }) => {
  const steps = [
    "Upload Training Document",
    "Upload Master Document",
    "Activate Account",
  ];

  return (
    <div className={`sidebar ${currentStep === 2 ? "step-3" : ""}`}>
      <h3>Step {currentStep + 1}</h3>
      <div className="sidebar-steps">
        {steps.map((step, index) => (
          <p
            key={index}
            className={`step ${index === currentStep ? "active" : ""}`}
          >
            {step}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
