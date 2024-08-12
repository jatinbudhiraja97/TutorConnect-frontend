import React, { useState } from 'react';
import SignUpModal from './SignUpModal';
import LoginModal from './LoginModal';
import SearchBar from './SearchBar';  // Import the SearchBar component
import '../styles/HomePage.css';

const HomePage = () => {
    const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    const openSignUpModal = () => setIsSignUpModalOpen(true);
    const closeSignUpModal = () => setIsSignUpModalOpen(false);

    const openLoginModal = () => setIsLoginModalOpen(true);
    const closeLoginModal = () => setIsLoginModalOpen(false);

    return (
        <div className="homepage">
            <nav className="navbar">
                <div className="logo">Tutor Connect</div>
                <div className="buttons">
                    <button onClick={openLoginModal}>Log In</button>
                    <button onClick={openSignUpModal}>Sign Up</button>
                </div>
            </nav>
            <div className="main-content">
                <h1>Enter your Subject to get started</h1>
                <SearchBar />  {/* Add the SearchBar component here */}
                <a href="#">I'd like to look up a professor by name</a>
            </div>
            {isSignUpModalOpen && <SignUpModal closeModal={closeSignUpModal} />}
            {isLoginModalOpen && <LoginModal closeModal={closeLoginModal} />}
        </div>
    );
};

export default HomePage;
