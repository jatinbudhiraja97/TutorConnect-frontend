import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './StudentProfile.css';

const StudentProfile = () => {
    const [student, setStudent] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStudentProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('http://localhost:5000/student_profile', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                const data = await response.json();
                if (response.ok) {
                    setStudent(data);
                } else {
                    console.error('Error fetching student profile:', data.message);
                }
            } catch (error) {
                console.error('Error fetching student profile:', error);
            }
        };

        fetchStudentProfile();
    }, []);

    const handleSearchChange = async (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        if (query.length > 2) {
            const response = await fetch(`http://localhost:5000/search_professor?query=${query}`);
            const data = await response.json();
            if (response.ok) {
                setSuggestions(data);
            } else {
                console.error('Error fetching search suggestions:', data.message);
            }
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (professorId) => {
        navigate(`/professor_public_profile/${professorId}`);
    };

    const getInitials = (name) => {
        if (!name) return '';
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    };

    if (!student) {
        return <div>Loading...</div>;
    }

    return (
        <div className="student-profile-container">
            <header className="header">
                <div className="header-left">
                    <h1>Smart Tutor</h1>
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Search for professors/subjects..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                        {suggestions.length > 0 && (
                            <ul className="suggestions-dropdown">
                                {suggestions.map((professor) => (
                                    <li key={professor.id} onClick={() => handleSuggestionClick(professor.id)}>
                                        {professor.name} - {professor.subjects}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
                <div className="header-right">
                    <div className="profile-section">
                        <div className="profile-initials">
                            {getInitials(student.name)}
                        </div>
                        <button className="dropdown-button">
                            {student.name}
                            <div className="dropdown-content">
                                <a href="/profile">Profile</a>
                                <a href="/settings">Settings</a>
                                <a href="/logout">Logout</a>
                            </div>
                        </button>
                    </div>
                </div>
            </header>

            <div className="dashboard">
                <h2>Student Dashboard</h2>
                <div className="tiles">
                    <div className="tile">
                        <h3>History</h3>
                        <p>View your previous bookings</p>
                    </div>
                    <div className="tile">
                        <h3>Notifications</h3>
                        <p>Upcoming meetings with professors</p>
                    </div>
                    <div className="tile">
                        <h3>Quick Access</h3>
                        <p onClick={() => navigate('/book_appointment')}>Book a new appointment</p>
                    </div>
                    <div className="tile">
                        <h3>Reschedule Appointment</h3>
                        <p onClick={() => navigate('/reschedule_appointment')}>Cancel or change time of your bookings</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentProfile;
