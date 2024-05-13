import React, { useContext, useState, useEffect } from 'react';
import { Card, Form, Button, Toast, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UserContext from '../usercontext';
import './customCss.css';

export default function SignupForm() {
  // Extract the registration function from context
  const { registerUser, error, setError } = useContext(UserContext);
  // Define states for the component
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setpasswordConfirm] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [username, setUsername] = useState('');
  const [emptyInput, setEmptyInput] = useState(false);
  const [isUsernameNotLowercase, setIsUsernameNotLowercase] = useState(false);
  const [isPasswordMatch,setIsPasswordMatch] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (error) {
      setShowErrorModal(true);
    }
  }, [error]);

  // Handlers to update state variables based on user input

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };


  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };


  const handlePasswordConfirmChange = (event) => {
    setpasswordConfirm(event.target.value);
  };

  const handleEmailConfirmChange = (event) => {
    setEmail(event.target.value);
  };

// Handles form submission
const handleFormSubmit = async (e) => {
  e.preventDefault();
  if (username !== username.toLowerCase()) {
    setIsUsernameNotLowercase(true);
    return;
  }
  if (!firstName.trim() || !lastName.trim() || !username.trim() || !password.trim() || !email.trim()) {
    setEmptyInput(true);
    return;
  }

  // Check if the password is available
  if (password !== passwordConfirm) {
    setIsPasswordMatch(true);
    return;
  }

  
  const registrationSuccess = await registerUser(firstName, lastName, username, password, email);

  if (registrationSuccess) {
    setShowSuccessToast(true);
  }
};

  return (
    <Card className="p-4 custom-card2">
      <Card.Header className="text-center custom-cardheader" style= {{ borderBottom: 'none' }}>
        Creat your account
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleFormSubmit}>
          <div className="d-flex mb-1">
            <Form.Group controlId="firstName" className="flex-fill me-2">
              <Form.Label >First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your first name"
                maxLength="50"
                value={firstName}
                onChange={handleFirstNameChange}
              />
            </Form.Group>
            <Form.Group controlId="lastName" className="flex-fill ms-2">
              <Form.Label >Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your last name"
                maxLength="50"
                value={lastName}
                onChange={handleLastNameChange}
              />
            </Form.Group>
          </div>
          <Form.Group className="mb-3" controlId="username">
            <Form.Label  style={{marginTop: "10px"}}>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username in lower case"
              maxLength="30"
              value={username}
              onChange={handleUsernameChange}
            />
          </Form.Group> 
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={handlePasswordChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="passwordConfirm">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm your password"
              value={passwordConfirm}
              onChange={handlePasswordConfirmChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your email address"
              value={email}
              onChange={handleEmailConfirmChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100 custom-button">
            Sign Up Now
          </Button>
          <div className="mt-3 d-flex align-items-center justify-content-center">
                        <span className="mr-2">Already have an account?</span>
                        <Button as={Link} to="/login" variant="link" style={{ textDecoration: 'underline' }}>
                            Log in
                        </Button>
          </div>
        </Form>
        <Toast
          show={emptyInput}
          onClose={() => setEmptyInput(false)}
          delay={5000}
          autohide
          className="custom-toast">
          <Toast.Header closeButton={true}>
            <strong className="me-auto">Notification</strong>
          </Toast.Header>
          <Toast.Body>
            Please fill in all required fields.
          </Toast.Body>
        </Toast>
        <Toast
          show={isUsernameNotLowercase}
          onClose={() => setIsUsernameNotLowercase(false)}
          delay={5000}
          autohide
          className="custom-toast"
        >
          <Toast.Header closeButton={true}>
            <strong className="me-auto">Notification</strong>
          </Toast.Header>
          <Toast.Body>
            Username must be in lowercase.
          </Toast.Body>
        </Toast>
        <Toast
          show={isPasswordMatch}
          onClose={() => setIsPasswordMatch(false)}
          delay={5000}
          autohide
          className="custom-toast"
        >
          <Toast.Header closeButton={true}>
            <strong className="me-auto">Notification</strong>
          </Toast.Header>
          <Toast.Body>
            Passwords do not match
          </Toast.Body>
        </Toast>
        <Toast
          show={showSuccessToast}
          onClose={() => setShowSuccessToast(false)}
          className="custom-toast">
          <Toast.Header closeButton={true}>
            <strong className="me-auto">Success</strong>
          </Toast.Header>
          <Toast.Body>
            Signup successfully!<br/>
            A verification email has been sent to your email address to activate your account.
          </Toast.Body>
        </Toast>
        <Modal show={showErrorModal} onHide={() => { setShowErrorModal(false); setError(null); }}>
          <Modal.Header closeButton>
            <Modal.Title>Error</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="error-modal-message">{error}</div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => { setShowErrorModal(false); setError(null); }}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Card.Body>
    </Card>
  );
}
