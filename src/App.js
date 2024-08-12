import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import StudentProfile from './components/StudentProfile';
import ProfessorProfile from './components/ProfessorProfile';
import ProfessorPublicProfile from './components/ProfessorPublicProfile';
import BookingAppointment from './components/BookingAppointment';
import ViewBookings from './components/ViewBookings'; // Import the new component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/student_profile" element={<StudentProfile />} />
        <Route path="/professor_profile" element={<ProfessorProfile />} />
        <Route path="/professor_public_profile/:professorId" element={<ProfessorPublicProfile />} />
        <Route path="/book_appointment" element={<BookingAppointment />} />
        <Route path="/view_bookings" element={<ViewBookings />} /> {/* Add the new route here */}
      </Routes>
    </Router>
  );
}

export default App;
