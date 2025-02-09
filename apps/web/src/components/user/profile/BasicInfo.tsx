import { InfoItem } from "./InfoItem";
import { Rating } from "./Rating";
import { User } from "../../../api/user";

interface BasicInfoProps {
    user: User;
    showPosts: boolean;
    setShowPosts: React.Dispatch<React.SetStateAction<boolean>>;
    showDemoVideo: boolean;
    setShowDemoVideo: React.Dispatch<React.SetStateAction<boolean>>;
}

export const BasicInfo = ({
    user,
    showPosts,
    setShowPosts,
    showDemoVideo,
    setShowDemoVideo,
}: BasicInfoProps) => {
    const playDemoVideo = (e: React.MouseEvent) => {
        e.preventDefault();
        setShowDemoVideo(!showDemoVideo);
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-4">
            <div className="flex space-x-4 mb-4 w-full">
                <img
                    src="https://i.pravatar.cc/300"
                    alt={`${user.firstName} ${user.lastName}`}
                    className="w-20 h-20 rounded-full border-5 border-gray-300"
                />
                <div className="w-full">
                    {/* User Name, Rating & Btn to toggle posts and calendar */}
                    <div className="flex gap-x-4 justify-between items-center w-full">
                        <div className="flex">
                            <h2 className="text-2xl font-bold mr-4">
                                {user.firstName} {user.lastName}
                            </h2>
                            <Rating rating={(Math.random() * 5).toString()} />
                        </div>
                        {/* Show post toggle btn hidden  */}
                        {/* <button
                            className="bg-blue-600 text-white p-2 px-4 rounded-lg"
                            onClick={() => setShowPosts(!showPosts)}
                        >
                            {showPosts ? "Show Slots" : "Show Posts"}
                        </button> */}
                    </div>
                    <p className="text-sm text-gray-500">{user.description}</p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-y-2">
                <InfoItem
                    icon="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    text={user.location}
                />
                <InfoItem
                    icon="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z"
                    text={user.languages}
                />
                <InfoItem
                    icon="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"
                    text={
                        <a
                            href={user.demoVideo}
                            target="_blank"
                            className="text-blue-500 hover:underline"
                            onClick={(e) => playDemoVideo(e)}
                        >
                            Watch Intro Video
                        </a>
                    }
                />
                <InfoItem
                    icon="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                    text={`${user.charge} ${user.currency} (${user.chargeType})`}
                />
            </div>
        </div>
    );
};
