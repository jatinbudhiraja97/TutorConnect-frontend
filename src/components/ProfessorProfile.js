
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfessorProfile.css';

const ProfessorProfile = () => {
    const [profile, setProfile] = useState({
        name: '',
        department: '',
        experience: '',
        subjects: '',
        academics: '',
    });

    const [editMode, setEditMode] = useState(false);
    const navigate = useNavigate(); // Replacing useHistory with useNavigate

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/professor_profile', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            const data = await response.json();
            if (response.ok) {
                setProfile(data);
            } else {
                console.error('Error fetching profile:', data.message);
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const updateProfile = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/update_professor_profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(profile)
            });

            const data = await response.json();
            if (response.ok) {
                alert("Profile updated successfully!");
                setEditMode(false);
                fetchProfile();
            } else {
                console.error('Error updating profile:', data.message);
            }
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    return (
        <div>
            <div className="header">
                <div className="header-left">
                    <h1>Smart Tutor</h1>
                </div>
                <div className="header-right">
                    <span className="profile-initials">J</span>
                    <span className="profile-name">John</span>
                    <button
                        className="my-bookings-btn"
                        onClick={() => navigate('/view_bookings')}
                    >
                        My Bookings
                    </button>
                </div>
            </div>
            <div className="profile-container">
                <h2>Professor Profile</h2>
                {editMode ? (
                    <div className="profile-box">
                        <input
                            type="text"
                            name="name"
                            value={profile.name}
                            onChange={handleInputChange}
                            placeholder="Name"
                        />
                        <input
                            type="text"
                            name="department"
                            value={profile.department}
                            onChange={handleInputChange}
                            placeholder="Department"
                        />
                        <input
                            type="number"
                            name="experience"
                            value={profile.experience}
                            onChange={handleInputChange}
                            placeholder="Experience (years)"
                        />
                        <input
                            type="text"
                            name="subjects"
                            value={profile.subjects}
                            onChange={handleInputChange}
                            placeholder="Subjects"
                        />
                        <textarea
                            name="academics"
                            value={profile.academics}
                            onChange={handleInputChange}
                            placeholder="Academic Achievements"
                        />
                        <div className="button-container">
                            <button onClick={updateProfile}>Save Changes</button>
                            <button onClick={() => setEditMode(false)}>Cancel</button>
                        </div>
                    </div>
                ) : (
                    <div className="profile-box">
                        <h3>{profile.name}</h3>
                        <p><strong>Department:</strong> {profile.department}</p>
                        <p><strong>Experience:</strong> {profile.experience} years</p>
                        <p><strong>Subjects:</strong> {profile.subjects}</p>
                        <p><strong>Academics:</strong> {profile.academics}</p>
                        <button onClick={() => setEditMode(true)}>Edit Profile</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfessorProfile;
