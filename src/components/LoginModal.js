import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginModal.css';

const LoginModal = ({ closeModal }) => {
    const [role, setRole] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRoleSelection = (selectedRole) => {
        setRole(selectedRole);
    };

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, role }),
            });

            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('token', data.token); // Store the JWT token in localStorage
                alert("Login successful!");
                if (role === 'student') {
                    navigate('/student_profile'); 
                } else if (role === 'professor') {
                    navigate('/professor_profile'); 
                }
            } else {
                alert("Login failed: " + data.message);
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("An error occurred during login. Please try again.");
        }

        closeModal();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                {!role && (
                    <>
                        <h2>Select Your Role</h2>
                        <button onClick={() => handleRoleSelection('student')} className="modal-button">Student</button>
                        <button onClick={() => handleRoleSelection('professor')} className="modal-button">Professor</button>
                    </>
                )}
                {role && (
                    <>
                        <h2>{role.charAt(0).toUpperCase() + role.slice(1)} Login</h2>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="modal-input"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="modal-input"
                        />
                        <button onClick={handleLogin} className="modal-button">Login</button>
                        <button onClick={closeModal} className="modal-button">Close</button>
                    </>
                )}
            </div>
        </div>
    );
};

export default LoginModal;
