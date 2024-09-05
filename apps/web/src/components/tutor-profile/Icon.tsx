export const Icon: React.FC<{ path: string }> = ({ path }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-gray-500"
        viewBox="0 0 20 20"
        fill="currentColor"
    >
        <path fillRule="evenodd" clipRule="evenodd" d={path} />
    </svg>
);
