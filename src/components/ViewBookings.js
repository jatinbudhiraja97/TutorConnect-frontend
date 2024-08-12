import React, { useEffect, useState } from 'react';
import './ViewBookings.css';

const ViewBookings = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/get_professor_bookings', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            const data = await response.json();
            if (response.ok) {
                setBookings(data);
            } else {
                console.error('Error fetching bookings:', data.message);
            }
        } catch (error) {
            console.error('Error fetching bookings:', error);
        }
    };

    return (
        <div className="view-bookings-container">
            <h2>My Bookings</h2>
            <div className="bookings-list">
                {bookings.map((booking, index) => (
                    <div key={index} className="booking-tile">
                        <h3>{booking.student_name}</h3>
                        <p>Date: {booking.date}</p>
                        <p>Time: {booking.time}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ViewBookings;
