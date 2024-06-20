import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Tabs, Tab, Alert } from 'react-bootstrap';

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: ''
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem('formData');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  const validate = () => {
    let tempErrors = {};
    if (step === 1) {
      if (!formData.name) tempErrors.name = 'Name is required';
      if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = 'Email is invalid';
      if (!formData.phone) tempErrors.phone = 'Phone is required';
    } else if (step === 2) {
      if (!formData.address1) tempErrors.address1 = 'Address Line 1 is required';
      if (!formData.city) tempErrors.city = 'City is required';
      if (!formData.state) tempErrors.state = 'State is required';
      if (!formData.zip) tempErrors.zip = 'Zip Code is required';
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = () => {
    if (validate()) {
      setSubmitted(true);
      localStorage.removeItem('formData');
      // Simulate API call
      setTimeout(() => {
        alert('Form submitted successfully!');
      }, 1000);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Container className="mt-5">
      <Tabs activeKey={step} onSelect={(k) => setStep(k)} id="controlled-tab-example">
        <Tab eventKey={1} title="Step 1">
          <Step1 data={formData} handleChange={handleChange} errors={errors} />
        </Tab>
        <Tab eventKey={2} title="Step 2" disabled={step < 2}>
          <Step2 data={formData} handleChange={handleChange} errors={errors} />
        </Tab>
        <Tab eventKey={3} title="Step 3" disabled={step < 3}>
          <Step3 data={formData} />
        </Tab>
      </Tabs>
      <Row className="mt-3">
        <Col>
          {step > 1 && (
            <Button variant="secondary" onClick={handleBack}>
              Back
            </Button>
          )}
        </Col>
        <Col className="text-right">
          {step < 3 && (
            <Button variant="primary" onClick={handleNext}>
              Next
            </Button>
          )}
          {step === 3 && (
            <Button variant="success" onClick={handleSubmit}>
              Submit
            </Button>
          )}
        </Col>
      </Row>
      {submitted && <Alert variant="success" className="mt-3">Form submitted successfully!</Alert>}
    </Container>
  );
};

const Step1 = ({ data, handleChange, errors }) => (
  <Form>
    <Form.Group controlId="formName">
      <Form.Label>Name</Form.Label>
      <Form.Control
        type="text"
        name="name"
        value={data.name}
        onChange={handleChange}
        isInvalid={!!errors.name}
      />
      <Form.Control.Feedback type="invalid">
        {errors.name}
      </Form.Control.Feedback>
    </Form.Group>
    <Form.Group controlId="formEmail">
      <Form.Label>Email</Form.Label>
      <Form.Control
        type="email"
        name="email"
        value={data.email}
        onChange={handleChange}
        isInvalid={!!errors.email}
      />
      <Form.Control.Feedback type="invalid">
        {errors.email}
      </Form.Control.Feedback>
    </Form.Group>
    <Form.Group controlId="formPhone">
      <Form.Label>Phone</Form.Label>
      <Form.Control
        type="text"
        name="phone"
        value={data.phone}
        onChange={handleChange}
        isInvalid={!!errors.phone}
      />
      <Form.Control.Feedback type="invalid">
        {errors.phone}
      </Form.Control.Feedback>
    </Form.Group>
  </Form>
);

const Step2 = ({ data, handleChange, errors }) => (
  <Form>
    <Form.Group controlId="formAddress1">
      <Form.Label>Address Line 1</Form.Label>
      <Form.Control
        type="text"
        name="address1"
        value={data.address1}
        onChange={handleChange}
        isInvalid={!!errors.address1}
      />
      <Form.Control.Feedback type="invalid">
        {errors.address1}
      </Form.Control.Feedback>
    </Form.Group>
    <Form.Group controlId="formAddress2">
      <Form.Label>Address Line 2</Form.Label>
      <Form.Control
        type="text"
        name="address2"
        value={data.address2}
        onChange={handleChange}
      />
    </Form.Group>
    <Form.Group controlId="formCity">
      <Form.Label>City</Form.Label>
      <Form.Control
        type="text"
        name="city"
        value={data.city}
        onChange={handleChange}
        isInvalid={!!errors.city}
      />
      <Form.Control.Feedback type="invalid">
        {errors.city}
      </Form.Control.Feedback>
    </Form.Group>
    <Form.Group controlId="formState">
      <Form.Label>State</Form.Label>
      <Form.Control
        type="text"
        name="state"
        value={data.state}
        onChange={handleChange}
        isInvalid={!!errors.state}
      />
      <Form.Control.Feedback type="invalid">
        {errors.state}
      </Form.Control.Feedback>
    </Form.Group>
    <Form.Group controlId="formZip">
      <Form.Label>Zip Code</Form.Label>
      <Form.Control
        type="text"
        name="zip"
        value={data.zip}
        onChange={handleChange}
        isInvalid={!!errors.zip}
      />
      <Form.Control.Feedback type="invalid">
        {errors.zip}
      </Form.Control.Feedback>
    </Form.Group>
  </Form>
);

const Step3 = ({ data }) => (
  <div>
    <h4>Review Your Information</h4>
    <p><strong>Name:</strong> {data.name}</p>
    <p><strong>Email:</strong> {data.email}</p>
    <p><strong>Phone:</strong> {data.phone}</p>
    <p><strong>Address Line 1:</strong> {data.address1}</p>
    <p><strong>Address Line 2:</strong> {data.address2}</p>
    <p><strong>City:</strong> {data.city}</p>
    <p><strong>State:</strong> {data.state}</p>
    <p><strong>Zip Code:</strong> {data.zip}</p>
  </div>
);

export default MultiStepForm;
