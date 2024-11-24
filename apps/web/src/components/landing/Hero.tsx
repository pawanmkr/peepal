import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { Loader } from "lucide-react"; // Import Loader from lucide-react
import Logo from "../header/Logo";
import { useNavigate } from "react-router-dom";

const Hero = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleClick = () => {
        setLoading(true);
        setTimeout(() => {
            navigate("/home");
        }, 1000);
    };

    return (
        <div className="bg-blue-600 text-white text-center py-20">
            {/* Logo */}
            <Logo className="text-white text-6xl mb-8" />

            <h1 className="text-4xl font-bold mb-4">
                Connect with Experts, Anytime, Anywhere
            </h1>
            <p className="text-lg mb-8">
                Find and consult with industry users for personalized advice and
                guidance.
            </p>
            {loading ? (
                <div className="bg-yellow-400 text-black p-2 rounded-full font-semibold inline-flex text-lg">
                    <Loader className="animate-spin" size={28} />
                </div>
            ) : (
                <a
                    href="#"
                    onClick={handleClick}
                    className="bg-yellow-400 text-black py-2 px-4 rounded-lg text-lg font-semibold no-underline inline-flex items-center transform transition-transform duration-100 hover:scale-105"
                >
                    Explore <FaArrowRight className="inline ml-2" />
                </a>
            )}
        </div>
    );
};

export default Hero;
