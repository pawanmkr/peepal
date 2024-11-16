import { Loader } from "lucide-react";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";

const CallToAction = () => {
    const [loading, setLoading] = useState(false);

    const handleClick = () => {
        setLoading(true);
        setTimeout(() => {
            window.location.href = "/home";
        }, 1000);
    };

    return (
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white text-center py-16 px-4">
            <h2 className="text-3xl font-bold mb-4">
                Ready to Connect with Leading Experts?
            </h2>
            <p className="text-lg mb-8 max-w-xl mx-auto">
                Join Peepal today and start engaging in personalized 1-on-1
                conversations with users who can guide you in your field.
                Whether it's career advice or expert consultations, we make it
                easy for you to connect with the right people.
            </p>
            {loading ? (
                <div className="bg-yellow-400 text-black p-2 rounded-full font-semibold inline-flex text-lg">
                    <Loader className="animate-spin" size={28} />
                </div>
            ) : (
                <a
                    onClick={handleClick}
                    className="bg-yellow-400 text-black py-2 px-4 rounded-lg text-lg font-semibold no-underline inline-flex items-center transform transition-transform duration-100 hover:scale-105"
                >
                    Join Now <FaArrowRight className="inline ml-2" />
                </a>
            )}
        </div>
    );
};

export default CallToAction;
