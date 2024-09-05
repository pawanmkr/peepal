import { Route, Routes, Link } from 'react-router-dom';
import { TutorProfile } from '../pages/TutorProfile';

const tutor = {
    id: '0191adea-3163-777b-86ad-2806f0f73302',
    description: 'I am a professional tutor with 10 years of experience',
    experience: 3,
    skills: 'Problem solving, Communication, Patience',
    rating: '3.8',
    video: 'https://example.com/video.mp4',
    location: 'Madhubani, India',
    languages: 'Maithili, Hindi, English, Punjabi',
    availability: 'Available on weekdays',
    currency: 'INR',
    charge: '50.00',
    chargeType: 'hourly',
    days: 'Monday, Wednesday, Friday',
    startTime: '09:15:00',
    endTime: '05:00:00',
    formalEducation: [
        {
            id: '0191adea-32b2-777b-86ad-36835ba71ca9',
            qualification: 'Masters in Mathematics',
            institution: 'Harvard University',
            year: 2010,
            subjects: 'Mathematics, Physics, Chemistry',
        },
    ],
    user: {
        id: '0191ad18-3aa4-7333-af31-c06d8b96bab9',
        username: 'johndoe',
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@email.com',
        avatar: 'https://i.pravatar.cc/300',
        dob: '1990-01-01',
        phoneCode: '91',
        phoneNumber: '9876543210',
        role: 'user',
    },
};

export function App() {
    return (
        <Routes>
            <Route path="/tutor" element={<TutorProfile tutor={tutor} />} />
        </Routes>
    );
}

export default App;
