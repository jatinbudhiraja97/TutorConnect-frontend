import React, { useState } from 'react';
import './ProfessorSignUp.css';

const ProfessorSignUp = ({ closeModal }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [department, setDepartment] = useState('');
    const [experience, setExperience] = useState('');
    const [subjects, setSubjects] = useState('');

    const handleSubmit = async () => {
        const response = await fetch('http://localhost:5000/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password, name, department, experience, subjects, role: 'professor' }),
        });
        const data = await response.json();
        console.log(data);
        if (response.ok) {
            alert("Professor account created successfully!");
        } else {
            alert("Error: " + data.message);
        }
        closeModal();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Professor Sign Up</h2>
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
                <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="modal-input"
                />
                <input
                    type="text"
                    placeholder="Department"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="modal-input"
                />
                <input
                    type="number"
                    placeholder="Years of Experience"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="modal-input"
                />
                <input
                    type="text"
                    placeholder="Subjects (comma separated)"
                    value={subjects}
                    onChange={(e) => setSubjects(e.target.value)}
                    className="modal-input"
                />
                <button onClick={handleSubmit} className="modal-button">Sign Up</button>
                <button onClick={closeModal} className="modal-button">Close</button>
            </div>
        </div>
    );
};

export default ProfessorSignUp;
