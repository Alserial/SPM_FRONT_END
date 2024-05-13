import React, { useContext, useState, useEffect } from 'react';
import { Card, Form, Button, Modal, Toast } from 'react-bootstrap';
import UserContext from '../usercontext';
import logoImage from '../images/MLH-Logo.jpg';
import './customCss.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import QRCode from 'qrcode.react';
export default function LoginForm() {
  const { loginUser, error, setError} = useContext(UserContext);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [otp, setOtp] = useState('')
  const [qrCode, setQRCode] = useState(''); 
  const [showQRModal, setShowQRModal] = useState(false);

  useEffect(() => {
    if (error) {
      setShowErrorModal(true);
    }
  }, [error]);


  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleOtpChange = (event) => {
    setOtp(event.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim()) {
      setToastMessage('Please enter a username.');
      setShowToast(true);
      return;
    }
  
    if (!password.trim()) {
      setToastMessage('Please enter a password.');
      setShowToast(true);
      return;
    }
    try {

      const [statusCode, dataOrError] = await loginUser(username, password, otp);
      console.log(1)
      if (statusCode === 202) {
        setQRCode(dataOrError); 
        setShowQRModal(true);
      } else if (statusCode === 201) {
        
        window.location.href = 'https://6632ed164d299.site123.me/';
      } else {

        console.error("Login failed:", dataOrError); 
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  


  return (
    <div className="d-flex flex-column align-items-center">
        <Card className="custom-card2">
            <Card.Header className="text-center custom-cardheader">Welcome Back</Card.Header>
            <Card.Body>
                <Form onSubmit={handleFormSubmit} data-role="user">
                    <Form.Group className="mb-3" controlId="username">
                        <Form.Label className="text-center custom-formlabel">Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Username"
                            maxLength="30"
                            className="custom-form-control"
                            value={username}
                            onChange={handleUsernameChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label className="text-center custom-formlabel">Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            maxLength="30"
                            className="custom-form-control"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="otp">
                        <Form.Label className="text-center custom-formlabel">OTP</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="OTP(one-time-password),If you haven't set up OTP yet, leave it blank"
                            maxLength="30"
                            className="custom-form-control"
                            value={otp}
                            onChange={handleOtpChange}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="w-100 custom-button">
                        Log in
                    </Button>
                    <div className="mt-3 d-flex justify-content-between align-items-center">
                        <Link to="/login/resetPassword" className="forgot-password-link">Forgot password?</Link>
                        <div>
                            <span>Haven't had an account?</span> <a href="/signup">Sign up Now</a>
                        </div>
                    </div>
                </Form>
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
        <div className="custom-toast">
            <Toast onClose={() => setShowToast(false)} show={showToast} delay={5000} autohide>
                <Toast.Header>
                    <strong className="me-auto">Notification</strong>
                </Toast.Header>
                <Toast.Body>{toastMessage}</Toast.Body>
            </Toast>
        </div>
        <Modal show={showQRModal} onHide={() => setShowQRModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Set Up OTP</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="text-center">
              <h5>You can scan this QR code with any 2FA app to set up your OTP.</h5>
              <QRCode value={qrCode} />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowQRModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
    </div>
  );
}
