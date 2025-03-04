// eslint-disable-next-line no-unused-vars
import React from "react";
import {
  Card,
  CardBody,
  Button,
  Container,
  Row,
  Col,
  ListGroup,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Dpa() {
  const navigate = useNavigate();

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center">
      <div className="mx-auto">
        <Card className="shadow">
          <CardBody className="p-4">
            <h2 className="text-center">GDPR & Data Privacy Policy</h2>
            <p className="text-secondary">
              This page provides details on our compliance with GDPR and how we
              protect your data.
            </p>
            <p className="text-secondary">
              By using our platform, you agree to the Kenya Data Protection Act
              of 2019, thus safeguarding your data.
            </p>
            <Container className="mt-4">
              <Card className="shadow">
                <Card.Body>
                  <Card.Title className="text-center fw-bold">
                    Kenya Data Protection Act, 2019
                  </Card.Title>
                  <Card.Subtitle className="text-muted text-center mb-3">
                    Enacted: November 25, 2019 | Regulator: Office of the Data
                    Protection Commissioner (ODPC)
                  </Card.Subtitle>

                  {/* Key Principles */}
                  <Row>
                    <Col md={6}>
                      <Card className="mb-3">
                        <Card.Header className="fw-bold">
                          Key Principles of Data Protection
                        </Card.Header>
                        <ListGroup variant="flush">
                          <ListGroup.Item>
                            📜 <b>Lawfulness & Fairness:</b> Data must be
                            collected and processed lawfully.
                          </ListGroup.Item>
                          <ListGroup.Item>
                            🎯 <b>Purpose Limitation:</b> Use data only for
                            intended purposes.
                          </ListGroup.Item>
                          <ListGroup.Item>
                            📉 <b>Data Minimization:</b> Only collect necessary
                            data.
                          </ListGroup.Item>
                          <ListGroup.Item>
                            ✔️ <b>Accuracy:</b> Keep data accurate and up to
                            date.
                          </ListGroup.Item>
                          <ListGroup.Item>
                            ⏳ <b>Storage Limitation:</b> Don&apos;t retain data
                            longer than needed.
                          </ListGroup.Item>
                          <ListGroup.Item>
                            🔒 <b>Confidentiality & Security:</b> Protect data
                            from unauthorized access.
                          </ListGroup.Item>
                        </ListGroup>
                      </Card>
                    </Col>

                    {/* Data Subject Rights */}
                    <Col md={6}>
                      <Card className="mb-3">
                        <Card.Header className="fw-bold">
                          Rights of Data Subjects
                        </Card.Header>
                        <ListGroup variant="flush">
                          <ListGroup.Item>
                            ℹ️ <b>Right to Information:</b> Know how personal
                            data is used.
                          </ListGroup.Item>
                          <ListGroup.Item>
                            📂 <b>Right to Access:</b> Request copies of
                            personal data.
                          </ListGroup.Item>
                          <ListGroup.Item>
                            ✏️ <b>Right to Rectification:</b> Request data
                            corrections.
                          </ListGroup.Item>
                          <ListGroup.Item>
                            🗑️ <b>Right to Erasure:</b> Request data deletion.
                          </ListGroup.Item>
                          <ListGroup.Item>
                            🚫 <b>Right to Object:</b> Oppose data processing
                            for marketing.
                          </ListGroup.Item>
                          <ListGroup.Item>
                            🔄 <b>Right to Data Portability:</b> Request data in
                            a portable format.
                          </ListGroup.Item>
                        </ListGroup>
                      </Card>
                    </Col>
                  </Row>

                  {/* Data Controllers & Processors */}
                  <Card className="mb-3">
                    <Card.Header className="fw-bold">
                      Obligations of Data Controllers & Processors
                    </Card.Header>
                    <Card.Body>
                      <ul>
                        <li>
                          📌 Must register with the <b>ODPC</b> before
                          processing data.
                        </li>
                        <li>
                          ✅ Obtain <b>consent</b> before collecting personal
                          data.
                        </li>
                        <li>
                          🔐 Ensure <b>secure processing</b> and prevent
                          unauthorized access.
                        </li>
                        <li>
                          ⚠️ Report <b>data breaches within 72 hours</b>.
                        </li>
                      </ul>
                    </Card.Body>
                  </Card>

                  {/* Cross-Border Transfers & Penalties */}
                  <Row>
                    <Col md={6}>
                      <Card className="mb-3">
                        <Card.Header className="fw-bold">
                          Cross-Border Data Transfers
                        </Card.Header>
                        <Card.Body>
                          🌍 Data can only be transferred outside Kenya if
                          adequate protection measures exist.
                        </Card.Body>
                      </Card>
                    </Col>

                    <Col md={6}>
                      <Card className="mb-3">
                        <Card.Header className="fw-bold">
                          Penalties for Non-Compliance
                        </Card.Header>
                        <Card.Body>
                          <ul>
                            <li>
                              💰 Fines up to <b>KSh 5 million</b> ($50,000) or
                              1% of annual turnover.
                            </li>
                            <li>
                              ⚖️ Individuals can seek <b>compensation</b> for
                              data breaches.
                            </li>
                          </ul>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>

                  {/* Exemptions */}
                  <Card className="mb-3">
                    <Card.Header className="fw-bold">Exemptions</Card.Header>
                    <Card.Body>
                      🛡️ National security & public interest cases may be
                      exempted from some provisions.
                    </Card.Body>
                  </Card>

                  {/* Footer */}
                  <div className="text-center mt-3">
                    <Button
                      href="https://www.odpc.go.ke/"
                      target="_blank"
                      variant="primary"
                    >
                      Learn More at ODPC
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Container>
            <div className="d-grid">
              <Button
                className="btn-sm"
                onClick={() => navigate("/")}
                style={{
                  backgroundColor: "rgb(197, 140, 79)",
                  borderColor: "rgb(197, 140, 79)",
                }}
              >
                Back to Login
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
