import React, { useEffect, useState } from 'react';
import './BookAppointment.css';

const BookingAppointment = () => {
    const [professors, setProfessors] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedProfessor, setSelectedProfessor] = useState(null);
    const [availableSlots, setAvailableSlots] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState('');
    const [selectedDate, setSelectedDate] = useState('');  // Add state for selected date
    const [showModal, setShowModal] = useState(false);

    const fetchProfessors = async (query = '') => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5000/search_professor?query=${query}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            const data = await response.json();
            if (response.ok) {
                setProfessors(data);
            } else {
                console.error('Error fetching professors:', data.message);
            }
        } catch (error) {
            console.error('Error fetching professors:', error);
        }
    };

    useEffect(() => {
        fetchProfessors(); // Fetch all professors on initial load
    }, []);

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        fetchProfessors(query); // Fetch professors based on search query
    };

    const openModal = async (professor) => {
        setSelectedProfessor(professor);
        setShowModal(true); // Show modal first

        if (selectedDate) {
            const response = await fetch(`http://localhost:5000/get_time_slots/${professor.id}?date=${selectedDate}`);
            const data = await response.json();
            setAvailableSlots(data);
        }
    };

    const handleDateChange = async (date) => {
        setSelectedDate(date);
        if (selectedProfessor) {
            const response = await fetch(`http://localhost:5000/get_time_slots/${selectedProfessor.id}?date=${date}`);
            const data = await response.json();
            setAvailableSlots(data);
        }
    };

    const bookAppointment = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/book_appointment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    professor_id: selectedProfessor.id,
                    date: selectedDate,  // Use selected date
                    time: selectedSlot,
                }),
            });

            const data = await response.json();
            if (response.ok) {
                alert("Appointment booked successfully!");
                setShowModal(false);
            } else {
                console.error('Error booking appointment:', data.message);
            }
        } catch (error) {
            console.error('Error booking appointment:', error);
        }
    };

    return (
        <div className="booking-appointment-container">
            <h2 className="booking-appointment-title">Book an Appointment</h2>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search by subject..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </div>
            <div className="professor-list">
                {professors.map(professor => (
                    <div key={professor.id} className="professor-card">
                        <h3>{professor.name}</h3>
                        <p><strong>Department:</strong> {professor.department}</p>
                        <p><strong>Subjects:</strong> {professor.subjects}</p>
                        <p><strong>Average Rating:</strong> {professor.average_rating.toFixed(1)} / 5</p>
                        <button className="book-button" onClick={() => openModal(professor)}>Book Now</button>
                    </div>
                ))}
            </div>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Book Appointment with {selectedProfessor.name}</h2>
                        <p><strong>Department:</strong> {selectedProfessor.department}</p>
                        <p><strong>Subjects:</strong> {selectedProfessor.subjects}</p>
                        <p><strong>Select a date:</strong></p>
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => handleDateChange(e.target.value)}  // Handle date selection
                        />
                        <p><strong>Select a time slot:</strong></p>
                        <select value={selectedSlot} onChange={(e) => setSelectedSlot(e.target.value)}>
                            <option value="">Select a time</option>
                            {availableSlots.map((slot, index) => (
                                <option key={index} value={slot.time}>{slot.time}</option>
                            ))}
                        </select>
                        <button className="confirm-button" onClick={bookAppointment}>Confirm Booking</button>
                        <button className="close-button" onClick={() => setShowModal(false)}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookingAppointment;
