import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ProfessorPublicProfile.css';

const ProfessorPublicProfile = () => {
    const { professorId } = useParams();
    const [professor, setProfessor] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);  // Track login status
    const [showLoginPrompt, setShowLoginPrompt] = useState(false);
    const [showLoginPopup, setShowLoginPopup] = useState(false);
    const [showRatingPopup, setShowRatingPopup] = useState(false);
    const [user, setUser] = useState(null);  // Store logged in user info
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    useEffect(() => {
        const fetchProfessorProfile = async () => {
            try {
                const response = await fetch(`http://localhost:5000/professor_public_profile/${professorId}`);
                const data = await response.json();
                if (response.ok) {
                    setProfessor(data);
                } else {
                    console.error('Error fetching professor profile:', data.message);
                }
            } catch (error) {
                console.error('Error fetching professor profile:', error);
            }
        };

        fetchProfessorProfile();
    }, [professorId]);

    const handleRateClick = () => {
        if (!isLoggedIn) {
            setShowLoginPrompt(true);
        } else {
            setShowRatingPopup(true);
        }
    };

    const handleLoginClick = () => {
        setShowLoginPrompt(false);
        setShowLoginPopup(true);
    };

    const handleLoginSubmit = async (email, password) => {
        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password, role: 'student' })
            });

            const data = await response.json();
            if (response.ok) {
                setIsLoggedIn(true);
                setUser({ name: 'Mark' });  // Assuming you retrieve the name from the response
                setShowLoginPopup(false);
                setShowRatingPopup(true);
            } else {
                console.error('Login failed:', data.message);
            }
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    const handleRatingSubmit = async () => {
        try {
            const response = await fetch('http://localhost:5000/rate_professor', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ professorId, rating, comment })
            });

            const data = await response.json();
            if (response.ok) {
                alert('Rating submitted successfully');
                setShowRatingPopup(false);
            } else {
                console.error('Rating submission failed:', data.message);
            }
        } catch (error) {
            console.error('Rating submission error:', error);
        }
    };

    if (!professor) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <header className="header">
                <div className="logo">Smart Tutor</div>
                <div className="header-buttons">
                    {isLoggedIn ? (
                        <div className="profile-initials">{user.name[0]}</div>
                    ) : (
                        <>
                            <button onClick={() => setShowLoginPopup(true)}>Log In</button>
                            <button>Sign Up</button>
                        </>
                    )}
                </div>
            </header>

            <div className="profile-summary">
                <div className="rating">
                    <span className="overall-rating">{professor.average_rating}/5</span>
                    <div className="rating-count">
                        Overall Quality Based on {professor.rating_count} ratings
                    </div>
                </div>
                <h1>{professor.name}</h1>
                <p>{professor.department} Department</p>
                <p>{professor.experience} years of experience</p>
                <p>Subjects: {professor.subjects}</p>
                <div className="actions">
                    <button onClick={handleRateClick}>Rate</button>
                    <button>Compare</button>
                </div>
            </div>

            {showLoginPrompt && (
                <div className="popup">
                    <h2>Login to Rate</h2>
                    <button onClick={handleLoginClick}>Login</button>
                </div>
            )}

            {showLoginPopup && (
                <div className="popup">
                    <h2>Student Login</h2>
                    <input type="email" placeholder="Email" onChange={(e) => setUser({ ...user, email: e.target.value })} />
                    <input type="password" placeholder="Password" onChange={(e) => setUser({ ...user, password: e.target.value })} />
                    <button onClick={() => handleLoginSubmit(user.email, user.password)}>Login</button>
                    <button onClick={() => setShowLoginPopup(false)}>Close</button>
                </div>
            )}

            {showRatingPopup && (
                <div className="popup">
                    <h2>Rate {professor.name}</h2>
                    <input type="number" min="0" max="5" value={rating} onChange={(e) => setRating(e.target.value)} />
                    <textarea placeholder="Comment" value={comment} onChange={(e) => setComment(e.target.value)} />
                    <button onClick={handleRatingSubmit}>Submit</button>
                    <button onClick={() => setShowRatingPopup(false)}>Cancel</button>
                </div>
            )}
        </div>
    );
};

export default ProfessorPublicProfile;
