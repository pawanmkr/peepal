import { Route, Routes } from 'react-router-dom';
import { TutorProfile } from '../pages/TutorProfile';
import { TutorSearch } from '../pages/TutorSearch';

export function App() {
    return (
        <Routes>
            <Route path="/tutor" element={<TutorProfile />} />
            <Route path="/tutor/search" element={<TutorSearch />} />
        </Routes>
    );
}

export default App;
