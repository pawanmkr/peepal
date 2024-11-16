import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";

import Homepage from "../pages/Homepage";
import Landing from "../pages/Landing";
import Layout from "../components/layout/Layout";
// import { UserProfileForm } from "../components/user/profile/Form";
import UserProfile from "../pages/UserProfile";
import EditProfileForm from "../components/user/profile/EditProfileForm";

export function App() {
    return (
        <Routes>
            {/* Landing Page without header and full width */}
            <Route path="/" element={<Landing />} />

            {/* Routes with header and limited width */}
            <Route
                path="/home"
                element={
                    <Layout>
                        <Homepage />
                    </Layout>
                }
            />
            <Route
                path="/profile"
                element={
                    <Layout>
                        <UserProfile />
                    </Layout>
                }
            />
            <Route
                path="/profile/edit"
                element={
                    <Layout>
                        <EditProfileForm />
                    </Layout>
                }
            />
            <Route
                path="/user/:id"
                element={
                    <Layout>
                        <UserProfile />
                    </Layout>
                }
            />
            <Route
                path="/search"
                element={
                    <Layout>
                        <Homepage />
                    </Layout>
                }
            />
        </Routes>
    );
}

export default App;
