import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";

import Homepage from "../pages/Homepage";
import ProfessionalProfile from "../pages/ProfessionalProfile";
import Landing from "../pages/Landing";
import Layout from "../components/layout/Layout";
import { ProfessionalProfileForm } from "../components/professional/profile/Form";

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
                path="/professional/form"
                element={
                    <Layout>
                        <ProfessionalProfileForm />
                    </Layout>
                }
            />
            <Route
                path="/professional/:id"
                element={
                    <Layout>
                        <ProfessionalProfile />
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
