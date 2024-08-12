import React, { useState } from 'react';
import StudentSignUp from './StudentSignUp';
import ProfessorSignUp from './ProfessorSignUp';
import './SignUpModal.css';

const SignUpModal = ({ closeModal }) => {
    const [role, setRole] = useState(null);

    const handleRoleSelection = (selectedRole) => {
        setRole(selectedRole);
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
                {role === 'student' && <StudentSignUp closeModal={closeModal} />}
                {role === 'professor' && <ProfessorSignUp closeModal={closeModal} />}
            </div>
        </div>
    );
};

export default SignUpModal;
