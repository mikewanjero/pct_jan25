/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { Form } from "react-bootstrap";

export default function TermsSection({ termsChecked, onChange }) {
  return (
    <>
      <div className="text-muted text-sm mb-4 mt-10">
        <h4 className="text-dark">Terms & Conditions</h4>
        <p>
          By Activating My Account, I agree to the CoreBase Solutions
          phAMACoreCloud Agreement.
          <br />
          <strong>My Subscription begins Today.</strong>
          <br />
          <br />
          <em>Check your confirmation email for details.</em>
        </p>
        <br />
        <p>
          I understand I am also creating a new phAMACoreCloud Account. By
          signing up to create an account and subsequent user accounts I accept
          phAMACoreCloud Terms of Use and Privacy Policy as shared in
          phAMACoreCloud contract, including the processing of my personal data.
        </p>
      </div>
      <div className="mt-6 w-100 d-flex flex-column align-items-start">
        <div className="d-flex align-items-center">
          <Form.Check
            type="checkbox"
            id="terms"
            name="terms"
            checked={termsChecked}
            onChange={onChange}
            label={
              <>
                By clicking Activate My Account, I agree to the
                <a
                  href=""
                  target="_blank"
                  className="text-primary text-decoration-underline ms-1"
                >
                  Terms & Conditions
                </a>{" "}
                and
                <a
                  href=""
                  target="_blank"
                  className="text-primary text-decoration-underline ms-1"
                >
                  Privacy Policy
                </a>
                .
              </>
            }
          />
        </div>
      </div>
    </>
  );
}
