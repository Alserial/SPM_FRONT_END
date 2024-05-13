import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logoImage from '../images/logo.png';
import backgroundImage from '../images/bg.jpg';

function Home() {
    const backgroundStyle = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
    };

    return (
        <div>
            <div style={backgroundStyle} className="d-flex flex-column">
                <div className="d-flex justify-content-between align-items-center" style={{ padding: '20px' }}>
                    <Button as={Link} to='/' className="custom-button_brand">
                        <img
                            src={logoImage}
                            width="40"
                            height="40"
                            className="d-inline-block align-top"
                            alt="Nima's Logo"
                        />
                        Nima's auto Emporium
                    </Button>
                    <div>
                        {/* <Button as={Link} to="/mainpage" variant="outline-primary" className="ml-auto custom-button2">
                            MainPage
                        </Button> */}
                        <Button as={Link} to="/signup" variant="outline-primary" className="ml-auto custom-button2">
                            Sign up
                        </Button>
                        <Button as={Link} to="/login" variant="outline-primary" className="ml-auto custom-button3">
                            Log in
                        </Button>
                    </div>
                </div>

                <div className="w-100 justify-content-center align-items-center" style={{ display: 'flex', flexDirection: 'column', marginTop: 'auto', marginBottom: 'auto' }}>
                    <div style={{ fontSize: "150px", color: "white", fontFamily: "sans-serif" }}>Find all you need</div>
                    <Button as={Link} to="/login" variant="outline-primary" className="custom-button_ON">Order now</Button>
                </div>
            </div>
        </div>
    );
}

export default Home;
