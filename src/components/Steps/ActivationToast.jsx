// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";
import { Toast } from "react-bootstrap";

export default function ActivationToast({
  showToast,
  setShowToast,
  toastType,
  toastMessage,
}) {
  return (
    <Toast
      show={showToast}
      onClose={() => setShowToast(false)}
      delay={2500}
      autohide
      bg={toastType}
      className="position-fixed top-0 translate-middle-x start-50 mt-3"
    >
      <Toast.Body
        style={{
          color:
            toastType === "danger" || toastType === "success"
              ? "white"
              : "black",
        }}
      >
        {toastMessage}
      </Toast.Body>
    </Toast>
  );
}

ActivationToast.propTypes = {
  showToast: PropTypes.bool.isRequired,
  setShowToast: PropTypes.func.isRequired,
  toastType: PropTypes.string.isRequired,
  toastMessage: PropTypes.string.isRequired,
};
