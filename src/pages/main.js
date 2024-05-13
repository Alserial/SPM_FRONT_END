import React from 'react';
import { useNavigate } from 'react-router-dom';

function MainPage() {
    const navigate = useNavigate();

    const goToProfile = () => {
        navigate('/profile'); 
    };

    return (
        <button onClick={goToProfile}>Profile</button> 
    );
}

export default MainPage;
