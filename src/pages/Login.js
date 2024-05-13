import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import backgroundImage from '../images/bluebackground.png';
import HomeNavbar from '../navibars/HomeNavbar'; 
import backButtonIcon from '../images/back-button-icon.png';
import logoImage from '../images/logo.png';
export default function Login() {
  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
  };

  return (
    <div className='justify-content-center align-item-center'>
    <Button as= {Link} to='/.' className="custom-button_brand_2" style = {{justifyContent:"center"}}>
                      <img
                          src={logoImage}
                          width="40"
                          height="40"
                          className="d-inline-block align-top"
                          alt="Nima's Logo"
                      />
                  Nima's auto Emporium
    </Button>
    <div className="d-flex justify-content-center align-items-center" style = {{marginTop:"100px"}}>
      <Container>
        <Row className="justify-content-center mt-5">
          <Col xs={12} md={6}>
            <LoginForm />
          </Col>
        </Row>
      </Container>
{/*       <div className="text-center mt-3">
        Haven't had an account?
        <a href="/signup"> Sign up Now</a>
      </div> */}
    </div>
    </div>
  );
}




