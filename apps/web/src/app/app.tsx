import { Route, Routes } from 'react-router-dom';
import { TutorProfile } from '../pages/TutorProfile';
import { TutorSearch } from '../pages/TutorSearch';
import UserProfile from '../components/user/UserProfile';
import Header from '../components/header/Header';
import PostScroll from '../components/home/PostScroll';
import TrendingSkills from '../components/home/TrendingSkills';
import TrendingTutors from '../components/home/TrendingTutors';
import 'bootstrap/dist/css/bootstrap.min.css';


export function App() {
    return (
        <>
            <Header />
            <div className="container-fluid mt-4">
                <div className="row">
                    {/* Profile Section */}
                    <div className="col-lg-3 mb-4">
                        <UserProfile />
                    </div>

                    {/* Post Scroll Section */}
                    <div className="col-lg-6 mb-4">
                        <PostScroll />
                    </div>

                    {/* Trending Skills and Tutors */}
                    <div className="col-lg-3">
                        <TrendingSkills />
                        <TrendingTutors />
                    </div>
                </div>
            </div>

            <Routes>
                <Route path="/tutor" element={<TutorProfile />} />
                <Route path="/tutor/search" element={<TutorSearch />} />
                <Route path="/user/profile" element={<UserProfile />} />
            </Routes>
        </>
    );
}

export default App;
